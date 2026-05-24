import type { AiCompletionRequest, AiCompletionResponse, AiProvider } from './types';

const providers = new Map<string, AiProvider>();

export function registerAiProvider(provider: AiProvider) {
  providers.set(provider.id, provider);
}

export function getAiProviders() {
  return [...providers.values()];
}

export async function completeWithAi(
  providerId: string,
  request: AiCompletionRequest
): Promise<AiCompletionResponse> {
  const provider = providers.get(providerId);

  if (!provider) {
    throw new Error(`AI provider is not registered: ${providerId}`);
  }

  return provider.complete(request);
}

export type {
  AiCompletionRequest,
  AiCompletionResponse,
  AiMessage,
  AiProvider
} from './types';
