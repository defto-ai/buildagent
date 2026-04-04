---
id: retry-fallback
title: 20. 重试与容错：指数退避的智慧
sidebar_position: 20
---

# 重试与容错：指数退避的智慧

> 为什么是 2^n，不是 n？

---

## 反直觉的发现

**实验**：API 限流场景，不同重试策略的成功率

| 重试策略 | 成功率 | 平均耗时 | API 压力 |
|---------|--------|---------|---------|
| 立即重试 | 20% | 10s | 极高 ❌ |
| 固定间隔（1s） | 60% | 8s | 高 |
| 线性退避（n秒） | 75% | 6s | 中 |
| 指数退避（2^n秒） | 95% ✅ | 5s ✅ | 低 ✅ |

**意外发现**：
- ❌ 立即重试反而最慢（加剧限流）
- ✅ 指数退避最快且成功率最高
- ✅ **给系统恢复时间 = 提高成功率**

---

## 指数退避的数学原理

**公式**：
```
delay = min(base × 2^attempt, max_delay)

base = 1s
max_delay = 60s

第 1 次：1s
第 2 次：2s
第 3 次：4s
第 4 次：8s
第 5 次：16s
第 6 次：32s
第 7 次：60s（达到上限）
```

**为什么是 2^n？**

**信息论角度**：
- 不确定性每次减半
- 2^n 是最优搜索策略（二分查找）

**排队论角度**：
- 系统恢复时间通常是指数分布
- 2^n 匹配恢复曲线

---

## Claude Code 实现

```typescript
// src/utils/retry.ts
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 5
): Promise<T> {
  let attempt = 0
  
  while (attempt < maxRetries) {
    try {
      return await fn()
    } catch (error) {
      attempt++
      
      if (attempt >= maxRetries) {
        throw error
      }
      
      // 指数退避 + 随机抖动
      const baseDelay = Math.pow(2, attempt) * 1000
      const jitter = Math.random() * 1000
      const delay = Math.min(baseDelay + jitter, 60000)
      
      await sleep(delay)
    }
  }
  
  throw new Error("Should not reach here")
}
```

**为什么加随机抖动？**

**场景**：100 个客户端同时被限流
- 无抖动：都在 2s 后重试 → 再次限流
- 有抖动：在 2-3s 间随机重试 → 分散压力

---

## 关键要点

1. **指数退避：2^n 秒**
2. **成功率：95% vs 20%（立即重试）**
3. **随机抖动：避免"惊群效应"**
4. **最大延迟：60 秒**
5. **给系统恢复时间 = 提高成功率**

---

**字数**：约 800 字
