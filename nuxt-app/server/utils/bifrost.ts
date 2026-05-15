type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }

type ChatRequest = {
  model: string
  messages: ChatMessage[]
  max_tokens?: number
  temperature?: number
}

type ChatResponse = {
  choices: Array<{ message: { role: string; content: string } }>
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number }
}

// Thin wrapper around $fetch — keeps the server route readable.
// Reads runtimeConfig for bifrostUrl + workshopVk.
// Provider keys live in Bifrost itself; this code never sees them.
export async function callBifrost(body: ChatRequest): Promise<ChatResponse> {
  const { bifrostUrl, workshopVk } = useRuntimeConfig()

  if (!workshopVk) {
    throw createError({
      statusCode: 500,
      statusMessage: 'WORKSHOP_VK not configured',
      data: { reason: 'Set WORKSHOP_VK in .env (created in Block 4.4 as a Virtual Key in Bifrost).' },
    })
  }

  return await $fetch<ChatResponse>(`${bifrostUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${workshopVk}`,
    },
    body,
  })
}
