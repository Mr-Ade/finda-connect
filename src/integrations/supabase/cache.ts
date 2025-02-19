import { QueryData, QueryError } from '@supabase/supabase-js';

type CacheEntry<T> = {
  data: T;
  timestamp: number;
  expiresIn: number;
};

class QueryCache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes default TTL

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn: ttl,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.expiresIn;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  generateKey(table: string, query: object): string {
    return `${table}:${JSON.stringify(query)}`;
  }
}

export const queryCache = new QueryCache();

export async function cachedQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: QueryError | null }>,
  table: string,
  query: object,
  ttl?: number
): Promise<{ data: T | null; error: QueryError | null }> {
  const cacheKey = queryCache.generateKey(table, query);
  const cachedResult = queryCache.get<T>(cacheKey);

  if (cachedResult) {
    return { data: cachedResult, error: null };
  }

  const result = await queryFn();
  if (result.data && !result.error) {
    queryCache.set(cacheKey, result.data, ttl);
  }

  return result;
}