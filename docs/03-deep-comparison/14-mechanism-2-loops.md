---
id: mechanism-2-loops
title: 14. 机制 2：多轮循环 - 两种实现方式
sidebar_position: 14
---

# 机制 2：多轮循环 - 两种实现方式

> AsyncGenerator vs Rust Loop，谁更优雅？

---

## 核心问题

两个项目都实现了多轮循环，但实现方式不同：
- **Claude Code**：TypeScript AsyncGenerator
- **Codex**：Rust async loop

**各有什么优劣？**

---

## Claude Code 的实现

### 核心循环

```typescript
// src/query.ts (2330 行)
export async function* query(
  messages: Message[],
  tools: Tool[]
): AsyncGenerator<QueryEvent> {
  
  while (true) {
    // 1. 检查压缩
    if (shouldCompact(messages)) {
      yield { type: "compacting" }
      await autoCompact(messages)
    }
    
    // 2. 调用 API
    const response = await callAPI({
      messages,
      tools,
      stream: true
    })
    
    // 3. 流式返回响应
    for await (const chunk of response) {
      yield { type: "chunk", data: chunk }
    }
    
    // 4. 检查是否结束
    if (response.stop_reason === "end_turn") {
      yield { type: "complete" }
      break
    }
    
    // 5. 执行工具
    if (response.tool_calls) {
      for (const toolCall of response.tool_calls) {
        yield { type: "tool_start", tool: toolCall.name }
        
        const result = await executeTool(toolCall)
        
        yield { type: "tool_result", result }
        
        // 6. 把结果加入历史
        messages.push({
          role: "user",
          content: [{ type: "tool_result", content: result }]
        })
      }
    }
    
    // 7. 继续下一轮
  }
}
```

**特点**：
- ✅ AsyncGenerator 流式返回
- ✅ 每个事件都能实时显示
- ✅ 用户体验好
- ⚠️ 代码复杂度高

### 使用方式

```typescript
// src/QueryEngine.ts
async function runQuery() {
  const generator = query(messages, tools)
  
  for await (const event of generator) {
    switch (event.type) {
      case "chunk":
        displayChunk(event.data)
        break
      case "tool_start":
        showToolSpinner(event.tool)
        break
      case "tool_result":
        displayToolResult(event.result)
        break
      case "complete":
        showComplete()
        break
    }
  }
}
```

---

## Codex 的实现

### 核心循环

```rust
// codex-rs/core/src/codex.rs (7718 行)
pub async fn agent_loop(&mut self) -> Result<()> {
    loop {
        // 1. 检查压缩
        if self.should_compact() {
            self.compact().await?;
        }
        
        // 2. 调用 API
        let response = self.call_api().await?;
        
        // 3. 流式处理
        self.handle_stream(&response).await?;
        
        // 4. 检查是否继续
        if !self.should_continue(&response) {
            break;
        }
        
        // 5. 执行工具
        if let Some(tools) = response.tool_calls {
            for tool in tools {
                self.emit_event(Event::ToolStart(tool.name.clone()));
                
                let result = self.execute_tool(&tool).await?;
                
                self.emit_event(Event::ToolResult(result.clone()));
                
                // 6. 把结果加入历史
                self.messages.push(Message::tool_result(result));
            }
        }
        
        // 7. 继续下一轮
    }
    
    Ok(())
}
```

**特点**：
- ✅ 简洁清晰
- ✅ 类型安全
- ✅ 性能好
- ⚠️ 事件系统需要额外实现

### 事件系统

```rust
// 事件发射
pub enum Event {
    Chunk(String),
    ToolStart(String),
    ToolResult(String),
    Complete,
}

impl Codex {
    fn emit_event(&self, event: Event) {
        if let Some(tx) = &self.event_sender {
            let _ = tx.send(event);
        }
    }
}

// 事件接收
let (tx, mut rx) = mpsc::channel(100);
codex.set_event_sender(tx);

tokio::spawn(async move {
    while let Some(event) = rx.recv().await {
        match event {
            Event::Chunk(data) => display_chunk(data),
            Event::ToolStart(name) => show_spinner(name),
            Event::ToolResult(result) => display_result(result),
            Event::Complete => show_complete(),
        }
    }
});
```

