import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, QuizType, GeneratedContent } from "../types";

// Initialize the client with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuiz = async (
  difficulty: Difficulty,
  type: QuizType,
  customTopic: string = ""
): Promise<GeneratedContent> => {
  
  const model = "gemini-2.5-flash";
  
  const topicString = customTopic ? `specifically focusing on "${customTopic}"` : "";
  
  const prompt = `
    You are an expert English teacher. Create a study session for a student.
    
    Task 1: Create a concise "Textbook Section" (Theory) about the topic. Include an overview, key rules/points, and clear examples.
    Task 2: Create a multiple-choice quiz with 5 questions to test this specific theory.
    
    Level: ${difficulty}
    Type: ${type}
    ${topicString}
    
    Ensure the questions vary in context and structure.
    Provide a clear explanation for why the correct answer is correct.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            theory: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "A catchy title for the lesson topic" },
                overview: { type: Type.STRING, description: "A brief 2-3 sentence introduction to the concept." },
                keyPoints: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "List of 3-5 important rules or facts to remember."
                },
                examples: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "List of 3 clear usage examples."
                }
              },
              required: ["title", "overview", "keyPoints", "examples"]
            },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  questionText: { type: Type.STRING, description: "The question to ask the student." },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "A list of 4 potential answers.",
                  },
                  correctAnswerIndex: { type: Type.INTEGER, description: "The index (0-3) of the correct answer in the options array." },
                  explanation: { type: Type.STRING, description: "A short explanation of the correct answer." },
                },
                required: ["id", "questionText", "options", "correctAnswerIndex", "explanation"],
              },
            }
          },
          required: ["theory", "questions"]
        },
      },
    });

    const jsonStr = response.text;
    if (!jsonStr) {
      throw new Error("No data received from Gemini.");
    }

    const content = JSON.parse(jsonStr) as GeneratedContent;
    return content;

  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};