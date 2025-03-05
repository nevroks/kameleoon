import { useFetch } from '../useFetch';
import { testsApi } from '@utils/api/testsApi';

export const useTestsApi = () => {
    const getTestsQuery = () => useFetch({
        fetchFn: () => testsApi.getTests(),
        cacheKey: 'tests'
    });

    const getTestsByIdQuery = (id: number) => useFetch({
        fetchFn: () => testsApi.getTestsById(id),
        cacheKey: `tests/${id}`
    });

    return {
        queries: { getTestsQuery, getTestsByIdQuery },
        mutations: {}
    }
};