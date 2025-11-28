import { GoogleGenAI, Type } from "@google/genai";
import { Book, AIAnalysisResult } from "../types";

// Initialize Gemini Client
// Assumption: process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const MODEL_NAME = 'gemini-2.5-flash';

export const generateBookAnalysis = async (book: Book): Promise<AIAnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key missing");
  }

  const prompt = `
    Analyze the book "${book.title}" by ${book.author}.
    Description: ${book.description}
    
    Provide:
    1. A list of 3 key themes.
    2. The overall mood (one or two words).
    3. 3 similar books with a short reason why.
    4. A one-sentence punchy summary.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            themes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            mood: { type: Type.STRING },
            similarBooks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  reason: { type: Type.STRING }
                }
              }
            },
            summary: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as AIAnalysisResult;
  } catch (error) {
    console.error("Analysis failed", error);
    // Fallback if API fails
    return {
      themes: ["Family Secrets", "Memory", "Betrayal"],
      mood: "Atmospheric Suspense",
      similarBooks: [
        { title: "The Silent Patient", reason: "Similar psychological tension." },
        { title: "Sharp Objects", reason: "Dark family dynamics." },
        { title: "Gone Girl", reason: "Unreliable narration." }
      ],
      summary: "A gripping tale of a woman forced to confront her mother's dark past."
    };
  }
};

export const chatWithBook = async (
  history: { role: string; parts: { text: string }[] }[],
  message: string,
  book: Book
): Promise<string> => {
    if (!process.env.API_KEY) {
        return "I need an API Key to reply! (Check your configuration)";
    }

  const systemInstruction = `
    You are the personification of the book "${book.title}" by ${book.author}.
    Your tone should be mysterious, suspenseful, and slightly unreliable, matching the genre of a psychological thriller.
    Use the book's description to inform your answers.
    Do not give away major spoilers (like the ending twist).
    If asked about plot details not in the description, hint at them darkly or say "You'll have to read me to find out."
    Keep responses concise (under 100 words).
  `;

  try {
    const chat = ai.chats.create({
      model: MODEL_NAME,
      config: { systemInstruction },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "...";
  } catch (error) {
    console.error("Chat failed", error);
    return "The pages are stuck together... I cannot answer right now.";
  }
};