// Modular AI Service Layer - Easy to switch providers
import { spawn } from 'child_process';
import path from 'path';

export class AIService {
  constructor() {
    this.provider = 'gemini';
    this.model = 'gemini-2.5-flash';
  }

  async generateText(prompt, systemMessage = 'You are a helpful assistant.') {
    return new Promise((resolve, reject) => {
      const pythonScript = path.join(process.cwd(), 'lib', 'ai_helper.py');
      const python = spawn('python3', [
        pythonScript,
        this.provider,
        this.model,
        systemMessage,
        prompt
      ]);

      let output = '';
      let error = '';

      python.stdout.on('data', (data) => {
        output += data.toString();
      });

      python.stderr.on('data', (data) => {
        error += data.toString();
      });

      python.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(error || 'AI service error'));
        } else {
          resolve(output.trim());
        }
      });
    });
  }

  // Specific methods for different tools
  async summarizeText(text) {
    const prompt = `Summarize the following text in a clear and concise manner:\n\n${text}`;
    return this.generateText(prompt, 'You are a text summarization expert.');
  }

  async paraphraseText(text) {
    const prompt = `Paraphrase the following text while maintaining its original meaning:\n\n${text}`;
    return this.generateText(prompt, 'You are a paraphrasing expert.');
  }

  async correctGrammar(text) {
    const prompt = `Correct the grammar and spelling in the following text. Only return the corrected text:\n\n${text}`;
    return this.generateText(prompt, 'You are a grammar and spelling correction expert.');
  }

  async generateBio(details) {
    const prompt = `Generate a professional bio based on these details:\n${JSON.stringify(details, null, 2)}`;
    return this.generateText(prompt, 'You are a professional bio writer.');
  }
}

export default new AIService();