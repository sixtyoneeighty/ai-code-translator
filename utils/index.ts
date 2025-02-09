import endent from 'endent';

import { GoogleGenerativeAI } from '@google/generative-ai';

const createPrompt = (
  inputLanguage: string,
  outputLanguage: string,
  inputCode: string,
) => {
  if (inputLanguage === 'Natural Language') {
    return endent`
    You are an expert programmer. Translate the natural language to "${outputLanguage}" code. Output ONLY the code, nothing else - no explanations, no markdown.

    Input:
    ${inputCode}

    ${outputLanguage} code:
    `;
  } else if (outputLanguage === 'Natural Language') {
    return endent`
      You are an expert programmer. Translate the "${inputLanguage}" code to natural language. Output ONLY bullet points starting with -, nothing else.
      
      Input:
      ${inputCode}

      Output:
     `;
  } else {
    return endent`
      You are an expert programmer. Translate the "${inputLanguage}" code to "${outputLanguage}" code. Output ONLY the code, nothing else - no explanations, no markdown.
      
      Input:
      ${inputCode}

      ${outputLanguage} code:
     `;
  }
};

export const GeminiStream = async (
  inputLanguage: string,
  outputLanguage: string,
  inputCode: string,
  model: string,
  key: string,
) => {
  const genAI = new GoogleGenerativeAI(key);
  const genModel = genAI.getGenerativeModel({ model: model });

  const prompt = createPrompt(inputLanguage, outputLanguage, inputCode);
  const result = await genModel.generateContentStream([prompt]);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text();
        const queue = encoder.encode(text);
        controller.enqueue(queue);
      }
      controller.close();
    },
  });

  return stream;
};
