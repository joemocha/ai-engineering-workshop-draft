<script setup lang="ts">
type ChatResponse = { reply: string }
type PolicyError = { statusCode: number; statusMessage: string; data?: { reason?: string } }

const prompt = ref('')
const reply = ref('')
const error = ref<PolicyError | null>(null)
const loading = ref(false)

const send = async () => {
  if (!prompt.value.trim()) return
  loading.value = true
  error.value = null
  reply.value = ''

  try {
    const res = await $fetch<ChatResponse>('/api/chat', {
      method: 'POST',
      body: { prompt: prompt.value },
    })
    reply.value = res.reply
  } catch (err: any) {
    // 4xx errors from the server route (including 402 budget cap → 403 policy block)
    error.value = {
      statusCode: err?.statusCode ?? 500,
      statusMessage: err?.statusMessage ?? 'Unknown error',
      data: err?.data,
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="container">
    <h1>AI Workshop — Gateway Integration</h1>
    <p class="lede">
      This Vue/Nuxt app knows about <strong>one URL</strong> — the gateway. It doesn't hold provider keys.
      It doesn't pick models. Routing, budgets, caching, guardrails — all live in Bifrost.
    </p>

    <form @submit.prevent="send">
      <label for="prompt">Your message</label>
      <textarea
        id="prompt"
        v-model="prompt"
        rows="3"
        placeholder="Ask anything…"
        :disabled="loading"
      />
      <button type="submit" :disabled="loading || !prompt.trim()">
        {{ loading ? 'Sending…' : 'Send' }}
      </button>
    </form>

    <section v-if="reply" class="reply">
      <h2>Reply</h2>
      <pre>{{ reply }}</pre>
    </section>

    <section v-if="error" class="policy-warning" role="alert">
      <h2>Policy blocked ({{ error.statusCode }})</h2>
      <p>{{ error.data?.reason ?? error.statusMessage }}</p>
      <p class="hint">
        Common cause — the Virtual Key's budget cap hit (Block 4.5). The gateway returned 402;
        the server route surfaced it as a 4xx to the UI. Either reset the budget or wait for the reset interval.
      </p>
    </section>
  </main>
</template>

<style scoped>
.container {
  max-width: 640px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: system-ui, -apple-system, sans-serif;
}
.lede {
  color: #555;
  margin-bottom: 1.5rem;
}
textarea {
  width: 100%;
  padding: 0.5rem;
  font: inherit;
}
button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.reply, .policy-warning {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 4px;
}
.reply {
  background: #f4f4f4;
}
.reply pre {
  white-space: pre-wrap;
  font: inherit;
}
.policy-warning {
  background: #fff4e5;
  border: 1px solid #f5b76a;
}
.hint {
  font-size: 0.875rem;
  color: #666;
}
</style>
