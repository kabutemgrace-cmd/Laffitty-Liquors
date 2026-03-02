
import { GoogleGenAI, Type } from "@google/genai";

const apiKey = import.meta.env.VITE_API_KEY as string | undefined;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const FALLBACK_FACTS = [
  { fact: "Beer was so essential in ancient Egypt that workers building the pyramids received it as part of their daily wages — roughly 4–5 litres a day.", spiritType: "Beer" },
  { fact: "Whiskey gets its name from the Gaelic 'uisce beatha', meaning 'water of life'. The Scots and Irish have been arguing over who invented it ever since.", spiritType: "Whiskey" },
  { fact: "In the 18th century, gin was so cheap and abundant in London that it caused a public health crisis. The era became known as the 'Gin Craze' — 7,000 gin shops in a city of 700,000.", spiritType: "Gin" },
  { fact: "Napoleon had a special wine, Chambertin Burgundy, shipped to every battlefield. He drank it daily — diluted with water, but never with defeat.", spiritType: "Wine" },
  { fact: "Tequila can only legally be produced in five Mexican states. Anything made elsewhere, even with blue agave, cannot be called tequila.", spiritType: "Tequila" },
  { fact: "Champagne was accidentally invented by Dom Pérignon in the 17th century. He reportedly shouted 'I am drinking stars!' after his first sip — possibly apocryphal, but perfect.", spiritType: "Champagne" },
  { fact: "The world's oldest known recipe is for beer — a 4,000-year-old Sumerian tablet describes brewing a fermented grain drink as an offering to the goddess Ninkasi.", spiritType: "Beer" },
  { fact: "Rum played a central role in the American Revolution. When Britain taxed molasses in 1764, New England distilleries that made rum from it became hotbeds of colonial resentment.", spiritType: "Rum" },
  { fact: "A barrel of bourbon must be made from new, charred American oak. Distillers can only use each barrel once — which is why Scotch whisky makers eagerly buy them secondhand.", spiritType: "Bourbon" },
  { fact: "Vodka's name comes from the Russian 'voda', meaning 'water'. In medieval Russia it was used as a medicine, antiseptic, and diplomatic gift — sometimes all three at once.", spiritType: "Vodka" },
  { fact: "Winston Churchill reportedly consumed around a bottle of Johnnie Walker whisky per day throughout WWII. He called it his 'companion through dark times'.", spiritType: "Whisky" },
  { fact: "Cognac must be distilled twice in copper pot stills and aged in Limousin or Tronçais oak barrels. Miss any step and it's legally just brandy.", spiritType: "Cognac" },
];

let lastFallbackIndex = -1;

function getRandomFallback() {
  let idx;
  do { idx = Math.floor(Math.random() * FALLBACK_FACTS.length); } while (idx === lastFallbackIndex);
  lastFallbackIndex = idx;
  return FALLBACK_FACTS[idx];
}

// Fetches a short, punchy historical fact about alcohol
export async function getSpiritFact() {
  if (!ai) return getRandomFallback();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
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
    return getRandomFallback();
  }
}
