export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  messages: Message[];
  isFirstPrompt: boolean;
  projectId: string;
  projectFiles?: {
    visible: Array<{
      path: string;
      content: string;
      lastModified: number;
    }>;
    hidden: string[];
  };
}

export interface ChatResponse {
  content: string;
  id: string;
  role: 'assistant';
}
