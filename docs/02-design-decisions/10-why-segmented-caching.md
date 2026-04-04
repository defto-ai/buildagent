---
id: why-segmented-caching
title: 10. 为什么 System Prompt 要分段缓存？
sidebar_position: 10
---

# 为什么 System Prompt 要分段缓存？

> Prompt Cache：成本降低 90%

---

## 问题场景

**System Prompt 很大**：
- 身份定义：500 tokens
- 规范说明：1000 tokens
- 项目上下文（CLAUDE.md）：5000 tokens
- Git 状态：500 tokens
- 环境信息：500 tokens
- **总计：7500 tokens**

**每次调用都发送**：
```
100 次调用 × 7500 tokens × $0.003 / 1K = $2.25
```

**问题**：大部分内容是"静态"的，每次都发送很浪费。

---

## 解决方案：Prompt Cache

### Anthropic 的 Prompt Cache

**原理**：
- 标记"可缓存"的部分
- 第一次：正常计费
- 后续：缓存命中，只收 10% 费用

**代码证据**：

```typescript
// src/services/api/claude.ts
const systemPrompt = [
  {
    type: "text",
    text: identitySection,
    cache_control: { type: "ephemeral" }  // 缓存
  },
  {
    type: "text",
    text: rulesSection,
    cache_control: { type: "ephemeral" }  // 缓存
  },
  {
    type: "text",
    text: claudeMdContent,
    cache_control: { type: "ephemeral" }  // 缓存
  },
  {
    type: "text",
    text: gitStatus  // 不缓存（动态变化）
  }
]
```

### 成本对比

**无缓存**：
```
100 次 × 7500 tokens × $0.003 / 1K = $2.25
```

**有缓存**：
```
第 1 次：7500 tokens × $0.003 / 1K = $0.0225
后 99 次：7500 tokens × $0.0003 / 1K × 99 = $0.2227
总计：$0.2452
```

**节省**：
```
$2.25 - $0.2452 = $2.00（节省 89%）
```

---

## 分段策略

### 静态部分（缓存）

- 身份定义
- 规范说明
- CLAUDE.md（项目规范）
- 环境信息

**特点**：很少变化

### 动态部分（不缓存）

- Git 状态
- 当前时间
- 临时上下文

**特点**：每次都变化

---

## 关键要点

1. **Prompt Cache 降低成本 90%**
2. **分段策略：静态缓存，动态不缓存**
3. **Claude Code 使用 `cache_control: { type: "ephemeral" }`**
4. **真实节省：每 100 次调用节省 $2**

---

**字数**：约 800 字  
**阅读时间**：约 2 分钟
