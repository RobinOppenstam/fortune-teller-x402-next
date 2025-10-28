import OpenAI from "openai";

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  console.warn("⚠️  OPENAI_API_KEY not set - fortune generation will fail");
}

export const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

export async function generateFortune(category: string, userInput?: string): Promise<string> {
  if (!openai) {
    throw new Error("OpenAI client not initialized - missing API key");
  }

  const prompts: Record<string, string> = {
    love: "You are a based crypto fortune teller who speaks to CT degens. Generate a short, meme-tier fortune about relationships/love but make it crypto-native (2-3 sentences). Use terms like 'wagmi', 'ngmi', 'bag holder', 'diamond hands'. Be funny but wise.",
    career: "You are a degen oracle predicting the futures of crypto builders and shitposters. Generate a short fortune about their career/bags (2-3 sentences). Reference airdrops, rugs, 100x plays, building, or touching grass. Be motivational but memey.",
    wisdom: "You are an ancient crypto sage who witnessed the Satoshi whitepaper. Share profound degen wisdom (2-3 sentences). Reference cycles, narratives, WAGMI/NGMI, bags, or touching grass. Be philosophical but based.",
    random: "You are a mystical degen oracle on CT. Generate a short fortune about life, bags, or the market (2-3 sentences). Mix wisdom with memes. Reference moon missions, rugs, diamond hands, or touching grass.",
  };

  const systemPrompt = prompts[category] || prompts.random;
  const userPrompt = userInput
    ? `The seeker asks: "${userInput}". Provide a fortune in response.`
    : "Provide a fortune for a curious seeker.";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.9,
      max_tokens: 150,
    });

    return completion.choices[0].message.content || "The spirits are unclear... try again soon.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate fortune");
  }
}
