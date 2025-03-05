import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}
interface UseFetchOptions<T> {
    fetchFn: () => Promise<T>,
    cacheKey: string
}
// A simple in-memory cache
const cache: Record<string, any> = {};

export const useFetch = <T,>({
    fetchFn,
    cacheKey
}: UseFetchOptions<T>): UseFetchResult<T> => {
    const [data, setData] = useState<T | null>(() => {
        if (cache[cacheKey]) {
            return cache[cacheKey].data;
        }
        return null;
    });
    const [loading, setLoading] = useState<boolean>(!cache[cacheKey]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (cache[cacheKey]) {
            setData(cache[cacheKey].data);
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const result = await fetchFn();
                cache[cacheKey] = { data: result };
                setData(result);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchFn, cacheKey]);

    return { data, loading, error };
};

