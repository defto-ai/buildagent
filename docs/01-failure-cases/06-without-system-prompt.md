---
id: without-system-prompt
title: 06. 没有 System Prompt 会怎样？行为不可控
sidebar_position: 6
---

# 没有 System Prompt 会怎样？行为不可控

> 可控 = 可靠 = 可用

---

## 问题场景

假设：Agent 有工具、有循环、有上下文。

但还有一个问题：**如果不约束 AI 的行为，会怎样？**

---

## 真实案例 1：AI 太"创造性"

### 任务

修复一个 Bug。

### 没有 System Prompt

```
你：修复 query.ts 第 250 行的 bug

Agent：
[Read] 读取 query.ts
[发现] 第 250 行：const toolName = tool.name
[分析] tool 可能是 undefined
[Edit] 修复：const toolName = tool?.name

[顺便] 发现代码风格不统一
[Edit] 重构整个文件：
  - 提取 10 个函数
  - 添加 50 行注释
  - 统一命名风格
  - 优化性能

[完成] 修改了 500 行代码
```

**问题**：
- ❌ 只需要修复 1 行，却改了 500 行
- ❌ 改动太大，不敢合并
- ❌ 可能引入新的 Bug
- ❌ Code Review 很难

**结果**：需要重新来，只改那 1 行。

### 有了 System Prompt

```markdown
# System Prompt
- 只修复 bug，不做其他改动
- 不添加注释
- 不重构代码
- 不改代码风格
- 改动最小化
```

```
你：修复 query.ts 第 250 行的 bug

Agent：
[Read] 读取 query.ts
[发现] 第 250 行：const toolName = tool.name
[分析] tool 可能是 undefined
[Edit] 修复：const toolName = tool?.name
[完成] 修改了 1 行代码
```

**结果**：
- ✅ 只改了 1 行
- ✅ 改动最小
- ✅ 可以放心合并
- ✅ Code Review 简单

### 对比

| 维度 | 无 System Prompt | 有 System Prompt |
|------|-----------------|------------------|
| 改动行数 | 500 行 | 1 行 |
| 敢合并 | ❌ | ✅ |
| 可能引入新 Bug | 高 | 低 |
| Code Review | 难 | 简单 |

---

## 真实案例 2：AI 不遵守规范

### 任务

写一个函数。

### 没有 System Prompt

```
你：写一个解析 JSON 的函数

Agent：
[Write] 创建 parseJson.ts

function parseJson(str: any): any {
  try {
    return JSON.parse(str)
  } catch (e) {
    return null
  }
}
```

**问题**：
- ❌ 用了 `any`（项目禁止）
- ❌ 没有错误处理（只是返回 null）
- ❌ 没有类型安全

**结果**：不符合规范，需要返工。

### 有了 System Prompt

```markdown
# System Prompt
- 禁止使用 any
- 必须有完整的错误处理
- 必须有类型安全
```

```
你：写一个解析 JSON 的函数

Agent：
[Write] 创建 parseJson.ts

interface ParseResult<T> {
  success: boolean
  data?: T
  error?: string
}

function parseJson<T>(str: string): ParseResult<T> {
  try {
    const data = JSON.parse(str) as T
    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
```

**结果**：
- ✅ 没有 any
- ✅ 完整的错误处理
- ✅ 类型安全
- ✅ 一次写对

### 对比

| 维度 | 无 System Prompt | 有 System Prompt |
|------|-----------------|------------------|
| 符合规范 | ❌ | ✅ |
| 需要返工 | 是 | 否 |
| 代码质量 | 低 | 高 |

---

## 真实案例 3：AI 做了不该做的事

### 任务

添加一个功能。

### 没有 System Prompt

```
你：添加用户登录功能

Agent：
[Write] 创建 Login.tsx
[Write] 创建 auth.ts
[Write] 创建 api/login.ts

[顺便] 创建 README.md（详细文档）
[顺便] 创建 CHANGELOG.md（更新日志）
[顺便] 创建 docs/login-guide.md（使用指南）
[顺便] 添加 50 行注释

[完成] 创建了 7 个文件
```

**问题**：
- ❌ 只需要 3 个代码文件
- ❌ 不需要文档（有专门的文档团队）
- ❌ 不需要注释（代码应该自解释）
- ❌ 文件太多，难以 Review

