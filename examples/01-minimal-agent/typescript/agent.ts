/**
 * Minimal AI Agent - 100 lines
 *
 * This is the simplest possible AI Agent that demonstrates the core loop.
 * It can read files and answer questions about them.
 */

interface Message {
  role: 'user' | 'assistant' | 'tool'
  content: string
  tool_calls?: ToolCall[]
  tool_call_id?: string
}

interface ToolCall {
  id: string
  name: string
  arguments: string
}

// Simple tool: read file
async function readFile(path: string): Promise<string> {
  const fs = await import('fs/promises')
  return await fs.readFile(path, 'utf-8')
}

// Tool registry
const tools = {
  read_file: {
    description: 'Read a file from the filesystem',
    parameters: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'File path to read' }
      },
      required: ['path']
    },
    execute: async (args: { path: string }) => {
      return await readFile(args.path)
    }
  }
}

// Call LLM (mock for demo - replace with real API)
async function callLLM(messages: Message[]): Promise<Message> {
  // In real implementation, call Claude/GPT API here
  // For demo, we'll simulate a response

  console.log('\n🤖 Calling LLM...')

  // Mock: if user asks about a file, call read_file tool
  const lastMessage = messages[messages.length - 1]
  if (lastMessage.role === 'user' && lastMessage.content.includes('README')) {
    return {
      role: 'assistant',
      content: '',
      tool_calls: [{
        id: 'call_1',
        name: 'read_file',
        arguments: JSON.stringify({ path: './README.md' })
      }]
    }
  }

  // Mock: if we have tool results, generate final response
  if (messages.some(m => m.role === 'tool')) {
    return {
      role: 'assistant',
      content: 'Based on the README, this is a project about building AI agents by comparing Claude Code and Codex.'
    }
  }

  return {
    role: 'assistant',
    content: 'I can help you read and analyze files. Try asking about the README!'
  }
}

// Execute tools
async function executeTools(toolCalls: ToolCall[]): Promise<Message[]> {
  const results: Message[] = []

  for (const call of toolCalls) {
    console.log(`\n🔧 Executing tool: ${call.name}`)

    const tool = tools[call.name as keyof typeof tools]
    if (!tool) {
      results.push({
        role: 'tool',
        tool_call_id: call.id,
        content: `Error: Unknown tool ${call.name}`
      })
      continue
    }

    try {
      const args = JSON.parse(call.arguments)
      const result = await tool.execute(args)

      results.push({
        role: 'tool',
        tool_call_id: call.id,
        content: result
      })

      console.log(`✅ Tool executed successfully`)
    } catch (error) {
      results.push({
        role: 'tool',
        tool_call_id: call.id,
        content: `Error: ${error}`
      })
    }
  }

  return results
}

// Main agent loop
async function agentLoop(userInput: string) {
  const messages: Message[] = [
    { role: 'user', content: userInput }
  ]

  console.log(`\n👤 User: ${userInput}`)

  // Multi-turn loop
  let turn = 0
  while (turn < 10) { // Max 10 turns to prevent infinite loop
    turn++
    console.log(`\n--- Turn ${turn} ---`)

    // Call LLM
    const response = await callLLM(messages)
    messages.push(response)

    // If no tool calls, we're done
    if (!response.tool_calls || response.tool_calls.length === 0) {
      console.log(`\n🤖 Assistant: ${response.content}`)
      break
    }

    // Execute tools
    const toolResults = await executeTools(response.tool_calls)
    messages.push(...toolResults)
  }

  console.log('\n✨ Done!\n')
}

// Run the agent
agentLoop('What does the README say?')
