# 为什么要对比两个项目？

当你想学习如何构建 AI Agent 时，你会怎么做？

大多数人会：
- 看教程（但都是玩具项目，100 行代码）
- 读文档（但只讲 API，不讲架构）
- 看开源项目（但只看一个，不知道是否是最佳实践）

**问题是**：你不知道这是"唯一的做法"还是"最好的做法"。

---

## 对比学习的价值

### 看一个项目 vs 看两个项目

**只看 Claude Code**：
- ✅ 学到：Claude Code 怎么做
- ❌ 不知道：为什么这样做？有没有更好的方法？

**对比 Claude Code 和 Codex**：
- ✅ 学到：两种不同的实现方式
- ✅ 理解：设计权衡（为什么 Claude Code 用 TypeScript？为什么 Codex 用 Rust？）
- ✅ 提炼：通用模式（两个项目都用的 = 最佳实践）
- ✅ 选择：哪个更适合你的场景

---

## 为什么选择这两个项目？

### 1. 都是生产级

**Claude Code**：
- Anthropic 官方 CLI 工具
- 经过大规模用户验证
- 540,000 行 TypeScript

**Codex**：
- OpenAI 官方 CLI 工具
- 73,000+ GitHub Stars
- 467,000 行 Rust

**不是玩具项目，而是真实世界的解决方案。**

---

### 2. 技术栈完全不同

| 维度 | Claude Code | Codex |
|------|-------------|-------|
| 语言 | TypeScript | Rust |
| 运行时 | Bun | Tokio |
| 架构 | 分层（6 跳） | 集中（单核心） |
| 理念 | 企业级、功能全面 | 轻量级、性能优先 |

**同样的问题，完全不同的解决方案。**

这让你能看到：
- 为什么 TypeScript 适合快速迭代？
- 为什么 Rust 适合性能优化？
- 分层架构 vs 集中架构的权衡是什么？

---

### 3. 规模相当

两个项目都是 40-50 万行代码，说明：
- 构建生产级 AI Agent 确实需要这个复杂度
- 不是简单的"调用 API + 执行工具"
- 有大量工程细节需要处理

---

## 你会学到什么？

### 不只是"怎么做"，更是"为什么"

**传统教程**：
```typescript
// 这是一个 Agent
while (true) {
  const response = await callLLM()
  if (!response.tool_calls) break
  await executeTools(response.tool_calls)
}
```

**本专栏**：
```typescript
// Claude Code 的实现（TypeScript）
async function* queryLoop() {
  while (true) {
    // 为什么用 AsyncGenerator？
    // 为什么要检查压缩？
    if (shouldCompact()) await compact()
    
    const response = await callAPI()
    
    // 为什么要分组执行工具？
    const concurrent = tools.filter(t => t.isConcurrencySafe)
    const exclusive = tools.filter(t => !t.isConcurrencySafe)
    
    await Promise.all(concurrent.map(execute))
    for (const tool of exclusive) await execute(tool)
    
    if (!needsFollowUp) break
  }
}

// Codex 的实现（Rust）
async fn agent_loop() {
    loop {
        // 为什么 Rust 版本更简洁？
        // 性能差异是什么？
        let response = call_api().await?;
        if !should_continue(&response) { break; }
        execute_tools(&response.tools).await?;
    }
}
```

**你会理解**：
- 为什么需要 `while(true)`？（不用会怎样？）
- 为什么要分组执行工具？（全部并发会怎样？）
- 为什么要检查压缩？（不压缩会怎样？）
- TypeScript 和 Rust 的实现差异在哪里？

---

## 15 个可复用的设计模式

通过对比两个项目，我们提炼出 **15 个设计模式**：

1. **Turn Loop** - 多轮循环
2. **Tool Grouping** - 工具分组
3. **Streaming Execution** - 流式执行
4. **Segmented Caching** - 分段缓存
5. **Auto-Compaction** - 自动压缩
6. **Permission System** - 权限系统
7. **Retry & Fallback** - 重试降级
8. **Context Injection** - 上下文注入
9. **Lifecycle Hooks** - 生命周期钩子
10. **Fast Paths** - 快速路径
11. **Cost Control** - 成本控制
12. **Feature Flags** - 特性开关
13. **Layered Architecture** - 分层架构
14. **Message Types** - 消息类型
15. **Streaming** - 流式处理

**每个模式都有**：
- 两种实现（TypeScript vs Rust）
- 设计权衡分析
- 适用场景
- 可复制的代码模板

---

## 这个专栏适合谁？

### ✅ 适合你，如果你：

- 想构建自己的 AI Agent
- 想理解生产级 Agent 的架构
- 想学习可复用的设计模式
- 想知道如何选择技术栈
- 想避免重复造轮子

### ⚠️ 不适合你，如果你：

- 只想要"快速入门"教程（本专栏深入源码）
- 不关心"为什么"，只要"能跑"
- 不想投入时间学习（每篇文章 15-30 分钟）

---

## 如何阅读这个专栏？

### 推荐路径

**快速入门（2 小时）**：
1. 本文（为什么对比）
2. [架构全景对比](02-architecture-overview.md)
3. [多轮循环](../01-core-practices/04-agent-loop.md)
4. [工具调度](../01-core-practices/05-tool-orchestration.md)
5. [运行示例](../../examples/01-minimal-agent/)

**深入理解（10 小时）**：
- 阅读全部核心实践（10 篇）
- 运行所有代码示例
- 完成一个实战案例

**生产级（20+ 小时）**：
- 深入技术细节（6 篇）
- 构建完整的 Agent
- 性能优化和成本控制

---

## 开始学习

准备好了吗？

👉 [下一篇：架构全景对比](02-architecture-overview.md)

看看两个 50 万行项目的完整架构，建立整体认知。

---

## 关于作者

我深入分析了两个生产级 AI Agent 项目的源码，提炼出这些可复用的工程实践。

如果你有任何问题或建议，欢迎：
- 提 Issue：[GitHub Issues](https://github.com/yourusername/buildagent/issues)
- 参与讨论：[GitHub Discussions](https://github.com/yourusername/buildagent/discussions)

---

⭐ 觉得有帮助？给个 Star 吧！
