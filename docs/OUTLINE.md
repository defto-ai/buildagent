# Build Agent 专栏目录大纲

> 通过对比 Claude Code (TypeScript, 540K 行) 和 Codex (Rust, 467K 行)，学习 AI Agent 工程实践

---

## 📖 阅读指南

### 推荐阅读路径

**快速入门（2 小时）**
- 01 → 02 → 04 → 05 → 运行示例

**深入理解（10 小时）**
- 01-03 → 04-13 → 23

**实战导向（15 小时）**
- 01-03 → 04-13 → 20-22 → 24

**全面掌握（30 小时）**
- 按顺序阅读全部 25 篇

---

## 第一部分：开篇（3 篇）

### 01. 为什么要对比两个项目？✅ 已完成
**文件**: `docs/00-intro/01-why-compare.md`

**内容概要**：
- 对比学习的价值
- 为什么选择 Claude Code 和 Codex
- 15 个设计模式预览
- 学习路径建议

**关键要点**：
- 单项目 vs 双项目学习的差异
- 两个项目的规模和背景
- 读者能获得什么

---

### 02. 架构全景对比 📝 待写
**文件**: `docs/00-intro/02-architecture-overview.md`

**内容概要**：
- Claude Code 完整架构（6 层调用链）
- Codex 完整架构（集中式设计）
- 代码规模对比（文件数、行数、模块分布）
- 技术栈对比（语言、运行时、构建系统）
- 设计理念对比（企业级 vs 轻量级）

**对比表格**：
| 维度 | Claude Code | Codex |
|------|-------------|-------|
| 核心语言 | TypeScript | Rust |
| 代码行数 | 540,000 | 467,000 |
| 文件数 | 2,850 | ~1,200 |
| 架构风格 | 分层（6 跳） | 集中（单核心） |
| 核心文件 | query.ts (2,330 行) | codex.rs (7,718 行) |

**架构图**：
- Claude Code 调用链图
- Codex 调用链图
- 对比示意图

---

### 03. 如何选择适合你的方案？📝 待写
**文件**: `docs/00-intro/03-how-to-choose.md`

**内容概要**：
- 决策树：根据场景选择
- Claude Code 适合的场景
- Codex 适合的场景
- 混合方案建议

**决策维度**：
- 团队技术栈（TypeScript vs Rust）
- 项目规模（小型 vs 大型）
- 性能要求（启动速度、内存占用）
- 部署方式（云端 vs 本地）
- 扩展需求（插件系统、自定义工具）

---

## 第二部分：核心工程实践（10 篇）

> 每篇文章结构：问题 → Claude Code 方案 → Codex 方案 → 对比分析 → 可复用模板 → 实战建议

### 04. 多轮循环：AI Agent 的心跳 📝 待写
**文件**: `docs/01-core-practices/04-agent-loop.md`

**要解决的问题**：
- 为什么需要 `while(true)` 循环？
- 如何判断是否需要继续？
- 如何避免无限循环？

**Claude Code 方案**：
```typescript
async function* queryLoop() {
  while (true) {
    if (shouldCompact()) await compact()
    const response = await callAPI()
    if (!response.tool_calls) break
    await executeTools(response.tool_calls)
  }
}
```

**Codex 方案**：
```rust
async fn agent_loop() {
    loop {
        let response = call_api().await?;
        if !should_continue(&response) { break; }
        execute_tools(&response.tools).await?;
    }
}
```

**对比分析**：
- TypeScript AsyncGenerator vs Rust loop
- 退出条件判断逻辑
- 错误处理方式
- 性能差异

**可复用模板**：
- 通用循环模板（3 种语言）
- needsFollowUp 判断逻辑
- 最大轮次限制

---

### 05. 工具调度：并发与正确性的平衡 📝 待写
**文件**: `docs/01-core-practices/05-tool-orchestration.md`

**要解决的问题**：
- 哪些工具可以并发执行？
- 如何避免竞态条件？
- 如何处理工具依赖？

**Claude Code 方案**：
- `isConcurrencySafe` 标记
- 分组执行（并发 + 串行）
- 最多 10 个并发
- StreamingToolExecutor

**Codex 方案**：
- 工具分类策略
- 执行策略
- 资源锁定

**对比分析**：
- 并发策略差异
- 性能 vs 正确性权衡
- 适用场景

**可复用模板**：
- 工具分组逻辑
- 并发执行器
- 依赖解析

---

### 06. System Prompt 工程：精细控制 AI 行为 📝 待写
**文件**: `docs/01-core-practices/06-system-prompt.md`

**要解决的问题**：
- 如何组织 System Prompt？
- 如何动态注入上下文？
- 如何优化 token 使用？

