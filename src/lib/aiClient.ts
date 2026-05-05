type GenerateTextInput = {
  prompt: string;
  model?: string;
};

type GenerateTextResult = {
  text: string;
};

export async function generateTextViaProxy(input: GenerateTextInput): Promise<GenerateTextResult> {
  const response = await fetch("/api/ai/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: input.prompt,
      model: input.model,
    }),
  });

  if (!response.ok) {
    throw new Error(`AI proxy request failed: ${response.status}`);
  }

  return response.json() as Promise<GenerateTextResult>;
}
