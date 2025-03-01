// /src/hooks/use-api.ts

import { useState } from 'react';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function apiCall<T>(url: string, options?: RequestInit): Promise<T | null> {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('API call failed');
      const data = await response.json();
      return data as T;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { apiCall, loading, error };
}