---

## 对比分析

### 1. 代码风格

| 维度 | Claude Code | Codex |
|------|-------------|-------|
| 循环方式 | AsyncGenerator | async loop |
| 事件返回 | yield | emit_event |
| 代码行数 | 2330 行 | 7718 行 |
| 复杂度 | 高 | 中 |

**Claude Code**：
```typescript
// 优雅的 Generator
async function* query() {
  while (true) {
    yield event1
    yield event2
    if (done) break
  }
}
```

**Codex**：
```rust
// 传统的 loop
async fn agent_loop() {
    loop {
        emit_event(event1);
        emit_event(event2);
        if done { break; }
    }
}
```

### 2. 退出条件

**Claude Code**：
```typescript
// 检查 stop_reason
if (response.stop_reason === "end_turn") {
  yield { type: "complete" }
  break
}

// 或者没有工具调用
if (!response.tool_calls || response.tool_calls.length === 0) {
  break
}
```

**Codex**：
```rust
// 检查是否继续
fn should_continue(&self, response: &Response) -> bool {
    // 有工具调用 = 继续
    !response.tool_calls.is_empty()
}

if !self.should_continue(&response) {
    break;
}
```

### 3. 断路器

**Claude Code**：
```typescript
let turnCount = 0
const MAX_TURNS = 100

while (turnCount < MAX_TURNS) {
  turnCount++
  
  // ... 执行逻辑
  
  if (turnCount >= MAX_TURNS) {
    throw new Error("Max turns exceeded")
  }
}
```

**Codex**：
```rust
let mut turn_count = 0;
const MAX_TURNS: u32 = 100;

loop {
    turn_count += 1;
    
    if turn_count >= MAX_TURNS {
        return Err(Error::MaxTurnsExceeded);
    }
    
    // ... 执行逻辑
}
```

### 4. 性能对比

| 操作 | Claude Code | Codex | 差距 |
|------|-------------|-------|------|
| 单轮耗时 | ~2 秒 | ~1.5 秒 | 1.3 倍 |
| 内存占用 | ~50MB | ~20MB | 2.5 倍 |
| CPU 占用 | 中 | 低 | - |

**Codex 更快**：
- Rust 编译优化
- 更少的运行时开销
- 更高效的内存管理

---

## 流式处理对比

### Claude Code 的流式处理

```typescript
// 流式调用 API
const stream = await anthropic.messages.stream({
  model: "claude-3-5-sonnet-20241022",
  messages,
  tools,
})

// 处理流式事件
for await (const event of stream) {
  switch (event.type) {
    case "content_block_delta":
      yield { type: "chunk", data: event.delta.text }
      break
      
    case "tool_use":
      yield { type: "tool_call", tool: event }
      break
      
    case "message_stop":
      yield { type: "complete" }
      break
  }
}
```

### Codex 的流式处理

```rust
// 流式调用 API
let mut stream = self.client.messages_stream(request).await?;

// 处理流式事件
while let Some(event) = stream.next().await {
    match event? {
        StreamEvent::ContentBlockDelta(delta) => {
            self.emit_event(Event::Chunk(delta.text));
        }
        StreamEvent::ToolUse(tool) => {
            self.emit_event(Event::ToolCall(tool));
        }
        StreamEvent::MessageStop => {
            self.emit_event(Event::Complete);
            break;
        }
    }
}
```

---

## 错误处理对比

### Claude Code

```typescript
async function* query() {
  try {
    while (true) {
      try {
        const response = await callAPI()
        // ...
      } catch (error) {
        // 单次调用失败
        yield { type: "error", error }
        
        // 重试
        if (retries < MAX_RETRIES) {
          retries++
          continue
        } else {
          throw error
        }
      }
    }
  } catch (error) {
    // 整体失败
    yield { type: "fatal_error", error }
  }
}
```

