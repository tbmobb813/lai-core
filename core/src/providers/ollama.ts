// Local Ollama implementation
import { BaseProvider } from './base';

export class OllamaProvider extends BaseProvider {
  async generate(prompt: string, options?: any): Promise<any> {
    // Implement Ollama API call here
    return {};
  }
}
