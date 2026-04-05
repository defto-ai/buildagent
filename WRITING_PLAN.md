# 文章写作执行计划

## 总体目标

深入分析 Claude Code (TypeScript, 540K 行) 和 Codex (Rust, 467K 行)，完成 28 篇文章，帮助读者建立对 AI Agent 智能放大的深刻认知。

## 写作原则

1. **基于代码证据** - 所有结论必须有代码支撑，不编造
2. **对比分析** - 每个机制都要对比两个项目的实现
3. **真实案例** - 使用代码中的真实案例（如 3272 次压缩失败）
4. **深度认知** - 不只是"怎么做"，更要解释"为什么"
5. **可执行性** - 提供可复用的代码模板

## 执行阶段

### 阶段 1：认知基础（3篇）- 第1周
**目标**：建立智能的底层认知

- [ ] 00. 什么是智能？从感知到行动的完整闭环 (3000字)
- [ ] 01. Agent 智能的本质：不是更大的模型，而是完整的能力 (3500字)
- [ ] 02. 为什么这五个机制能放大智能？深层原理 (4000字)

**需要分析的代码**：
- `src/query.ts` - 理解循环机制
- `src/tools/` - 理解工具系统
- `src/QueryEngine.ts` - 理解完整闭环

### 阶段 2：失败案例（5篇）- 第2周
**目标**：通过反面教材理解必要性

- [ ] 03. 没有工具会怎样？ChatGPT 的局限 (3500字)
- [ ] 04. 没有循环会怎样？一次性执行的失败 (3000字)
- [ ] 05. 没有上下文会怎样？通用 AI 的尴尬 (3000字)
- [ ] 06. 没有 System Prompt 会怎样？行为不可控 (2500字)
- [ ] 07. 没有压缩会怎样？记忆丢失的代价 (2500字)

**需要分析的代码**：
- `src/services/api/claude.ts` - API 调用
- `src/context.ts` - 上下文注入
- `src/utils/compaction/` - 压缩机制
- 查找 3272 次失败的证据

### 阶段 3：设计决策分析（5篇）- 第3周
**目标**：理解设计思想的来源

- [ ] 08. 为什么需要断路器？3272 次失败的教训 (3000字)
- [ ] 09. 为什么工具要分"并发安全"和"独占"？(3000字)
- [ ] 10. 为什么 System Prompt 要分段缓存？(3000字)
- [ ] 11. 为什么需要 5 种权限模式？(3000字)
- [ ] 12. 为什么压缩触发阈值是 75%？(3000字)

**需要分析的代码**：
- `src/tools/Tool.ts` - `isConcurrencySafe` 标记
- `src/services/api/claude.ts` - Prompt Cache
- `src/types/permissions.ts` - 权限模式
- `src/utils/compaction/` - 压缩阈值

### 阶段 4：五大机制深入对比（10篇）- 第4-5周
**目标**：Claude Code vs Codex 完整对比

- [ ] 13. 机制 1：工具赋能 - Claude Code vs Codex (5000字)
- [ ] 14. 机制 2：多轮循环 - 两种实现方式 (4000字)
- [ ] 15. 机制 3：上下文注入 - CLAUDE.md vs 配置发现 (4000字)
- [ ] 16. 机制 4：System Prompt - 分段组装 vs 模板系统 (4000字)
- [ ] 17. 机制 5：自动压缩 - 断路器 vs 远程压缩 (5000字)
- [ ] 18. 工具调度：并发与正确性 (4000字)
- [ ] 19. 权限系统：5 种模式 vs ExecPolicy (4000字)
- [ ] 20. 重试与容错：指数退避 vs Rust 错误处理 (4000字)
- [ ] 21. 成本控制：Token 计数 vs 成本管理 (4000字)
- [ ] 22. 性能优化：TypeScript vs Rust (4000字)

**需要分析的代码**：
- Claude Code: `src/tools/`, `src/query.ts`, `src/QueryEngine.ts`
- Codex: `codex-rs/skills/`, `codex-rs/core/src/tools/`
- 对比两个项目的完整实现

### 阶段 5：实战案例（3篇）- 第6周
**目标**：完整实现示例

