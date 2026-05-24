export interface AiMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
}

export interface AiCompletionRequest {
  messages: AiMessage[];
  model?: string;
  temperature?: number;
}

export interface AiCompletionResponse {
  content: string;
  provider: string;
  model?: string;
}

export interface AiProvider {
  id: string;
  name: string;
  complete: (request: AiCompletionRequest) => Promise<AiCompletionResponse>;
}
