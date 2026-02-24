
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Fetches a short, punchy historical fact about alcohol
export async function getSpiritFact() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Tell me a short, punchy, and true historical fun fact or story about alcohol (whiskey, wine, beer, gin, etc.).",
      config: {
        systemInstruction: `You are the "Laffitty Historian". 
        Your goal is to provide sophisticated, witty "Pour me another fact" moments.
        
        Guidelines:
        - Must be true and historical.
        - Tone: Sophisticated, witty, and punchy. Avoid being cheesy.
        - Style examples: "In the 18th century, gin was so popular in London it was known as Mother's Ruin." or "Whiskey actually comes from the Gaelic 'uisce beatha', meaning 'water of life'."
        - Keep it concise.
        - Ensure variety across different spirits.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fact: {
              type: Type.STRING,
              description: "The punchy historical fact or story."
            },
            spiritType: {
              type: Type.STRING,
              description: "The primary spirit mentioned (e.g., Whiskey, Gin, Wine)."
            }
          },
          required: ["fact", "spiritType"]
        }
      },
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini fact error:", error);
    return { fact: "Beer was once considered a staple food in ancient Egypt. They literally built the pyramids on a liquid diet.", spiritType: "Beer" };
  }
}

// Generates a drink recommendation based on a user's mood or prompt
export async function getDrinkRecommendation(userPrompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Recommend a drink and a vibe based on this mood: ${userPrompt}`,
      config: {
        systemInstruction: `You are the world-class AI Concierge for "Laffitty Liquors", a premium alcohol delivery service in Nairobi.
        Your job is to recommend the perfect drink from our selection based on the user's described mood, occasion, or vibe.
        
        Guidelines:
        - recommendation: A catchy name for the recommendation (e.g., "The Midnight Cruiser").
        - suggestedProduct: A specific product name (e.g., Jameson Black Barrel, Glenfiddich 12 Year, Belvedere Pure Vodka, Don Julio 1942).
        - reasoning: A punchy, persuasive sentence on why this fits.
        - vibe: A short 1-2 word description of the vibe (e.g., "SOPHISTICATED", "LOUD", "CHILL").
        - Keep the tone witty, premium, and very Nairobi/Urban.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendation: {
              type: Type.STRING,
              description: "The name of the recommendation."
            },
            suggestedProduct: {
              type: Type.STRING,
              description: "The specific product to buy."
            },
            reasoning: {
              type: Type.STRING,
              description: "Why this product fits the prompt."
            },
            vibe: {
              type: Type.STRING,
              description: "The overall vibe (e.g. CHILL, LOUD)."
            }
          },
          required: ["recommendation", "suggestedProduct", "reasoning", "vibe"]
        }
      },
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini recommendation error:", error);
    return {
      recommendation: "The Reliable Smooth",
      suggestedProduct: "Jameson Black Barrel",
      reasoning: "When you can't decide, you go with the charred sweetness of a classic. It never misses.",
      vibe: "VERSATILE"
    };
  }
}
