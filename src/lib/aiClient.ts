type GenerateTextInput = {
  prompt: string;
  model?: string;
};

type GenerateTextResult = {
  text: string;
};

/**
 * Calls the server-side AI proxy. `text` is untrusted model output: render it only
 * as React text children (or textContent) — never via dangerouslySetInnerHTML or
 * innerHTML, as a URL/href, or as code.
 */
export async function generateTextViaProxy(input: GenerateTextInput): Promise<GenerateTextResult> {
  const response = await fetch("/api/ai/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({
      prompt: input.prompt,
      model: input.model,
    }),
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    throw new Error(`AI proxy request failed: ${response.status}`);
  }

  const data: unknown = await response.json();
  const text = (data as { text?: unknown } | null)?.text;
  // Only a plain string may leave this module (no objects such as { __html: ... }).
  if (typeof text !== "string") {
    throw new Error("AI proxy returned an unexpected response.");
  }
  return { text };
}
