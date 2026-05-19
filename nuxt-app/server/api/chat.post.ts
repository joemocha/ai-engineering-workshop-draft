import { callBifrost } from '~/server/utils/bifrost'

export default defineEventHandler(async (event) => {
  const { prompt } = await readBody<{ prompt: string }>(event)

  if (!prompt?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Prompt is required' })
  }

  try {
    const result = await callBifrost({
      model: 'anthropic/claude-sonnet-4-6',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    })

    return { reply: result.choices[0]?.message?.content ?? '' }
  } catch (err: any) {
    // Bifrost returns 402 Payment Required when a budget cap is exceeded.
    // Surface as a 403 to the UI so it lands in the policy-warning branch.
    if (err?.statusCode === 402 || err?.response?.status === 402) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Request blocked by AI policy',
        data: { reason: 'Budget cap exceeded. Reset the budget or wait for the reset interval.' },
      })
    }

    // Pass through other 4xx errors with the gateway's message
    if (err?.response?.status >= 400 && err?.response?.status < 500) {
      throw createError({
        statusCode: err.response.status,
        statusMessage: err.response.statusText ?? 'Upstream error',
        data: { reason: err?.response?._data?.error?.message ?? 'Gateway returned an error' },
      })
    }

    // Anything else surfaces as 502
    throw createError({
      statusCode: 502,
      statusMessage: 'Bad Gateway',
      data: { reason: 'Could not reach the AI gateway. Is Bifrost running on localhost:8080?' },
    })
  }
})