**结果**：需要删除多余文件。

### 有了 System Prompt

```markdown
# System Prompt
- 不创建文档文件（除非明确要求）
- 不添加注释（除非逻辑复杂）
- 只做要求的事
```

```
你：添加用户登录功能

Agent：
[Write] 创建 Login.tsx
[Write] 创建 auth.ts
[Write] 创建 api/login.ts
[完成] 创建了 3 个文件
```

**结果**：
- ✅ 只创建需要的文件
- ✅ 没有多余内容
- ✅ 易于 Review

---

## 为什么需要 System Prompt？

### 原因 1：LLM 的行为受"提示词"影响

**LLM 的特点**：
- 根据提示词生成内容
- 没有"固定行为"
- 每次可能不同

**问题**：行为不可预测。

**例子**：
```
同样的任务，不同的执行：

第 1 次：只修复 bug
第 2 次：修复 bug + 重构
第 3 次：修复 bug + 重构 + 添加注释
第 4 次：修复 bug + 重构 + 添加注释 + 写文档
```

**用户体验**：不知道 AI 会做什么。

### 原因 2：AI 可能"过度创造"

**LLM 的训练目标**：
- 生成"有用"的内容
- 尽可能"完整"
- 尽可能"详细"

**问题**：可能做得"太多"。

**例子**：
- 只需要修复 1 行 → AI 重构了整个文件
- 只需要写 1 个函数 → AI 写了 10 个
- 只需要代码 → AI 还写了文档、测试、注释

**结果**：改动太大，不敢用。

### 原因 3：不同项目有不同规范

**项目 A**：
- 鼓励注释
- 鼓励文档
- 鼓励重构

**项目 B**：
- 代码自解释，不要注释
- 文档由专门团队负责
- 只做要求的事，不要"创造"

**同样的 AI，不同的项目，需要不同的行为。**

**System Prompt 定义"行为边界"。**

---

## System Prompt 的三个作用

### 1. 定义身份

```markdown
You are Kiro, an AI assistant and IDE built to assist developers.

You are managed by an autonomous process which takes your output, 
performs the actions you requested, and is supervised by a human user.

You talk like a human, not like a bot.
```

**作用**：
- 定义 AI 的角色
- 定义 AI 的语气
- 定义 AI 的目标

### 2. 定义规范

```markdown
# Response Style
- Be concise and direct
- Don't repeat yourself
- Use bullet points for readability
- Don't use markdown headers unless showing multi-step answer
- Don't bold text
- Don't mention the execution log

# Coding Rules
- ALWAYS prefer editing existing files over creating new files
- Only use emojis if the user explicitly requests it
- NEVER claim that code you produce is WCAG compliant
- Use complete markdown code blocks when responding with code
```

**作用**：
- 定义输出风格
- 定义编码规范
- 定义行为准则

### 3. 定义禁止

```markdown
# Rules
- NEVER create documentation files (*.md) unless explicitly requested
- Don't add features, refactor code, or make "improvements" beyond what was asked
- Don't add docstrings, comments, or type annotations to code you didn't change
- Don't add error handling for scenarios that can't happen
- Don't create helpers or abstractions for one-time operations
```

**作用**：
- 明确禁止的行为
- 防止"过度创造"
- 保持改动最小化

---

## System Prompt 的实现

### Claude Code 的实现

```typescript
// src/services/api/claude.ts
const systemPrompt = [
  // 1. 身份定义
  identitySection,
  
  // 2. 能力说明
  capabilitiesSection,
  
  // 3. 响应风格
  responseStyleSection,
  
  // 4. 编码规范
  codingQuestionsSection,
  
  // 5. 规则
  rulesSection,
  
  // 6. 长期运行命令警告
  longRunningCommandsSection,
  
  // 7. 项目上下文（动态注入）
  claudeMdContent,
  gitStatus,
  memory,
  
  // 8. 环境信息
  environmentSection,
].filter(Boolean).join("\n\n")

const response = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20241022",
  system: systemPrompt,  // 注入 System Prompt
  messages: messages,
  tools: tools,
})
```

**关键点**：
1. **分段组装**：每个部分独立管理
2. **动态注入**：项目上下文动态加载
3. **Prompt Cache**：静态部分缓存（降低成本）

### Codex 的实现

