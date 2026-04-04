# Minimal AI Agent

The simplest possible AI Agent in ~100 lines of code.

## What it does

- Takes user input
- Calls LLM (mocked for demo)
- Executes tools (read_file)
- Multi-turn loop until complete

## Run it

```bash
npm install
npm start
```

## Key concepts

### 1. Multi-turn loop

```typescript
while (true) {
  const response = await callLLM(messages)
  if (!response.tool_calls) break
  const results = await executeTools(response.tool_calls)
  messages.push(...results)
}
```

### 2. Tool execution

```typescript
const tools = {
  read_file: {
    description: 'Read a file',
    execute: async (args) => { ... }
  }
}
```

### 3. Message history

```typescript
const messages: Message[] = [
  { role: 'user', content: '...' },
  { role: 'assistant', tool_calls: [...] },
  { role: 'tool', content: '...' }
]
```

## Next steps

- [Agent with multiple tools](../../02-agent-with-tools/)
- [Agent with permissions](../../03-agent-with-permissions/)
- [Production-ready agent](../../05-production-agent/)

## Learn more

Read the full guide: [buildagent.dev](https://buildagent.dev)