**Claude Code 方案**：
- 分段组装（静态 + 动态）
- Prompt Cache 优化
- 多层级配置

**Codex 方案**：
- 模板系统
- 上下文注入策略

**对比分析**：
- 组织方式差异
- 缓存策略
- 成本优化

---

### 07. 上下文注入：让 AI 成为项目专家 📝 待写
**文件**: `docs/01-core-practices/07-context-injection.md`

**要解决的问题**：
- 如何让 AI 了解项目？
- 如何发现配置文件？
- 如何管理上下文预算？

**Claude Code 方案**：
- CLAUDE.md 发现机制
- Git 状态注入
- Memory 系统

**Codex 方案**：
- 配置发现
- 上下文管理

---

### 08. 自动压缩 + 断路器：无限对话的工程解法 📝 待写
**文件**: `docs/01-core-practices/08-auto-compaction.md`

**要解决的问题**：
- 如何突破上下文窗口限制？
- 何时触发压缩？
- 如何避免压缩失败？

**Claude Code 方案**：
- 触发条件（75% 阈值）
- 压缩算法
- 断路器（3 次失败熔断）
- 真实案例：3272 次失败

**Codex 方案**：
- compact.rs (16,172 行)
- 远程压缩支持

**对比分析**：
- 触发策略差异
- 压缩质量
- 容错机制

---

### 09. 权限系统：自主性与安全性的平衡 📝 待写
**文件**: `docs/01-core-practices/09-permission-system.md`

**要解决的问题**：
- 如何控制 AI 的操作权限？
- 如何分类危险操作？
- 如何设计审批流程？

**Claude Code 方案**：
- 5 种 PermissionMode
- 操作分类（可逆 vs 不可逆）
- 细粒度控制

**Codex 方案**：
- exec_policy.rs (31,118 行)
- ExecPolicyManager
- 沙箱支持

---

### 10. 重试与容错：构建可靠的 AI 应用 📝 待写
**文件**: `docs/01-core-practices/10-retry-fallback.md`

**要解决的问题**：
- API 调用失败怎么办？
- 如何设计重试策略？
- 如何降级处理？

**Claude Code 方案**：
- 指数退避
- 多层降级
- 模型回退

**Codex 方案**：
- 重试策略
- 错误处理

---

### 11. 成本控制：让用户用得起 📝 待写
**文件**: `docs/01-core-practices/11-cost-control.md`

**要解决的问题**：
- 如何估算 token 使用？
- 如何实时追踪成本？
- 如何优化成本？

**Claude Code 方案**：
- Token 计数器
- 成本追踪
- Prompt Cache 优化
- 预警机制

**Codex 方案**：
- 成本管理策略

---

### 12. 生命周期钩子：提供扩展点 📝 待写
**文件**: `docs/01-core-practices/12-lifecycle-hooks.md`

**要解决的问题**：
- 如何在关键节点插入自定义逻辑？
- 如何实现横切关注点？

**Claude Code 方案**：
- Hook 事件类型
- 配置方式
- 使用场景

**Codex 方案**：
- Hook 系统

---

### 13. 性能优化：启动速度与执行效率 📝 待写
**文件**: `docs/01-core-practices/13-performance-optimization.md`

**要解决的问题**：
- 如何加快启动速度？
- 如何优化执行效率？

**Claude Code 方案**：
- 快速路径（Fast Paths）
- 动态 import
- 流式处理

**Codex 方案**：
- Rust 性能优势
- 单二进制部署

**性能对比**：
| 指标 | Claude Code | Codex |
|------|-------------|-------|
| 启动时间 | ~300ms | ~150ms |
| 内存占用 | ~200MB | ~50MB |
| 二进制大小 | Node.js 依赖 | ~20MB |

---

## 第三部分：深入技术细节（6 篇）

### 14. API 客户端设计 📝 待写
**文件**: `docs/02-deep-dive/14-api-client.md`

**内容概要**：
- 流式响应处理
- 多 Provider 支持（Anthropic, AWS, GCP, Azure）
- 错误处理
- 重试逻辑

---

### 15. 消息类型系统 📝 待写
**文件**: `docs/02-deep-dive/15-message-types.md`

**内容概要**：
- Message 类型层次
- UserMessage, AssistantMessage, ToolMessage
- 类型安全设计

---

### 16. 会话编排 📝 待写
**文件**: `docs/02-deep-dive/16-session-management.md`

**内容概要**：
- QueryEngine 设计
- 会话状态管理
- 历史记录快照

---

### 17. 终端 UI 📝 待写
**文件**: `docs/02-deep-dive/17-terminal-ui.md`

