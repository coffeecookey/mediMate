import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.HF_TOKEN);
const HF_MODEL = process.env.HF_MODEL || "Qwen/Qwen2.5-7B-Instruct";

export const chat = async (req, res) => {
  const { symptoms } = req.body;
  if (!symptoms) {
    return res.status(400).json({ error: "Symptoms are required" });
  }

  try {
    const prompt = `You are a medical triage bot. You MUST always reply in exactly this format, with each section present in a a very concise and structured manner:
    Severity: (one word: Low, Moderate, High)
    Immediate Need for Attention: (Yes/No)
    See a Doctor If: (max 2 short bullet points, each starting with "- ")
    Next Steps: (max 3 bullet points, each starting with "- ")
    Possible Conditions: (max 3 bullet points, each starting with "- ")
    Disclaimer: (one short sentence)
    Symptoms: "${symptoms}"`;

    const result = await hf.chatCompletion({
      model: HF_MODEL,
      provider: "auto",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 512,
      temperature: 0.3,
    });

    const reply = result.choices?.[0]?.message?.content ?? "";

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get response from Hugging Face" });
  }
};