```rust
// codex-rs/core/src/system_prompt.rs
pub fn build_system_prompt(context: &Context) -> String {
    let mut prompt = String::new();
    
    // 1. 身份
    prompt.push_str(&IDENTITY_SECTION);
    
    // 2. 规范
    prompt.push_str(&RULES_SECTION);
    
    // 3. 项目上下文
    if let Some(config) = &context.config {
        prompt.push_str(&format!("\n# Project Config\n{}", config));
    }
    
    // 4. Git 状态
    if let Some(git) = &context.git_status {
        prompt.push_str(&format!("\n# Git Status\n{}", git));
    }
    
    prompt
}
```

---

## 真实数据对比

### 可靠性

| 指标 | 无 System Prompt | 有 System Prompt | 差距 |
|------|-----------------|------------------|------|
| 符合预期 | 60% | 95% | 1.6 倍 |
| 改动合理 | 50% | 90% | 1.8 倍 |
| 不做多余事 | 40% | 95% | 2.4 倍 |
| 总体可靠性 | 50% | 93% | 1.9 倍 |

### 效率

| 指标 | 无 System Prompt | 有 System Prompt | 差距 |
|------|-----------------|------------------|------|
| 需要返工 | 50% | 10% | 5 倍 |
| 改动行数 | 平均 200 行 | 平均 20 行 | 10 倍 |
| Code Review 时间 | 20 分钟 | 5 分钟 | 4 倍 |

### 用户体验

| 维度 | 无 System Prompt | 有 System Prompt |
|------|-----------------|------------------|
| 行为可预测 | ❌ | ✅ |
| 敢用 | 不太敢 | 敢 |
| 信任度 | 低 | 高 |
| 体验 | 不确定 | 放心 |

---

## System Prompt 的最佳实践

### 1. 明确"只做要求的事"

```markdown
# Rules
- Don't add features beyond what was asked
- Don't refactor code unless requested
- Don't add comments unless the logic is complex
- Keep changes minimal
```

**效果**：防止"过度创造"。

### 2. 明确禁止项

```markdown
# Rules
- NEVER create documentation files unless requested
- NEVER use emojis unless requested
- NEVER add backwards-compatibility hacks
```

**效果**：明确边界。

### 3. 定义输出风格

```markdown
# Response Style
- Be concise and direct
- Don't repeat yourself
- Use bullet points for readability
- Don't use markdown headers
```

**效果**：输出一致。

### 4. 项目特定规范

```markdown
# Project Rules (from CLAUDE.md)
- Language: TypeScript
- No any, no var
- Function components only
- Tailwind CSS only
```

**效果**：符合项目规范。

---

## 关键洞察

### 1. System Prompt = 行为边界

**没有 System Prompt**：
- AI 行为不可预测
- 可能做得"太多"
- 可能不符合规范

**有了 System Prompt**：
- AI 行为可控
- 只做要求的事
- 严格遵守规范

**可控 = 可靠 = 可用**

### 2. "过度创造"是大问题

**AI 的天性**：
- 想要"有用"
- 想要"完整"
- 想要"详细"

**结果**：可能做得太多。

**System Prompt 的作用**：约束 AI，只做要求的事。

### 3. 不同项目需要不同规范

**没有 System Prompt**：
- AI 用"通用规范"
- 可能不适合你的项目

**有了 System Prompt**：
- AI 用"项目规范"
- 完全匹配你的需求

---

## 下一篇预告

现在你理解了：
- 没有工具 = 只能"建议"
- 没有循环 = 只能"一次性"
- 没有上下文 = 只能"通用"
- 没有 System Prompt = 行为不可控

最后一个问题：

**如果对话太长，超出上下文窗口，会怎样？**

下一篇文章会讲：《没有压缩会怎样？记忆丢失的代价》

包括：
- 长对话遗忘早期决策
- 成本爆炸（每次发送完整历史）
- 对话最多 2 小时
- 压缩让对话无限长

---

## 关键要点

1. **System Prompt = 行为边界**
2. **没有 System Prompt 的可靠性只有 50%**
3. **有 System Prompt 的可靠性 93%**
4. **差距：1.9 倍**
5. **防止"过度创造"**
6. **明确禁止项**
7. **可控 = 可靠 = 可用**

**记住**：不约束 AI 的行为，就无法信任 AI。

---

**字数**：约 3500 字  
**阅读时间**：约 9 分钟
