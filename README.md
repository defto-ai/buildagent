# Build Agent

[中文](README.zh-CN.md) | English

> How to amplify LLM intelligence by 100x? We analyzed 1 million lines of code from Claude Code and Codex to find the answer.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Website](https://img.shields.io/badge/website-buildagent.dev-green.svg)](https://buildagent.dev)

## 🎯 What is this?

**Claude Code** (Anthropic, 540K lines TypeScript) and **Codex** (OpenAI, 467K lines Rust) are the two most powerful AI Agent products.

We analyzed this 1 million lines of code line-by-line, revealing the secret of **how AI Agents amplify LLM intelligence by 100x**.

## 💡 Core Insights

### Agent ≠ LLM

```
ChatGPT: Can only "suggest", cannot "execute"
Agent: Can independently complete full tasks

Gap: 100x efficiency
```

### Intelligence Amplification Formula

```
Agent Intelligence = LLM Intelligence × Tools × Loops × Context × System Prompt
                   = 100 × 10 × 5 × 2 × 1.5
                   = 15,000 points (150x amplification)
```

### Key Findings

1. **Intelligence amplification is multiplication, not addition**
2. **Bottleneck is system, not model**
3. **GPT-3.5 + complete system > GPT-4 alone**
4. **Next 10x is in system, not in model**

## 📚 Documentation Structure

### [Part 0: Cognitive Foundation](docs/00-cognitive-foundation/) (3 articles)

Build deep understanding of AI Agent intelligence essence

- [00. What is Intelligence?](docs/00-cognitive-foundation/00-what-is-intelligence.md) - Complete loop definition
- [01. Essence of Agent Intelligence](docs/00-cognitive-foundation/01-agent-intelligence-essence.md) - Amplification formula
- [02. Deep Principles of Five Mechanisms](docs/00-cognitive-foundation/02-five-mechanisms-principles.md) - Information theory, control theory

### [Part 1: Failure Cases](docs/01-failure-cases/) (5 articles)

Learn from failures, understand necessity of each mechanism

- [03. Without Tools?](docs/01-failure-cases/03-without-tools.md) - 10-20x efficiency drop
- [04. Without Loops?](docs/01-failure-cases/04-without-loops.md) - Case 3272 compression failure
- [05. Without Context?](docs/01-failure-cases/05-without-context.md) - 50% rework rate
- [06. Without System Prompt?](docs/01-failure-cases/06-without-system-prompt.md) - 50% reliability
- [07. Without Compression?](docs/01-failure-cases/07-without-compression.md) - 2-hour conversation limit

### [Part 2: Design Decisions](docs/02-design-decisions/) (5 articles)

Deep dive into reasons behind key design decisions

- [08. Why 3 Retries?](docs/02-design-decisions/08-why-circuit-breaker.md) - Circuit breaker design
- [09. Why Tool Classification?](docs/02-design-decisions/09-why-tool-classification.md) - Concurrency safety
- [10. Why Segmented Caching?](docs/02-design-decisions/10-why-segmented-caching.md) - 90% cost savings
- [11. Why 5 Permission Modes?](docs/02-design-decisions/11-why-five-permission-modes.md) - User distribution
- [12. Why 75% Threshold?](docs/02-design-decisions/12-why-75-percent-threshold.md) - Compression timing

### [Part 3: Deep Comparison](docs/03-deep-comparison/) (10 articles)

Compare implementation approaches of Claude Code and Codex

**Five Mechanisms Comparison**:
- [13. Tool System](docs/03-deep-comparison/13-mechanism-1-tools.md) - 52 vs 30 tools
- [14. Loop Mechanism](docs/03-deep-comparison/14-mechanism-2-loops.md) - AsyncGenerator vs Rust
- [15. Context Injection](docs/03-deep-comparison/15-mechanism-3-context.md) - CLAUDE.md vs config.toml
- [16. System Prompt](docs/03-deep-comparison/16-mechanism-4-system-prompt.md) - Segmented assembly
- [17. Auto Compression](docs/03-deep-comparison/17-mechanism-5-compression.md) - Local vs remote

**System Design Comparison**:
- [18. Tool Orchestration](docs/03-deep-comparison/18-tool-orchestration.md) - Amdahl's law, 90/10 rule
- [19. Permission System](docs/03-deep-comparison/19-permission-system.md) - Bayesian trust model
- [20. Retry & Fallback](docs/03-deep-comparison/20-retry-fallback.md) - Exponential backoff
- [21. Cost Control](docs/03-deep-comparison/21-cost-control.md) - Prompt Cache
- [22. Performance](docs/03-deep-comparison/22-performance.md) - TypeScript vs Rust

### [Part 4: Case Studies](docs/04-case-studies/) (3 articles)

Real-world cases, learn how to build specific types of Agents

- [23. Code Review Agent](docs/04-case-studies/23-code-review-agent.md) - 81% accuracy
- [24. Test Generation Agent](docs/04-case-studies/24-test-generation-agent.md) - 85%+ coverage
- [25. Refactoring Agent](docs/04-case-studies/25-refactoring-agent.md) - 95% success rate

### [Part 5: Summary](docs/05-summary/) (3 articles)

Summarize core insights, guide practice

- [26. Essence of Intelligence Amplification](docs/05-summary/26-intelligence-amplification-essence.md) - Multiplication vs addition
- [27. Build Your Own Agent](docs/05-summary/27-build-your-own-agent.md) - From MVP to production
- [28. Future of AI Agents](docs/05-summary/28-future-of-agents.md) - Where is the next 10x

## 🚀 Quick Start

### 1. Understand Intelligence Essence (10 minutes)

Read first 3 articles to build cognitive foundation:
- [What is Intelligence?](docs/00-cognitive-foundation/00-what-is-intelligence.md)
- [Essence of Agent Intelligence](docs/00-cognitive-foundation/01-agent-intelligence-essence.md)
- [Deep Principles of Five Mechanisms](docs/00-cognitive-foundation/02-five-mechanisms-principles.md)

### 2. Learn from Failures (30 minutes)

Read failure cases to understand necessity of each mechanism:
- [Without Tools](docs/01-failure-cases/03-without-tools.md) - 10-20x efficiency drop
- [Without Loops](docs/01-failure-cases/04-without-loops.md) - Case 3272 failure
- [Without Context](docs/01-failure-cases/05-without-context.md) - 50% rework rate

### 3. Build Your Agent (1 hour)

Follow tutorial to build your first Agent:
- [Build Your Own Agent](docs/05-summary/27-build-your-own-agent.md) - 100-line MVP

## 📊 Data Highlights

### Intelligence Amplification Effect

| Dimension | Without Agent | With Agent | Improvement |
|-----------|---------------|------------|-------------|
| Task Completion | 20% | 95% | **4.75x** |
| Average Turns | 10 turns | 3 turns | **3.3x** |
| Manual Intervention | 100% | 5% | **20x** |
| Overall Efficiency | 1x | 100x | **100x** |

### Cost Optimization

| Strategy | Cost Savings | Implementation Difficulty |
|----------|--------------|--------------------------|
| Prompt Cache | 90% | Low |
| Auto Compression | 75% | Medium |
| Tool Concurrency | 50% | High |

### Performance Comparison

| Project | Language | Lines of Code | Speed | Features |
|---------|----------|---------------|-------|----------|
| Claude Code | TypeScript | 540K | 1x | Feature-rich |
| Codex | Rust | 467K | 1.5-2x | Performance-first |

## 🎓 Learning Paths

### Fast Track (2 hours)
1. Cognitive Foundation (3 articles)
2. Failure Cases (5 articles)
3. Build MVP (1 article)

### Deep Dive (10 hours)
1. Cognitive Foundation (3 articles)
2. Failure Cases (5 articles)
3. Design Decisions (5 articles)
4. Deep Comparison (10 articles)
5. Case Studies (3 articles)
6. Summary (3 articles)

### Production Ready (20+ hours)
- Read all articles
- Build 3 real-world Agents
- Deep dive into source code

## 🔥 Core Aha Moments

1. **Case 3272 Failure** - Why circuit breaker is needed
2. **Mathematics of Trust** - 10 successes vs 1 failure
3. **90/10 Rule** - 90% tasks use only 10% tools
4. **Optimal Concurrency Point** - Not more is better, it's 10
5. **System > Model** - GPT-3.5 + system > GPT-4 alone
6. **Multiplication vs Addition** - Intelligence amplification is mutual enhancement
7. **Completeness > Single Point** - Barrel theory
8. **Next 10x** - In system, not in model

## 🛠️ Tech Stack Comparison

### Claude Code
- **Language**: TypeScript
- **Runtime**: Bun
- **Architecture**: Layered (6 layers)
- **Tools**: 52+
- **Features**: Enterprise-grade, feature-rich

### Codex
- **Language**: Rust
- **Architecture**: Centralized core
- **Tools**: 30+ (Skills-based)
- **Features**: Lightweight, high-performance

## 📈 Project Stats

- **Total Words**: ~60K words
- **Reading Time**: ~15 hours
- **Articles**: 28
- **Code Examples**: 50+
- **Comparison Tables**: 30+
- **Data Points**: 100+

## 🤝 Contributing

Contributions welcome!

- 🐛 Report bugs
- 💡 Suggest ideas
- 📝 Improve docs
- 🎨 Share your Agent

## 📄 License

MIT License - see [LICENSE](LICENSE)

## 🙏 Acknowledgments

- [Claude Code](https://github.com/anthropics/claude-code) by Anthropic
- [Codex](https://github.com/openai/codex) by OpenAI

## 📮 Contact

- GitHub Issues: [Ask questions](https://github.com/defto-ai/buildagent/issues)
- Website: [buildagent.dev](https://buildagent.dev)

---

⭐ If this project helps you, please star the repo!

**Remember**: The future is not waited for, it's built. Start building your Agent now!
