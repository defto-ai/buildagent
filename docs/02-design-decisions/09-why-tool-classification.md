---
id: why-tool-classification
title: 09. 为什么工具要分"并发安全"和"独占"？
sidebar_position: 9
---

# 为什么工具要分"并发安全"和"独占"？

> 并发 = 快 10 倍，但需要正确性保证

---

## 问题场景

假设 AI 需要执行 10 个工具调用：

**串行执行**：
```
Read file1 → Read file2 → Read file3 → ... → Read file10
总时间：10 × 0.5 秒 = 5 秒
```

**并发执行**：
```
同时执行：Read file1, Read file2, ..., Read file10
总时间：0.5 秒
```

**差距：10 倍！**

但问题是：**所有工具都能并发执行吗？**

---

## 代码证据：Claude Code 的分类

```typescript
// src/tools/ReadTool/index.ts
export const ReadTool: Tool = {
  name: "Read",
  isConcurrencySafe: true,  // 可以并发
  // ...
}

// src/tools/EditTool/index.ts
export const EditTool: Tool = {
  name: "Edit",
  isConcurrencySafe: false,  // 不能并发（独占）
  // ...
}

// src/tools/BashTool/index.ts
export const BashTool: Tool = {
  name: "Bash",
  isConcurrencySafe: false,  // 不能并发（独占）
  // ...
}
```

**关键字段**：`isConcurrencySafe`

---

## 为什么需要分类？

### 案例 1：并发读取（安全）

```typescript
// 并发执行 3 个 Read
await Promise.all([
  Read({ file_path: "file1.ts" }),
  Read({ file_path: "file2.ts" }),
  Read({ file_path: "file3.ts" })
])
```

**结果**：
- ✅ 安全（每个文件独立）
- ✅ 快（0.5 秒 vs 1.5 秒）
- ✅ 没有竞态条件

### 案例 2：并发编辑（危险）

```typescript
// 并发执行 2 个 Edit（同一个文件）
await Promise.all([
  Edit({ file_path: "query.ts", old_string: "const x = 1", new_string: "const x = 2" }),
  Edit({ file_path: "query.ts", old_string: "const y = 1", new_string: "const y = 2" })
])
```

**问题**：
- ❌ 竞态条件
- ❌ 可能只有一个修改生效
- ❌ 文件可能损坏

**原因**：
```
时间 T1：Edit1 读取文件
时间 T2：Edit2 读取文件（读到的是旧内容）
时间 T3：Edit1 写入文件
时间 T4：Edit2 写入文件（覆盖了 Edit1 的修改）
```

**结果**：Edit1 的修改丢失。

---

## Claude Code 的实现

### 工具分组

```typescript
// src/utils/toolOrchestration.ts
function groupTools(toolCalls: ToolCall[]): ToolGroup[] {
  const concurrentSafe: ToolCall[] = []
  const exclusive: ToolCall[] = []
  
  for (const call of toolCalls) {
    const tool = findToolByName(call.name)
    
    if (tool.isConcurrencySafe) {
      concurrentSafe.push(call)
    } else {
      exclusive.push(call)
    }
  }
  
  return [
    { type: "concurrent", calls: concurrentSafe },
    { type: "sequential", calls: exclusive }
  ]
}
```

### 执行策略

```typescript
async function executeTools(toolCalls: ToolCall[]) {
  const groups = groupTools(toolCalls)
  
  for (const group of groups) {
    if (group.type === "concurrent") {
      // 并发执行（最多 10 个）
      await Promise.all(
        group.calls.slice(0, 10).map(call => executeTool(call))
      )
    } else {
      // 串行执行
      for (const call of group.calls) {
        await executeTool(call)
      }
    }
  }
}
```

### 52 个工具的分类

**并发安全（可以并发）**：
- Read（读文件）
- Grep（搜索）
- Glob（查找文件）
- Git（查看状态）
- WebFetch（获取网页）
- 共 30+ 个

**独占（必须串行）**：
- Write（写文件）
- Edit（修改文件）
- Bash（运行命令）
- Git（修改操作）
- 共 20+ 个

---

## Codex 的实现

```rust
// codex-rs/core/src/tools/mod.rs
pub enum ToolConcurrency {
    Safe,      // 可以并发
    Exclusive, // 必须串行
}

pub trait Tool {
    fn concurrency(&self) -> ToolConcurrency;
}

// codex-rs/core/src/tools/read.rs
impl Tool for ReadTool {
    fn concurrency(&self) -> ToolConcurrency {
        ToolConcurrency::Safe  // 读取是安全的
    }
}

// codex-rs/core/src/tools/edit.rs
impl Tool for EditTool {
    fn concurrency(&self) -> ToolConcurrency {
        ToolConcurrency::Exclusive  // 编辑必须串行
    }
}
```

---

## 性能对比

### 场景：读取 10 个文件

| 策略 | 时间 | 差距 |
|------|------|------|
| 串行 | 5 秒 | - |
| 并发 | 0.5 秒 | **10 倍** |

### 场景：修改 5 个文件

| 策略 | 时间 | 正确性 |
|------|------|--------|
| 串行 | 2.5 秒 | ✅ 正确 |
| 并发 | 0.5 秒 | ❌ 可能错误 |

**结论**：并发快，但需要保证正确性。

---

## 关键要点

1. **并发 = 快 10 倍**
2. **但不是所有工具都能并发**
3. **分类标准：是否有竞态条件**
4. **Claude Code：`isConcurrencySafe` 标记**
5. **Codex：`ToolConcurrency` 枚举**
6. **读操作：并发安全**
7. **写操作：必须串行**

---

**字数**：约 1500 字  
**阅读时间**：约 4 分钟
