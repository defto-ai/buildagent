# Build Agent

[English](README.md) | 中文

> 一份对 Claude Code（约 54 万行 TypeScript）和 Codex（约 46 万行 Rust）的逐行精读。把这两个生产级 AI Agent 系统并排放在一起，能学到什么？

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Website](https://img.shields.io/badge/website-buildagent.dev-green.svg)](https://buildagent.dev)

> **状态**：Work in progress。一些文章已经写得比较深入，一些还是占位中。新发现写完即发，不囤稿。

## 🎯 这是什么？

**Claude Code**（Anthropic，约 54 万行 TypeScript）和 **Codex**（OpenAI，约 46 万行 Rust）是目前最有野心、规模最大的两个开源编程 Agent 代码库。

这个项目是一项长期工作：把两个项目逐行读完，把"用工具用不出来、但读源码才能看到"的设计模式、权衡和决策记录下来。

## 💡 一些初步洞察

读了一段时间后比较确定的几件事：

1. **Agent ≠ LLM**。"会建议"和"能执行"是两类完全不同的产品，真正有意思的工程都活在这个差距里。
2. **瓶颈是系统，不是模型**。工具、循环、上下文、prompt 组装通常比"调哪个模型"更影响产品体验。
3. **智能放大是乘法，不是加法**。工具 × 循环 × 上下文 × prompt × 压缩，每个机制都在放大其它机制；任何一环弱，整个产品就被拉低。
4. **下一个大改进在系统层**，不在模型层。

这几条在下面的文章里会展开。

## 📚 文档结构

### [Part 0: 认知基础](docs/00-cognitive-foundation/) (3 篇)

建立对 AI Agent 智能本质的深刻理解

- [00. 什么是智能？](docs/00-cognitive-foundation/00-what-is-intelligence.md) - 完整闭环定义
- [01. Agent 智能的本质](docs/00-cognitive-foundation/01-agent-intelligence-essence.md) - 智能放大公式
- [02. 五大机制的深层原理](docs/00-cognitive-foundation/02-five-mechanisms-principles.md) - 信息论、控制论

### [Part 1: 失败案例](docs/01-failure-cases/) (5 篇)

从失败中学习，理解每个机制的必要性

- [03. 没有工具会怎样？](docs/01-failure-cases/03-without-tools.md) - 效率降低 10-20 倍
- [04. 没有循环会怎样？](docs/01-failure-cases/04-without-loops.md) - 3272 压缩失败案例
- [05. 没有上下文会怎样？](docs/01-failure-cases/05-without-context.md) - 50% 返工率
- [06. 没有 System Prompt 会怎样？](docs/01-failure-cases/06-without-system-prompt.md) - 50% 可靠性
- [07. 没有压缩会怎样？](docs/01-failure-cases/07-without-compression.md) - 2 小时对话限制

### [Part 2: 设计决策](docs/02-design-decisions/) (5 篇)

深入理解关键设计决策背后的原因

- [08. 为什么是 3 次重试？](docs/02-design-decisions/08-why-circuit-breaker.md) - 断路器设计
- [09. 为什么要工具分类？](docs/02-design-decisions/09-why-tool-classification.md) - 并发安全
- [10. 为什么分段缓存？](docs/02-design-decisions/10-why-segmented-caching.md) - 90% 成本节省
- [11. 为什么是 5 种权限模式？](docs/02-design-decisions/11-why-five-permission-modes.md) - 用户分布
- [12. 为什么是 75% 阈值？](docs/02-design-decisions/12-why-75-percent-threshold.md) - 压缩时机

### [Part 3: 深度对比](docs/03-deep-comparison/) (10 篇)

对比 Claude Code 和 Codex 的实现方式

**五大机制对比**：
- [13. 工具系统](docs/03-deep-comparison/13-mechanism-1-tools.md) - 52 vs 30 工具
- [14. 循环机制](docs/03-deep-comparison/14-mechanism-2-loops.md) - AsyncGenerator vs Rust
- [15. 上下文注入](docs/03-deep-comparison/15-mechanism-3-context.md) - CLAUDE.md vs config.toml
- [16. System Prompt](docs/03-deep-comparison/16-mechanism-4-system-prompt.md) - 分段组装
- [17. 自动压缩](docs/03-deep-comparison/17-mechanism-5-compression.md) - 本地 vs 远程

**系统设计对比**：
- [18. 工具调度](docs/03-deep-comparison/18-tool-orchestration.md) - Amdahl 定律，90/10 规则
- [19. 权限系统](docs/03-deep-comparison/19-permission-system.md) - 贝叶斯信任模型
- [20. 重试与降级](docs/03-deep-comparison/20-retry-fallback.md) - 指数退避
- [21. 成本控制](docs/03-deep-comparison/21-cost-control.md) - Prompt Cache
- [22. 性能对比](docs/03-deep-comparison/22-performance.md) - TypeScript vs Rust

### [Part 4: 案例研究](docs/04-case-studies/) (3 篇)

实战案例，学习如何构建特定类型的 Agent

- [23. 代码审查 Agent](docs/04-case-studies/23-code-review-agent.md) - 81% 准确率
- [24. 测试生成 Agent](docs/04-case-studies/24-test-generation-agent.md) - 85%+ 覆盖率
- [25. 重构 Agent](docs/04-case-studies/25-refactoring-agent.md) - 95% 成功率

### [Part 5: 总结](docs/05-summary/) (3 篇)

总结核心洞察，指导实践

- [26. 智能放大的本质](docs/05-summary/26-intelligence-amplification-essence.md) - 乘法 vs 加法
- [27. 构建你自己的 Agent](docs/05-summary/27-build-your-own-agent.md) - 从 MVP 到生产级
- [28. AI Agent 的未来](docs/05-summary/28-future-of-agents.md) - 下一个 10 倍在哪里

## 🚀 快速开始

### 1. 理解智能本质（10 分钟）

阅读前 3 篇文章，建立认知基础：
- [什么是智能？](docs/00-cognitive-foundation/00-what-is-intelligence.md)
- [Agent 智能的本质](docs/00-cognitive-foundation/01-agent-intelligence-essence.md)
- [五大机制的深层原理](docs/00-cognitive-foundation/02-five-mechanisms-principles.md)

### 2. 从失败中学习（30 分钟）

阅读失败案例，理解每个机制的必要性：
- [没有工具](docs/01-failure-cases/03-without-tools.md) - 效率降低 10-20 倍
- [没有循环](docs/01-failure-cases/04-without-loops.md) - 3272 失败案例
- [没有上下文](docs/01-failure-cases/05-without-context.md) - 50% 返工率

### 3. 构建你的 Agent（1 小时）

跟随教程，构建你的第一个 Agent：
- [构建你自己的 Agent](docs/05-summary/27-build-your-own-agent.md) - 100 行代码的 MVP

## 📊 速览

下面这张表是基于阅读源码得到的粗略对比。代码量是真实统计，速度/特点是阅读印象，不是 benchmark。

| 项目 | 语言 | 代码量 | 架构 | 工具 |
|------|------|--------|------|------|
| Claude Code | TypeScript | ~54 万行 | 分层（约 6 层） | 50+ 内置工具 |
| Codex | Rust | ~46 万行 | 中心化核心 | ~30 个工具，基于 Skills |

读到现在反复浮现的几个主题（每个都会有专门的文章）：

- **Prompt cache** 是两个系统里成本侧最大的杠杆
- **自动压缩** 是长会话能跑得动的前提
- **工具并发** 的上限是正确性，不是硬件
- **权限模型** 更像产品设计，而不是安全工程

## 🎓 学习路径

### 快速路径（2 小时）
1. 认知基础（3 篇）
2. 失败案例（5 篇）
3. 构建 MVP（1 篇）

### 深度路径（10 小时）
1. 认知基础（3 篇）
2. 失败案例（5 篇）
3. 设计决策（5 篇）
4. 深度对比（10 篇）
5. 案例研究（3 篇）
6. 总结（3 篇）

### 实战路径（20+ 小时）
- 完整阅读所有文章
- 构建 3 个实战 Agent
- 深入研究源码

## 🔥 核心 Aha Moments

1. **3272 失败案例** - 为什么需要断路器
2. **信任的数学** - 10 次成功 vs 1 次失败
3. **90/10 规则** - 90% 任务只用 10% 工具
4. **最优并发点** - 不是越多越好，是 10
5. **系统 > 模型** - GPT-3.5 + 系统 > GPT-4 单独
6. **乘法 vs 加法** - 智能放大是相互增强
7. **完整性 > 单点** - 木桶理论
8. **下一个 10 倍** - 在系统，不在模型

## 🛠️ 技术栈对比

### Claude Code
- **语言**: TypeScript
- **运行时**: Bun
- **架构**: 分层架构（6 层）
- **工具**: 52+ 个
- **特点**: 企业级、功能丰富

### Codex
- **语言**: Rust
- **架构**: 中心化核心
- **工具**: 30+ 个（基于 Skills）
- **特点**: 轻量级、高性能

## 📈 项目状态

- **已起草文章**：28 篇，分 6 部分 —— 一些是深度分析，一些还是占位待补
- **可运行示例**：1 个（TypeScript 最小 Agent），更多在 roadmap 上
- **更新频率**：大约每周一次，新发现写完就更
- **目前的不足**：大部分文章都需要二轮打磨、补更多源码引用、补对应的可运行示例

## 🤝 贡献

欢迎贡献！

- 🐛 报告问题
- 💡 提出建议
- 📝 改进文档
- 🎨 分享你的 Agent

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE)

## 🙏 致谢

- [Claude Code](https://github.com/anthropics/claude-code) by Anthropic
- [Codex](https://github.com/openai/codex) by OpenAI

## 📮 联系

- GitHub Issues: [提问](https://github.com/defto-ai/buildagent/issues)
- Website: [buildagent.dev](https://buildagent.dev)

---

⭐ 如果这个项目对你有帮助，请给个 Star！

**记住**：未来不是等来的，是做出来的。现在就开始构建你的 Agent！
