---
id: build-your-own-agent
title: 27. 构建你自己的 Agent：从 MVP 到生产级
sidebar_position: 27
---

# 构建你自己的 Agent：从 MVP 到生产级

> 4 个阶段，从 0 到 1

---

## 阶段 1：MVP（第 1 天）

### 目标

**最小可用**：
- 3 个工具（Read, Write, Bash）
- 基础循环
- 能完成简单任务

### 实现（100 行代码）

```typescript
// minimal-agent.ts
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic()

async function agent(task: string) {
  const messages = [{ role: "user", content: task }]
  
  // 简单循环
  for (let i = 0; i < 5; i++) {
    const response = await anthropic.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 4096,
      messages,
      tools: [
        {
          name: "read_file",
          description: "Read a file",
          input_schema: {
            type: "object",
            properties: {
              path: { type: "string" }
            }
          }
        },
        {
          name: "write_file",
          description: "Write a file",
          input_schema: {
            type: "object",
            properties: {
              path: { type: "string" },
              content: { type: "string" }
            }
          }
        },
        {
          name: "bash",
          description: "Run a command",
          input_schema: {
            type: "object",
            properties: {
              command: { type: "string" }
            }
          }
        }
      ]
    })
    
    // 检查是否结束
    if (response.stop_reason === "end_turn") {
      break
    }
    
    // 执行工具
    for (const block of response.content) {
      if (block.type === "tool_use") {
        const result = await executeTool(block.name, block.input)
        messages.push({
          role: "user",
          content: [{
            type: "tool_result",
            tool_use_id: block.id,
            content: result
          }]
        })
      }
    }
  }
}

async function executeTool(name: string, input: any): Promise<string> {
  switch (name) {
    case "read_file":
      return await fs.readFile(input.path, "utf-8")
    case "write_file":
      await fs.writeFile(input.path, input.content)
      return "File written"
    case "bash":
      const { stdout } = await exec(input.command)
      return stdout
    default:
      return "Unknown tool"
  }
}
```

**测试**：
```typescript
await agent("Create a file hello.txt with content 'Hello World'")
// ✅ 成功
```

**时间**：2 小时  
**能力**：简单任务（成功率 60%）

---

## 阶段 2：可用版（第 1 周）

### 新增功能

1. **上下文注入**
2. **System Prompt**
3. **错误处理**
4. **更多工具**（10 个）

### 关键改进

```typescript
// 1. 上下文注入
const claudeMd = await fs.readFile("CLAUDE.md", "utf-8")

const systemPrompt = `
${claudeMd}

Current date: ${new Date().toISOString()}
`

// 2. 错误处理
try {
  const result = await executeTool(name, input)
} catch (error) {
  return `Error: ${error.message}`
}

// 3. 断路器
if (turnCount >= 10) {
  throw new Error("Max turns exceeded")
}
```

**时间**：1 周  
**能力**：中等任务（成功率 80%）

---

## 阶段 3：生产级（第 1 月）

### 新增功能

1. **权限系统**
2. **自动压缩**
3. **成本追踪**
4. **重试机制**
5. **日志审计**

### 关键改进

```typescript
// 1. 权限系统
const permission = await askUser(`Execute: ${tool.name}?`)
if (!permission) {
  return "Permission denied"
}

// 2. 自动压缩
if (estimateTokens(messages) > 150000) {
  await compact(messages)
}

// 3. 成本追踪
costTracker.track(response.usage)
console.log(`Cost: $${costTracker.getCost().toFixed(2)}`)

// 4. 重试
await retryWithBackoff(async () => {
  return await callAPI()
}, 3)
```

**时间**：1 月  
**能力**：复杂任务（成功率 90%）

---

## 阶段 4：企业级（第 3 月）

### 新增功能

1. **多用户支持**
2. **团队协作**
3. **审计日志**
4. **性能监控**
5. **灾难恢复**

### 架构升级