- [ ] 23. 案例 1：构建代码审查 Agent (6000字)
- [ ] 24. 案例 2：构建测试生成 Agent (5000字)
- [ ] 25. 案例 3：构建重构 Agent (5000字)

**需要实现**：
- TypeScript 版本（基于 Claude Code）
- Rust 版本（基于 Codex）
- Python 版本（通用实现）

### 阶段 6：总结（3篇）- 第7周
**目标**：提炼模式和指南

- [ ] 26. 智能放大的本质：完整的能力闭环 (4000字)
- [ ] 27. 构建你自己的 Agent：从 MVP 到生产级 (5000字)
- [ ] 28. AI Agent 的未来：下一个 10 倍在哪里？(3000字)

## 代码分析清单

### Claude Code 需要深入分析的模块

- [ ] `src/query.ts` (2330行) - 核心循环
- [ ] `src/QueryEngine.ts` - 会话编排
- [ ] `src/tools/` (61个工具) - 工具系统
- [ ] `src/services/api/claude.ts` - API 客户端
- [ ] `src/context.ts` - 上下文注入
- [ ] `src/utils/compaction/` - 压缩机制
- [ ] `src/types/permissions.ts` - 权限系统
- [ ] `src/cost-tracker.ts` - 成本控制

### Codex 需要深入分析的模块

- [ ] `codex-rs/core/src/codex.rs` (7718行) - 核心逻辑
- [ ] `codex-rs/skills/` - Skills 系统
- [ ] `codex-rs/core/src/tools/` - 工具实现
- [ ] `codex-rs/core/src/compact.rs` (16172行) - 压缩
- [ ] `codex-rs/core/src/exec_policy.rs` (31118行) - 权限
- [ ] API 客户端实现
- [ ] 成本管理实现

## 质量检查清单

每篇文章完成后检查：

- [ ] 有明确的核心问题
- [ ] 有真实的代码示例（带文件路径和行号）
- [ ] 有 Claude Code vs Codex 对比
- [ ] 有对比表格
- [ ] 有真实案例
- [ ] 有可复用模板
- [ ] 字数符合预期
- [ ] 语言通俗易懂
- [ ] 能让读者有"卧槽"的感觉

## 输出目录结构

```
docs/
├── 00-cognitive-foundation/
│   ├── 00-what-is-intelligence.md
│   ├── 01-agent-intelligence-essence.md
│   └── 02-five-mechanisms-principles.md
├── 01-failure-cases/
│   ├── 03-without-tools.md
│   ├── 04-without-loops.md
│   ├── 05-without-context.md
│   ├── 06-without-system-prompt.md
│   └── 07-without-compression.md
├── 02-design-decisions/
│   ├── 08-why-circuit-breaker.md
│   ├── 09-why-tool-classification.md
│   ├── 10-why-segmented-caching.md
│   ├── 11-why-five-permission-modes.md
│   └── 12-why-75-percent-threshold.md
├── 03-deep-comparison/
│   ├── 13-mechanism-1-tools.md
│   ├── 14-mechanism-2-loops.md
│   ├── 15-mechanism-3-context.md
│   ├── 16-mechanism-4-system-prompt.md
│   ├── 17-mechanism-5-compression.md
│   ├── 18-tool-orchestration.md
│   ├── 19-permission-system.md
│   ├── 20-retry-fallback.md
│   ├── 21-cost-control.md
│   └── 22-performance.md
├── 04-case-studies/
│   ├── 23-code-review-agent.md
│   ├── 24-test-generation-agent.md
│   └── 25-refactoring-agent.md
└── 05-summary/
    ├── 26-intelligence-amplification-essence.md
    ├── 27-build-your-own-agent.md
    └── 28-future-of-agents.md
```

## 时间估算

- 每篇文章平均 4000 字
- 每天写 2 篇（8000 字）
- 总计 28 篇 = 14 天
- 加上代码分析和修订 = 约 3-4 周

## 下一步

1. 开始阶段 1：写认知基础 3 篇
2. 用户审阅后继续阶段 2
3. 逐步完成所有 28 篇

---

**当前状态**: 准备开始阶段 1
**预计完成时间**: 3-4 周
