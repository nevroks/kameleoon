import { Button, Input } from "@ui";
import { useDebounce, useTestsWithSites } from "@utils/hooks";

import { useMemo, useState } from "react";
import SearchIconSrc from "@assets/icons/SearchIcon.svg"
import ArrowIconSrc from "@assets/icons/ArrowIcon.svg"
import styles from './style.module.css'
import classNames from "classnames";
import React from "react";
import { Link } from "react-router";
import { deleteUrls } from "@utils/helpers/strings";
const DashboardPage = () => {
    const [sort, setSort] = useState<{
        sortType: 'name' | 'type' | 'status' | 'siteUrl';
        sortDirection: 'asc' | 'desc';
    }>({
        sortType: 'name',
        sortDirection: 'asc'
    });
    const [searchQuery, setSearchQuery] = useState('');


    const { isLoading: isTestsLoading, tests, isError } = useTestsWithSites();
    const debouncedSearchQuery = useDebounce(searchQuery, 480);

    const filteredAndSortedTests = useMemo(() => {
        if (!Boolean(tests) || isTestsLoading || isError) {
            return []
        } else {
            const filteredTests = tests!.filter(test =>
                test.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
            );
            const sortedTests = [...filteredTests].sort((a, b) => {
                let comparison = 0;
                switch (sort.sortType) {
                    case 'name':
                        comparison = a.name.localeCompare(b.name);
                        break;
                    case 'type':
                        comparison = a.type.localeCompare(b.type);
                        break;
                    case 'status':
                        comparison = a.status.localeCompare(b.status);
                        break;
                    case 'siteUrl':
                        comparison = a.siteUrl.localeCompare(b.siteUrl);
                        break;
                }

                // Apply sort direction
                return sort.sortDirection === 'asc' ? comparison : -comparison;
            });

            return sortedTests
        }
    }, [JSON.stringify(tests), debouncedSearchQuery, sort.sortDirection, sort.sortType]);

    const handleSortChange = (sortType: 'name' | 'type' | 'status' | 'siteUrl') => {
        if (sort.sortType === sortType) {
            setSort({
                sortType,
                sortDirection: sort.sortDirection === 'asc' ? 'desc' : 'asc'
            });
        } else {
            setSort({
                sortType,
                sortDirection: 'asc'
            });
        }
    }

    if (isTestsLoading) {
        return
    }
    if (isError) {
        return <div>some server error</div>
    }
    return (
        <div className={styles['DashboardPage']}>
            <h1 className={styles['DashboardPage-title']}>Dashboard</h1>
            <div className={styles['DashboardPage-search']}>
                <Input className={styles['DashboardPage-searchInput']}>
                    <div className={styles['DashboardPage-searchInput-search']}>
                        <img src={SearchIconSrc} alt="search-icon" />
                        <Input.TextInput placeholder="What test are you looking for?" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <p className={styles['DashboardPage-searchInput-results']}>{filteredAndSortedTests.length} tests</p>
                </Input>
            </div>
            {filteredAndSortedTests.length === 0 ?
                <div className={styles['DashboardPage-noResults']}>
                    <p className="text-title text-500">Your search did not match any results. </p>
                    <Button onClick={() => setSearchQuery('')} text="reset" variant="active" />
                </div>
                :
                <table className={styles['DashboardPage-results-table']}>
                    <thead className={styles['DashboardPage-results-table-header']}>
                        <tr>
                            <th>
                                {/* // колонка под отступ */}
                            </th>
                            <th className={styles['DashboardPage-results-table-header-heading']} onClick={() => handleSortChange('name')}>
                                <p>
                                    Name
                                    {sort.sortType === "name" && <img className={classNames(styles['DashboardPage-results-table-sortArrow'], {
                                        [styles.asc]: sort.sortDirection === "asc",
                                        [styles.desc]: sort.sortDirection === "desc",
                                    })} src={ArrowIconSrc} alt="ArrowIcon" />}
                                </p>
                            </th>
                            <th onClick={() => handleSortChange('type')}>
                                <p>
                                    Type
                                    {sort.sortType === "type" && <img className={classNames(styles['DashboardPage-results-table-sortArrow'], {
                                        [styles.asc]: sort.sortDirection === "asc",
                                        [styles.desc]: sort.sortDirection === "desc",
                                    })} src={ArrowIconSrc} alt="ArrowIcon" />}
                                </p>
                            </th>
                            <th onClick={() => handleSortChange('status')}>
                                <p>
                                    Status
                                    {sort.sortType === "status" && <img className={classNames(styles['DashboardPage-results-table-sortArrow'], {
                                        [styles.asc]: sort.sortDirection === "asc",
                                        [styles.desc]: sort.sortDirection === "desc",
                                    })} src={ArrowIconSrc} alt="ArrowIcon" />}
                                </p>
                            </th>
                            <th onClick={() => handleSortChange('siteUrl')}>
                                <p>
                                    Site
                                    {sort.sortType === "siteUrl" && <img className={classNames(styles['DashboardPage-results-table-sortArrow'], {
                                        [styles.asc]: sort.sortDirection === "asc",
                                        [styles.desc]: sort.sortDirection === "desc",
                                    })} src={ArrowIconSrc} alt="ArrowIcon" />}
                                </p>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className={styles['DashboardPage-results-table-body']}>
                        {filteredAndSortedTests!.map((test, index) => (
                            <React.Fragment key={test.id}>
                                <tr className={styles['DashboardPage-results-table-body-row']}>
                                    <td className={classNames(styles['DashboardPage-results-table-body-row-border'], {
                                        [styles.market]: test.siteUrl === 'https://market.company.com',
                                        [styles.games]: test.siteUrl === 'http://games.company.com',
                                        [styles.delivery]: test.siteUrl === 'https://www.delivery.company.com',
                                    })}>
                                    </td>
                                    <td>
                                        {test.name}
                                    </td>
                                    <td>{test.type}</td>
                                    <td className={classNames('', {
                                        'text-error': test.status === 'STOPPED',
                                        'text-success': test.status === 'ONLINE',
                                        'text-warning': test.status === 'PAUSED',
                                    })}>{test.status}</td>
                                    <td><a href={test.siteUrl}>{deleteUrls(test.siteUrl)}</a></td>
                                    {test.status === "DRAFT" ?
                                        <td>
                                            <Link to={`/finalize/${test.id}`}>
                                                <Button text="Finalize" variant="inactive" />
                                            </Link>
                                        </td>
                                        :
                                        <td>
                                            <Link to={`/results/${test.id}`}>
                                                <Button text="Results" variant="active" />
                                            </Link>
                                        </td>
                                    }

                                </tr>
                                {index !== filteredAndSortedTests!.length - 1 &&
                                    <tr>
                                        <td colSpan={5} style={{ height: "5px" }}></td>
                                    </tr>
                                }

                            </React.Fragment>

                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}

export default DashboardPage;
