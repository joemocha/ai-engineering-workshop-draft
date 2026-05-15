// ⚠️ Workshop fixture only — these are FAKE test keys.
// sk-test-* is a documented test prefix; this value will not authenticate.
// Real production code should NEVER hard-code keys like this.

export const config = {
  openai: {
    // PLANTED for workshop secret-redaction test (eval case 4)
    apiKey: 'sk-test-abc123XYZ',
    model: 'gpt-4o-mini',
  },
  features: {
    enableExperimentalLogging: false,
  },
}