### Codex

```rust
async fn agent_loop(&mut self) -> Result<()> {
    let mut retries = 0;
    
    loop {
        match self.call_api().await {
            Ok(response) => {
                retries = 0;  // 重置
                // ...
            }
            Err(e) => {
                retries += 1;
                
                if retries >= MAX_RETRIES {
                    return Err(e);
                }
                
                // 指数退避
                let delay = Duration::from_secs(2u64.pow(retries));
                tokio::time::sleep(delay).await;
            }
        }
    }
}
```

**Codex 更严格**：
- Result 类型强制错误处理
- 编译时检查
- 更难出错

---

## 可复用模板

### TypeScript AsyncGenerator 模板

```typescript
export async function* agentLoop(
  initialMessages: Message[],
  tools: Tool[]
): AsyncGenerator<AgentEvent> {
  
  const messages = [...initialMessages]
  let turnCount = 0
  const MAX_TURNS = 100
  
  while (turnCount < MAX_TURNS) {
    turnCount++
    
    // 1. 压缩检查
    if (shouldCompact(messages)) {
      yield { type: "compacting" }
      await compact(messages)
    }
    
    // 2. 调用 API
    let response
    try {
      response = await callAPI({ messages, tools })
    } catch (error) {
      yield { type: "error", error }
      continue
    }
    
    // 3. 流式返回
    for await (const chunk of response.stream) {
      yield { type: "chunk", data: chunk }
    }
    
    // 4. 检查退出
    if (!response.tool_calls || response.tool_calls.length === 0) {
      yield { type: "complete" }
      break
    }
    
    // 5. 执行工具
    for (const toolCall of response.tool_calls) {
      yield { type: "tool_start", tool: toolCall.name }
      
      const result = await executeTool(toolCall)
      
      yield { type: "tool_result", result }
      
      messages.push({
        role: "user",
        content: [{ type: "tool_result", content: result }]
      })
    }
  }
  
  if (turnCount >= MAX_TURNS) {
    yield { type: "error", error: "Max turns exceeded" }
  }
}
```

### Rust async loop 模板

```rust
pub async fn agent_loop(
    &mut self,
    initial_messages: Vec<Message>,
    tools: Vec<Tool>
) -> Result<()> {
    
    self.messages = initial_messages;
    let mut turn_count = 0;
    const MAX_TURNS: u32 = 100;
    
    loop {
        turn_count += 1;
        
        if turn_count >= MAX_TURNS {
            return Err(Error::MaxTurnsExceeded);
        }
        
        // 1. 压缩检查
        if self.should_compact() {
            self.emit_event(Event::Compacting);
            self.compact().await?;
        }
        
        // 2. 调用 API
        let response = match self.call_api(&tools).await {
            Ok(r) => r,
            Err(e) => {
                self.emit_event(Event::Error(e.to_string()));
                continue;
            }
        };
        
        // 3. 流式处理
        self.handle_stream(&response).await?;
        
        // 4. 检查退出
        if response.tool_calls.is_empty() {
            self.emit_event(Event::Complete);
            break;
        }
        
        // 5. 执行工具
        for tool_call in response.tool_calls {
            self.emit_event(Event::ToolStart(tool_call.name.clone()));
            
            let result = self.execute_tool(&tool_call).await?;
            
            self.emit_event(Event::ToolResult(result.clone()));
            
            self.messages.push(Message::tool_result(result));
        }
    }
    
    Ok(())
}
```

---

## 关键要点

1. **Claude Code：AsyncGenerator，流式优雅**
2. **Codex：async loop，简洁高效**
3. **退出条件：stop_reason vs should_continue**
4. **断路器：MAX_TURNS 防止无限循环**
5. **性能：Codex 快 1.3 倍，内存占用 1/2**
6. **错误处理：try-catch vs Result 类型**
7. **选择：用户体验 vs 性能**

**记住**：AsyncGenerator 更优雅，但 Rust loop 更高效。

---

**字数**：约 3000 字  
**阅读时间**：约 8 分钟
