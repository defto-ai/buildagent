# Project Structure

```
buildagent/
├── README.md                    # English documentation
├── README.zh-CN.md              # Chinese documentation
├── OUTLINE.md                   # Content outline
├── PROJECT_PLAN.md              # Project plan
├── WRITING_PLAN.md              # Writing plan
├── DEPLOYMENT.md                # Deployment guide
│
├── docs/                        # Documentation source (used by Docusaurus)
│   ├── intro.md                 # Introduction page
│   ├── assets/                  # Images and assets
│   │
│   ├── 00-intro/                # Introduction
│   │   └── 01-why-compare.md
│   │
│   ├── 00-cognitive-foundation/ # Part 0: Cognitive Foundation (3 articles)
│   │   ├── 00-what-is-intelligence.md
│   │   ├── 01-agent-intelligence-essence.md
│   │   └── 02-five-mechanisms-principles.md
│   │
│   ├── 01-failure-cases/        # Part 1: Failure Cases (5 articles)
│   │   ├── 03-without-tools.md
│   │   ├── 04-without-loops.md
│   │   ├── 05-without-context.md
│   │   ├── 06-without-system-prompt.md
│   │   └── 07-without-compression.md
│   │
│   ├── 02-design-decisions/     # Part 2: Design Decisions (5 articles)
│   │   ├── 08-why-circuit-breaker.md
│   │   ├── 09-why-tool-classification.md
│   │   ├── 10-why-segmented-caching.md
│   │   ├── 11-why-five-permission-modes.md
│   │   └── 12-why-75-percent-threshold.md
│   │
│   ├── 03-deep-comparison/      # Part 3: Deep Comparison (10 articles)
│   │   ├── 13-mechanism-1-tools.md
│   │   ├── 14-mechanism-2-loops.md
│   │   ├── 15-mechanism-3-context.md
│   │   ├── 16-mechanism-4-system-prompt.md
│   │   ├── 17-mechanism-5-compression.md
│   │   ├── 18-tool-orchestration.md
│   │   ├── 19-permission-system.md
│   │   ├── 20-retry-fallback.md
│   │   ├── 21-cost-control.md
│   │   └── 22-performance.md
│   │
│   ├── 04-case-studies/         # Part 4: Case Studies (3 articles)
│   │   ├── 23-code-review-agent.md
│   │   ├── 24-test-generation-agent.md
│   │   └── 25-refactoring-agent.md
│   │
│   └── 05-summary/              # Part 5: Summary (3 articles)
│       ├── 26-intelligence-amplification-essence.md
│       ├── 27-build-your-own-agent.md
│       └── 28-future-of-agents.md
│
├── examples/                    # Code examples
│   ├── 01-minimal-agent/
│   ├── 02-agent-with-tools/
│   └── 03-agent-with-permissions/
│
└── website/                     # Docusaurus website
    ├── docusaurus.config.ts     # Docusaurus configuration
    ├── sidebars.ts              # Sidebar configuration
    ├── package.json
    ├── src/                     # Custom React components
    │   ├── components/
    │   ├── css/
    │   └── pages/
    └── static/                  # Static assets
        └── img/
```

## Key Points

### Documentation Structure
- **28 articles** organized in 6 parts (00-05)
- Each part has a clear theme and purpose
- Articles are numbered sequentially (00-28)
- Each directory has a `_category_.json` for Docusaurus navigation

### Content Organization
- **Part 0**: Build cognitive foundation (what is intelligence, amplification formula)
- **Part 1**: Learn from failures (why each mechanism is necessary)
- **Part 2**: Understand design decisions (why specific choices were made)
- **Part 3**: Deep comparison (Claude Code vs Codex implementation)
- **Part 4**: Real-world cases (practical agent examples)
- **Part 5**: Summary and future (essence, practice guide, future directions)

### Website
- Built with Docusaurus
- Docs source: `docs/` (repo root)
- Website config: `website/docusaurus.config.ts`
- Deployed to: buildagent.dev (Cloudflare Pages)

### Planning Documents
- `OUTLINE.md`: Detailed content outline
- `PROJECT_PLAN.md`: Project planning and goals
- `WRITING_PLAN.md`: Writing process and quality standards

## Navigation

- **Website**: https://buildagent.dev
- **GitHub**: https://github.com/defto-ai/buildagent
- **English README**: [README.md](README.md)
- **Chinese README**: [README.zh-CN.md](README.zh-CN.md)
