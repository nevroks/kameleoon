import { useMemo } from 'react';
import { useSitesApi } from './apiHooks/useSitesApi';
import { useTestsApi } from './apiHooks/useTestsApi';
import { Test } from '@utils/api/testsApi';

export interface TestWithSite extends Omit<Test, 'siteId'> {
    siteUrl: string;
}



export const useTestsWithSites = () => {
    const { queries: { getSitesQuery } } = useSitesApi()
    const { data: sites, loading: isSitesLoading, error: sitesLoadingError } = getSitesQuery()

    const { queries: { getTestsQuery } } = useTestsApi()
    const { data: tests, loading: isTestsLoading, error: testsLoadingError } = getTestsQuery()

    const testsWithSites = useMemo(() => {
        if (isTestsLoading || isSitesLoading || sitesLoadingError || testsLoadingError) {
            return null
        } else {
            const combinedData: TestWithSite[] = tests!.map(test => {
                const site = sites!.find(site => site.id === test.siteId);
                return {
                    id: test.id,
                    name: test.name,
                    type: test.type,
                    status: test.status,
                    siteUrl: site!.url
                };
            });
            
            return combinedData;
        }
    }, [JSON.stringify(sites), JSON.stringify(tests)]);

    return {
        isLoading: isSitesLoading || isTestsLoading,
        tests: testsWithSites,
        isError: sitesLoadingError || testsLoadingError
    }
};