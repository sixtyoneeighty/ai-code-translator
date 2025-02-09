import { GoogleGenerativeAI } from '@google/generative-ai';

// Using the model name from Google AI SDK
export type AIModel = 'gemini-2.0-pro-exp';

export interface TranslateBody {
  inputLanguage: string;
  outputLanguage: string;
  inputCode: string;
  model: AIModel;
  apiKey?: string; // Optional since we're using environment variables
}

export interface TranslateResponse {
  code: string;
}
