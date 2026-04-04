# Build Agent

> Learn AI Agent engineering by comparing two 500K-line production codebases: Claude Code (TypeScript) and Codex (Rust)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Website](https://img.shields.io/badge/website-buildagent.dev-green.svg)](https://buildagent.dev)

## 🎯 What is this?

This is a **comparative learning guide** for AI Agent engineering. By analyzing two production-grade projects from Anthropic and OpenAI, we extract **15 reusable design patterns** to help you build your own agents.

**Projects analyzed:**
- **Claude Code** (Anthropic): 540K lines TypeScript, enterprise-grade
- **Codex** (OpenAI): 467K lines Rust, lightweight

## 📚 Documentation

Visit **[buildagent.dev](https://buildagent.dev)** for the complete guide.

### Quick Links

- [Why Compare Two Projects?](docs/00-intro/01-why-compare.md)
- [Architecture Overview](docs/00-intro/02-architecture-overview.md)
- [Core Practices](docs/01-core-practices/)
- [Case Studies](docs/03-case-studies/)
- [Design Patterns](docs/04-summary/23-design-patterns.md)

## 🚀 Quick Start

### 1. Run the Minimal Agent (5 minutes)

```bash
cd examples/01-minimal-agent/typescript
npm install
npm start
```

### 2. Read Core Articles (30 minutes)

- [Agent Loop: The Heartbeat](docs/01-core-practices/04-agent-loop.md)
- [Tool Orchestration](docs/01-core-practices/05-tool-orchestration.md)
- [Auto-Compaction](docs/01-core-practices/08-auto-compaction.md)

### 3. Build Your First Agent (1 hour)

Follow the [Code Review Agent Tutorial](docs/03-case-studies/20-code-review-agent.md)

## 💡 What You'll Learn

### 15 Reusable Design Patterns

1. **Turn Loop** - Multi-turn conversation with `while(true)`
2. **Tool Grouping** - Concurrent-safe vs exclusive tools
3. **Streaming Execution** - Process as you receive
4. **Segmented Caching** - Static + dynamic prompt sections
5. **Auto-Compaction** - Infinite conversations with circuit breaker
6. **Permission System** - Balance autonomy and safety
7. **Retry & Fallback** - Multi-layer fault tolerance
8. **Context Injection** - Make AI project-aware
9. **Lifecycle Hooks** - Cross-cutting concerns
10. **Fast Paths** - Zero-load startup optimization
11. **Cost Control** - Token estimation and tracking
12. **Feature Flags** - Build-time dead code elimination
13. **Layered Architecture** - Clear separation of concerns
14. **Message Types** - Type-safe conversation state
15. **Streaming** - AsyncGenerator pattern

[View complete list →](docs/04-summary/23-design-patterns.md)

## 📊 Comparison Highlights

| Dimension | Claude Code | Codex |
|-----------|-------------|-------|
| Language | TypeScript | Rust |
| Lines of Code | ~540,000 | ~467,000 |
| Philosophy | Enterprise, feature-rich | Lightweight, performance |
| Architecture | Layered (6 hops) | Centralized core |
| Tools | 52+ | Skills-based |

[Full comparison →](docs/00-intro/02-architecture-overview.md)

## 🎓 Learning Paths

### Fast Track (2 hours)
1. [Why Compare?](docs/00-intro/01-why-compare.md)
2. [Agent Loop](docs/01-core-practices/04-agent-loop.md)
3. [Tool Orchestration](docs/01-core-practices/05-tool-orchestration.md)
4. [Run Examples](examples/01-minimal-agent/)

### Deep Dive (10 hours)
- Read all core practices (10 articles)
- Run all examples
- Complete one case study

### Production Ready (20+ hours)
- Deep technical details (6 articles)
- Build complete agent
- Performance optimization

[View complete learning paths →](resources/learning-paths.md)

## 🛠️ Tools & Resources

- [Cost Calculator](tools/cost-calculator/) - Estimate API costs
- [Token Estimator](tools/token-estimator/) - Estimate token usage
- [Prompt Optimizer](tools/prompt-optimizer/) - Optimize system prompts
- [Code Templates](templates/) - Reusable code patterns
- [Prompt Library](prompts/) - Production-ready prompts

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](community/CONTRIBUTING.md)

- 🐛 Report bugs
- 💡 Suggest ideas
- 📝 Improve docs
- 🎨 Share your agent

## 📄 License

MIT License - see [LICENSE](LICENSE)

## 🙏 Acknowledgments

- [Claude Code](https://github.com/anthropics/claude-code) by Anthropic
- [Codex](https://github.com/openai/codex) by OpenAI

## 📮 Contact

- GitHub Issues: [Ask questions](https://github.com/yourusername/buildagent/issues)
- Website: [buildagent.dev](https://buildagent.dev)

---

⭐ If this helps you, please star the repo!
