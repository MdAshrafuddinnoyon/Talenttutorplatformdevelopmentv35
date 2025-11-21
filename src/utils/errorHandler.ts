/**
 * Silent Error Handler Utility
 * Handles network errors gracefully without spamming console
 */

export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof TypeError) {
    const message = error.message.toLowerCase();
    return (
      message.includes('fetch') ||
      message.includes('network') ||
      message.includes('failed to fetch')
    );
  }
  return false;
};

export const handleFetchError = (
  error: unknown,
  context?: string
): void => {
  if (isNetworkError(error)) {
    // Silent for network errors - server might not be running
    // This is expected in development/demo mode
    return;
  }

  // Log other types of errors
  if (context) {
    console.warn(`${context}:`, error);
  } else {
    console.warn('Fetch error:', error);
  }
};

export async function safeFetch<T>(
  fetchFn: () => Promise<T>,
  fallbackValue: T,
  options?: {
    context?: string;
    onError?: (error: unknown) => void;
  }
): Promise<T> {
  try {
    return await fetchFn();
  } catch (error) {
    handleFetchError(error, options?.context);
    if (options?.onError) {
      options.onError(error);
    }
    return fallbackValue;
  }
}