```typescript
// 1. 多用户
class AgentService {
  private sessions = new Map<string, Session>()
  
  async createSession(userId: string): Promise<string> {
    const sessionId = generateId()
    this.sessions.set(sessionId, new Session(userId))
    return sessionId
  }
}

// 2. 审计日志
await auditLog.record({
  userId,
  action: "tool_execution",
  tool: toolName,
  timestamp: Date.now()
})

// 3. 性能监控
const start = Date.now()
await executeTool()
const duration = Date.now() - start
metrics.record("tool_execution_time", duration)
```

**时间**：3 月  
**能力**：企业级（成功率 95%，可靠性 99.9%）

---

## 关键决策点

### 决策 1：语言选择

| 语言 | 优势 | 劣势 | 适合场景 |
|------|------|------|---------|
| TypeScript | 开发快、生态好 | 性能一般 | 快速迭代 |
| Rust | 性能好、安全 | 学习曲线陡 | 生产环境 |
| Python | 简单、AI 生态 | 性能差 | 原型验证 |

**建议**：
- MVP：Python（最快）
- 生产：TypeScript（平衡）
- 高性能：Rust（最优）

### 决策 2：工具数量

| 阶段 | 工具数 | 说明 |
|------|--------|------|
| MVP | 3-5 | 核心工具 |
| 可用 | 10-15 | 常用工具 |
| 生产 | 20-30 | 完整工具 |
| 企业 | 30-50 | 定制工具 |

**建议**：从少到多，按需添加

### 决策 3：部署方式

| 方式 | 优势 | 劣势 |
|------|------|------|
| 本地 CLI | 简单、快速 | 单用户 |
| Web 服务 | 多用户、协作 | 复杂 |
| 云函数 | 弹性、低成本 | 冷启动 |

**建议**：
- 个人：本地 CLI
- 团队：Web 服务
- 企业：混合部署

---

## 常见陷阱

### 陷阱 1：过度设计

**错误**：
```typescript
// 第 1 天就设计复杂架构
class AbstractToolFactory {
  createTool(type: ToolType): ITool { ... }
}
```

**正确**：
```typescript
// 先简单实现
const tools = [readFile, writeFile, bash]
```

**教训**：先做出来，再优化

### 陷阱 2：忽略错误处理

**错误**：
```typescript
const result = await callAPI()  // 可能失败
```

**正确**：
```typescript
try {
  const result = await callAPI()
} catch (error) {
  if (error.status === 429) {
    await sleep(2000)
    return retry()
  }
  throw error
}
```

**教训**：生产环境必须处理错误

### 陷阱 3：无限循环

**错误**：
```typescript
while (true) {
  await executeTools()  // 可能永远不结束
}
```

**正确**：
```typescript
let turns = 0
while (turns < 10) {
  turns++
  await executeTools()
}
```

**教训**：必须有断路器

---

## 检查清单

### MVP 阶段 ✅
- [ ] 3 个核心工具
- [ ] 基础循环（最多 5 轮）
- [ ] 能完成简单任务
- [ ] 100 行代码以内

### 可用阶段 ✅
- [ ] 10 个工具
- [ ] 上下文注入
- [ ] System Prompt
- [ ] 错误处理
- [ ] 断路器

### 生产阶段 ✅
- [ ] 权限系统
- [ ] 自动压缩
- [ ] 成本追踪
- [ ] 重试机制
- [ ] 日志审计
- [ ] 测试覆盖率 80%+

### 企业阶段 ✅
- [ ] 多用户支持
- [ ] 团队协作
- [ ] 性能监控
- [ ] 灾难恢复
- [ ] 可靠性 99.9%+

---

## 关键要点

1. **4 个阶段：MVP → 可用 → 生产 → 企业**
2. **MVP 只需 100 行代码**
3. **先做出来，再优化**
4. **避免过度设计**
5. **错误处理和断路器是必需品**
6. **从 3 个工具开始，按需添加**
7. **TypeScript 是最佳平衡点**

**记住**：完成 > 完美，迭代 > 一次到位。

---

**字数**：约 2200 字  
**阅读时间**：约 6 分钟
