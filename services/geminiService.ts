import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Difficulty, QuizType, GeneratedContent } from "../types";

// Initialize the client with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuiz = async (
  difficulty: Difficulty,
  type: QuizType,
  customTopic: string = ""
): Promise<GeneratedContent> => {
  
  const model = "gemini-2.5-flash";
  
  const isVocabulary = type === QuizType.Vocabulary;
  const topicString = customTopic ? `specifically focusing on "${customTopic}"` : "";
  
  let prompt = "";
  let responseSchema: Schema = { type: Type.OBJECT, properties: {}, required: [] };

  // Common Question Schema
  const questionsSchema = {
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
  };

  if (isVocabulary) {
    prompt = `
      You are an expert English teacher. Create a "Fill in the Blank" vocabulary challenge.
      
      Task 1: Generate a list of 20 RANDOM English words appropriate for ${difficulty} level.
      They can be any part of speech (noun, verb, adjective, etc.).
      
      For each item provide:
      - The target word (the answer).
      - A Russian translation of the target word.
      - A sentence where the target word is strictly replaced by "_______" (7 underscores). 
        The sentence must provide enough context to guess the word.

      Task 2: Return an empty array for "questions".
      
      Level: ${difficulty}
      ${topicString}
    `;

    responseSchema = {
      type: Type.OBJECT,
      properties: {
        vocabulary: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING, description: "The correct English word to fill in." },
              translation: { type: Type.STRING, description: "Russian translation of the word" },
              sentenceWithBlank: { type: Type.STRING, description: "The English sentence with the word replaced by _______" }
            },
            required: ["word", "translation", "sentenceWithBlank"]
          },
          description: "List of 20 vocabulary items"
        },
        questions: questionsSchema
      },
      required: ["vocabulary", "questions"]
    };

  } else {
    prompt = `
      You are an expert English teacher. Create a study session for a student.
      
      Task 1: Create a concise "Textbook Section" (Theory) about the topic. 
      - Include an overview.
      - In the "keyPoints", YOU MUST include the specific grammatical formation rules/formulas (e.g., "Subject + V-ed/V2", "have/has + V3") if applicable to the topic.
      - Provide clear examples.

      Task 2: Create a multiple-choice quiz with 15 questions to test this specific theory.
      
      Level: ${difficulty}
      Type: ${type}
      ${topicString}
      
      Ensure the questions vary in context and structure.
      Provide a clear explanation for why the correct answer is correct.
    `;

    responseSchema = {
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
              description: "List of 3-5 important rules or facts to remember, specifically including formation formulas (e.g. S + V2)."
            },
            examples: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 clear usage examples."
            }
          },
          required: ["title", "overview", "keyPoints", "examples"]
        },
        questions: questionsSchema
      },
      required: ["theory", "questions"]
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
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