**内容概要**：
- React + Ink 架构
- 组件设计
- 交互体验

---

### 18. Feature Flag 系统 📝 待写
**文件**: `docs/02-deep-dive/18-feature-flags.md`

**内容概要**：
- Feature Flag 设计
- 运行时控制
- 构建时优化

---

### 19. MCP 协议 📝 待写
**文件**: `docs/02-deep-dive/19-mcp-protocol.md`

**内容概要**：
- MCP 协议介绍
- 工具集成
- 服务器管理

---

## 第四部分：实战案例（3 篇）

### 20. 案例 1：构建代码审查 Agent 📝 待写
**文件**: `docs/03-case-studies/20-code-review-agent.md`

**内容概要**：
- 需求分析
- 架构设计
- 完整实现（TypeScript + Rust + Python）
- 运行效果

---

### 21. 案例 2：构建测试生成 Agent 📝 待写
**文件**: `docs/03-case-studies/21-test-generation-agent.md`

---

### 22. 案例 3：构建重构 Agent 📝 待写
**文件**: `docs/03-case-studies/22-refactoring-agent.md`

---

## 第五部分：总结（3 篇）

### 23. 15 个设计模式总结 📝 待写
**文件**: `docs/04-summary/23-design-patterns.md`

**内容概要**：
- 每个模式的两种实现
- 适用场景
- 速查表

**15 个模式**：
1. Turn Loop - 多轮循环
2. Tool Grouping - 工具分组
3. Streaming Execution - 流式执行
4. Segmented Caching - 分段缓存
5. Auto-Compaction - 自动压缩
6. Permission System - 权限系统
7. Retry & Fallback - 重试降级
8. Context Injection - 上下文注入
9. Lifecycle Hooks - 生命周期钩子
10. Fast Paths - 快速路径
11. Cost Control - 成本控制
12. Feature Flags - 特性开关
13. Layered Architecture - 分层架构
14. Message Types - 消息类型
15. Streaming - 流式处理

---

### 24. 构建你自己的 Agent：决策指南 📝 待写
**文件**: `docs/04-summary/24-decision-guide.md`

**内容概要**：
- 从 MVP 到生产级
- 技术栈选择
- 常见陷阱
- 检查清单

---

### 25. AI Agent 的未来 📝 待写
**文件**: `docs/04-summary/25-future-trends.md`

**内容概要**：
- 从两个项目看趋势
- 下一代 Agent 的可能方向
- 技术演进预测

---

## 附录

### A. 源码分析
**目录**: `docs/analysis/`

- ✅ `codex-vs-claude-code.md` - 完整对比分析
- 📝 `claude-code-architecture.md` - Claude Code 架构详解
- 📝 `codex-architecture.md` - Codex 架构详解
- 📝 `code-metrics.md` - 代码指标对比

---

### B. 代码示例
**目录**: `examples/`

- ✅ `01-minimal-agent/` - 最小可用 Agent (100 行)
- 📝 `02-agent-with-tools/` - 带工具的 Agent
- 📝 `03-agent-with-permissions/` - 带权限的 Agent
- 📝 `04-agent-with-compaction/` - 带压缩的 Agent
- 📝 `05-production-agent/` - 生产级 Agent

---

### C. 模板库
**目录**: `templates/`

- 📝 `agent-loop.ts` - 多轮循环模板
- 📝 `tool-orchestration.ts` - 工具调度模板
- 📝 `permission-system.ts` - 权限系统模板
- 📝 `auto-compaction.ts` - 自动压缩模板
- 📝 `retry-fallback.ts` - 重试降级模板
- 📝 `cost-tracker.ts` - 成本追踪模板

---

## 统计信息

### 当前进度
- ✅ 文章：2/25 (8%)
- ✅ 代码示例：1/5 (20%)
- ✅ 模板：0/6 (0%)

### 目标
- 📊 总文章数：25 篇
- 📊 预计总字数：~15 万字
- 📊 预计阅读时间：~30 小时
- 📊 代码示例：15+ 个（3 种语言）
- 📊 可复用模板：6 个

---

## 写作优先级

### 第一优先级（本周）
1. 02-architecture-overview.md
2. 04-agent-loop.md
3. 05-tool-orchestration.md
4. 02-agent-with-tools/ 示例

### 第二优先级（本月）
1. 06-system-prompt.md
2. 08-auto-compaction.md
3. 09-permission-system.md
4. 11-cost-control.md
5. 03-agent-with-permissions/ 示例

### 第三优先级（下月）
1. 完成所有核心实践（10 篇）
2. 完成所有代码示例（5 个）
3. 完成模板库（6 个）

---

⭐ 这个大纲是否符合你的预期？需要调整吗？
