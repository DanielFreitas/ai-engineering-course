# Contratos — React para Aplicações de IA (Frontend)

## Contrato de Props de Componentes Principais

### `<StreamingMessage>`

```typescript
interface StreamingMessageProps {
  content: string;
  role: 'user' | 'assistant' | 'system';
  status: 'idle' | 'streaming' | 'done' | 'error' | 'cancelled';
  sources?: Source[];
  turnIndex: number;
  onRegenerate?: (turnIndex: number) => void;
  onCopy?: (content: string) => void;
  renderMarkdown?: boolean;
  className?: string;
}

interface Source {
  id: string;
  title: string;
  url?: string;
  excerpt: string;
  relevance_score: number;
}
```

### `<ConversationInput>`

```typescript
interface ConversationInputProps {
  onSubmit: (message: string, attachments?: File[]) => void;
  onCancel: () => void;
  disabled: boolean;
  isStreaming: boolean;
  maxLength?: number;
  placeholder?: string;
  allowAttachments?: boolean;
  className?: string;
}
```

### `<ConversationHistory>`

```typescript
interface ConversationHistoryProps {
  turns: ConversationTurn[];
  streamingTurnId?: string;
  onRegenerateFrom?: (turnIndex: number) => void;
  isLoading: boolean;
  className?: string;
}

interface ConversationTurn {
  id: string;
  turnIndex: number;
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  status: 'done' | 'error';
  timestamp: string;
  tokenCount?: number;
}
```

---

## Contrato do Hook `useStreamingResponse`

```typescript
interface UseStreamingResponseOptions {
  sessionId: string;
  onToken?: (token: string) => void;
  onComplete?: (fullContent: string, usage: TokenUsage) => void;
  onError?: (error: StreamingError) => void;
}

interface UseStreamingResponseReturn {
  content: string;
  status: 'idle' | 'submitting' | 'streaming' | 'done' | 'error' | 'cancelled';
  error: StreamingError | null;
  submit: (message: string, context?: MessageContext) => void;
  cancel: () => void;
  reset: () => void;
}

interface StreamingError {
  code: 'RATE_LIMIT' | 'CONTEXT_TOO_LONG' | 'MODEL_UNAVAILABLE' | 'NETWORK_ERROR' | 'CANCELLED' | 'UNKNOWN';
  message: string;
  retryable: boolean;
  retryAfterMs?: number;
}

interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}
```

---

## Contrato do Hook `useConversationSession`

```typescript
interface UseConversationSessionReturn {
  session: ConversationSession | null;
  turns: ConversationTurn[];
  status: 'loading' | 'active' | 'error';
  addTurn: (turn: Omit<ConversationTurn, 'id' | 'timestamp'>) => void;
  updateLastTurn: (partialTurn: Partial<ConversationTurn>) => void;
  clearSession: () => void;
  totalTokenCount: number;
  isApproachingTokenLimit: boolean;
}

interface ConversationSession {
  id: string;
  title: string;
  modelVersion: string;
  createdAt: string;
  updatedAt: string;
}
```

---

## Contrato da API de Integração con Backend

### Submissão de Mensagem com Streaming

```typescript
// Tipo do corpo da requisição
interface SendMessageRequest {
  session_id: string;
  message: string;
  context_turns?: Array<{ role: string; content: string }>;
  options?: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  };
}

// Tipos de eventos SSE recebidos
type SSEEvent =
  | { event: 'token'; data: { delta: string; index: number } }
  | { event: 'sources'; data: { sources: Source[] } }
  | { event: 'done'; data: { finish_reason: string; usage: TokenUsage } }
  | { event: 'error'; data: StreamingError };
```

---

## Contrato de Estado Local do Componente (Store Zustand)

```typescript
interface ConversationStore {
  sessions: Record<string, ConversationSession>;
  turns: Record<string, ConversationTurn[]>;
  activeSessionId: string | null;

  // Actions
  setActiveSession: (sessionId: string) => void;
  addSession: (session: ConversationSession) => void;
  addTurn: (sessionId: string, turn: ConversationTurn) => void;
  updateTurn: (sessionId: string, turnId: string, updates: Partial<ConversationTurn>) => void;
  clearSession: (sessionId: string) => void;
}
```
