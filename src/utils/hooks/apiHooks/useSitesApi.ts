import { useState, useEffect } from 'react';
import { useFetch } from '../useFetch';
import { testsApi } from '@utils/api/testsApi';
import { sitesApi } from '@utils/api/sitesApi';

export const useSitesApi = () => {
    const getSitesQuery = () => useFetch({
        fetchFn: () => sitesApi.getSites(),
        cacheKey: 'sites'
    });

    const getSiteByIdQuery = (id: number) => useFetch({
        fetchFn: () => testsApi.getTestsById(id),
        cacheKey: `sites/${id}`
    });

    return {
        queries: { getSitesQuery, getSiteByIdQuery },
        mutations: {}
    }
};