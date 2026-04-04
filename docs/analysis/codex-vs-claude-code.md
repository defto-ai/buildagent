# Codex vs Claude Code 对比分析

## 一、代码规模对比

| 项目 | 语言 | 代码行数 | 核心文件 | 架构 |
|------|------|----------|----------|------|
| **Claude Code** | TypeScript/Bun | ~540,000 行 | query.ts (2,330 行) | 六跳调用链 |
| **Codex** | Rust + TypeScript | ~467,000 行 Rust | codex.rs (7,718 行) | Rust 核心 + TS CLI |

**关键发现**：
- 两个项目规模相当（都是 40-50 万行级别）
- Claude Code 更分散（2850 个文件），Codex 更集中（核心逻辑在 codex.rs）
- Claude Code 用 TypeScript 实现全栈，Codex 用 Rust 实现核心 + TypeScript 做 CLI

---

## 二、架构对比

### Claude Code 架构
```
cli.tsx (272 行)
  ↓
main.tsx (5,540 行) - Commander.js 注册
  ↓
REPL.tsx (5,000 行) - React/Ink 终端 UI
  ↓
QueryEngine.ts (1,480 行) - 会话编排
  ↓
query.ts (2,330 行) - 核心循环
  ↓
claude.ts (3,400 行) - API 客户端
```

### Codex 架构
```
codex-cli (TypeScript)
  ↓
codex-rs/core/src/codex.rs (7,718 行) - Rust 核心
  ↓ 包含：
  - Agent 循环
  - 工具调度
  - 权限系统
  - 压缩逻辑
  - API 客户端
```

**关键差异**：
- Claude Code：分层清晰，每层职责明确
- Codex：核心逻辑集中在单个大文件（codex.rs）

---

## 三、核心模块对比

### 1. 核心循环

**Claude Code** (`query.ts`):
```typescript
async function* queryLoop() {
  while (true) {
    // 1. 压缩检查
    if (shouldCompact()) await compact()
    
    // 2. 调用 API
    const response = await callAPI()
    
    // 3. 执行工具
    if (response.tool_calls) {
      await executeTools(response.tool_calls)
      continue
    }
    
    // 4. 完成
    break
  }
}
```

**Codex** (`codex.rs`):
- 核心逻辑在 7,718 行的单个文件中
- 使用 Rust 的异步模型（tokio）
- 集成了 Agent 控制、Mailbox 通信

---

### 2. 工具系统

**Claude Code**:
- 52+ 工具，每个工具独立目录
- `tools.ts` 注册表
- `isConcurrencySafe` 标记
- 并发调度（最多 10 个）

**Codex**:
- Skills 模块（`codex-rs/skills/`）
- MCP 工具支持（`codex-rs/codex-mcp/`）
- 工具目录：`codex-rs/core/src/tools/`

---

### 3. 权限系统

**Claude Code**:
- 5 种 PermissionMode
- `utils/permissions/` 目录
- 细粒度控制

**Codex**:
- `exec_policy.rs` (31,118 行代码 + 59,168 行测试)
- `ExecPolicyManager`
- 沙箱支持（Linux/Windows）

---

### 4. 压缩系统

**Claude Code**:
- `autoCompact.ts` - 自动触发
- `compact.ts` - 压缩算法
- 断路器（3 次失败熔断）

**Codex**:
- `compact.rs` (16,172 行)
- `compact_remote.rs` (10,942 行)
- 支持远程压缩

---

## 四、技术栈对比

| 维度 | Claude Code | Codex |
|------|-------------|-------|
| **核心语言** | TypeScript | Rust |
| **运行时** | Bun | Tokio (Rust 异步) |
| **构建系统** | Bun.build | Bazel |
| **包管理** | Bun | Cargo + pnpm |
| **UI 框架** | React + Ink | TUI (Rust) |
| **测试框架** | bun:test | Rust 内置 |
| **二进制大小** | Node.js 依赖 | 单二进制 |

---

## 五、设计理念对比

### Claude Code：企业级、功能全面
- ✅ 分层清晰，易于理解
- ✅ TypeScript，易于扩展
- ✅ 功能全面（52+ 工具）
- ⚠️ 代码量大（54 万行）
- ⚠️ 启动较慢（~300ms）

### Codex：轻量级、性能优先
- ✅ Rust 性能好
- ✅ 单二进制，易部署
- ✅ 本地优先
- ⚠️ 核心逻辑集中（codex.rs 7718 行）
- ⚠️ Rust 学习曲线陡峭

---

## 六、关键模块文件对比

| 功能 | Claude Code | Codex |
|------|-------------|-------|
| 核心循环 | query.ts (2,330 行) | codex.rs (7,718 行) |
| 工具调度 | toolOrchestration.ts (~500 行) | 集成在 codex.rs |
| 权限系统 | utils/permissions/ (多文件) | exec_policy.rs (31,118 行) |
| 压缩 | autoCompact.ts + compact.ts | compact.rs (16,172 行) |
| API 客户端 | claude.ts (3,400 行) | client.rs (74,224 行) |
| 配置管理 | 多个 config 文件 | config/ 目录 |

---

## 七、可对比的核心实践

### 1. 多轮循环 ✅
- 两个项目都实现了
- 可以对比实现方式

### 2. 工具调度 ✅
- Claude Code：并发安全分组
- Codex：需要分析 codex.rs

### 3. 权限系统 ✅
- 两个项目都有完整实现
- 可以对比细粒度

### 4. 自动压缩 ✅
- 两个项目都支持
- Codex 还支持远程压缩

### 5. System Prompt ✅
- 需要分析 Codex 的实现

### 6. 成本控制 ⚠️
- Claude Code 有明确实现
- Codex 需要分析

### 7. 重试与容错 ✅
- 两个项目都有
- 可以对比策略

---

## 八、对比的价值

### 对读者的价值
1. **看到两种实现方式**：TypeScript vs Rust
2. **理解设计权衡**：分层 vs 集中、性能 vs 可读性
3. **学习最佳实践**：两个项目都用的模式 = 行业标准
4. **选择适合的方案**：企业级 vs 轻量级

### 对专栏的价值
1. **不局限于单一项目**：通用的 Agent 工程实践
2. **真实的对比**：不是我构造的简化版本
3. **跨语言的模式**：TypeScript 和 Rust 的实现
4. **更广的受众**：所有 Agent 开发者

---

## 九、初步结论

**Codex 是完美的对比对象**：
1. ✅ 规模相当（都是 40-50 万行）
2. ✅ 都是生产级（OpenAI vs Anthropic）
3. ✅ 技术栈不同（TypeScript vs Rust）
4. ✅ 设计理念不同（企业级 vs 轻量级）
5. ✅ 核心功能相似（循环、工具、权限、压缩）

**对比能带来的价值**：
- 理解"为什么这样设计"
- 学习"跨语言的通用模式"
- 知道"如何选择适合的方案"
- 避免"重复造轮子"
