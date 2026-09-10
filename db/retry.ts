function isConnectionError(error: unknown): boolean {
  const seen = new Set<unknown>();
  while (error instanceof Error && !seen.has(error)) {
    seen.add(error);
    if (/fetch failed|error connecting to database|ECONNRESET|ETIMEDOUT|EAI_AGAIN/i.test(error.message)) {
      return true;
    }
    error = error.cause;
  }
  return false;
}

// Only retry reads: a disconnected write may already have committed.
export async function retryDatabaseRead<T>(read: () => Promise<T>): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await read();
    } catch (error) {
      if (attempt >= 2 || !isConnectionError(error)) throw error;
      await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
    }
  }
}
