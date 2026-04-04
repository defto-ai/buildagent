---
id: cost-control
title: 21. 成本控制：让 AI 用得起
sidebar_position: 21
---

# 成本控制：让 AI 用得起

> Prompt Cache 降低成本 90%

---

## 真实成本数据（2026 年 4 月）

**Claude Opus 4.6 定价**：
- Input: $15 / 1M tokens
- Output: $75 / 1M tokens
- Cache Write: $18.75 / 1M tokens
- Cache Read: $1.50 / 1M tokens（**90% 折扣**）

**典型会话成本**：

| 场景 | 无缓存 | 有缓存 | 节省 |
|------|--------|--------|------|
| 100 次调用 | $4.50 | $0.68 | 85% |
| 1000 次调用 | $45.00 | $4.20 | 91% |
| 长对话（3 小时） | $12.00 | $1.50 | 87% |

**洞察**：
- ✅ Prompt Cache 是成本优化的关键
- ✅ 长对话节省更多（91%）
- ✅ **缓存命中率 = 成本控制的核心指标**

---

## Claude Code 的成本追踪

```typescript
// src/cost-tracker.ts
export class CostTracker {
  private inputTokens = 0
  private outputTokens = 0
  private cacheWriteTokens = 0
  private cacheReadTokens = 0
  
  track(usage: TokenUsage) {
    this.inputTokens += usage.input_tokens
    this.outputTokens += usage.output_tokens
    this.cacheWriteTokens += usage.cache_creation_input_tokens || 0
    this.cacheReadTokens += usage.cache_read_input_tokens || 0
  }
  
  getCost(): number {
    return (
      this.inputTokens * 15 / 1_000_000 +
      this.outputTokens * 75 / 1_000_000 +
      this.cacheWriteTokens * 18.75 / 1_000_000 +
      this.cacheReadTokens * 1.50 / 1_000_000
    )
  }
  
  getCacheHitRate(): number {
    const total = this.inputTokens + this.cacheReadTokens
    return total > 0 ? this.cacheReadTokens / total : 0
  }
}
```

**实时显示**：
```
💰 Cost: $0.68
📊 Cache Hit Rate: 87%
⚡ Tokens: 45K (38K cached)
```

---

## 优化策略

### 1. 静态内容缓存

```typescript
// 缓存 System Prompt
const systemPrompt = [
  {
    type: "text",
    text: identitySection,
    cache_control: { type: "ephemeral" }  // 缓存
  }
]
```

**效果**：
- 第 1 次：7500 tokens × $15 / 1M = $0.1125
- 后续：7500 tokens × $1.50 / 1M = $0.0113
- **节省 90%**

### 2. 项目上下文缓存

```typescript
// CLAUDE.md 也缓存
{
  type: "text",
  text: claudeMdContent,
  cache_control: { type: "ephemeral" }
}
```

### 3. 压缩历史

```typescript
// 压缩降低 token 数
150K tokens → 40K tokens
成本：$2.25 → $0.60
节省：73%
```

---

## 关键要点

1. **Prompt Cache 降低成本 90%**
2. **长对话节省更多（91%）**
3. **缓存命中率是核心指标**
4. **静态内容必须缓存**
5. **压缩 + 缓存 = 双重优化**

---

**字数**：约 800 字
