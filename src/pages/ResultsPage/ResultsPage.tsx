import { useTestsWithSites } from "@utils/hooks";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import styles from './style.module.css'
const ResultsPage = () => {

    const { id } = useParams()
    const navigate = useNavigate();

    const { isLoading: isTestsLoading, tests, isError } = useTestsWithSites();

    const test = useMemo(() => {
        return tests?.find(test => test.id === Number(id))
    }, [JSON.stringify(tests), id]);

    if (isTestsLoading) {
        return
    }
    if (isError) {
        return <div>error</div>
    }
    if (test!.status === 'DRAFT') {
        return <div>this test cant be resulted</div>
    }

    return (
        <div className={styles['ResultsPage']}>
            <div>
                <h1>Results</h1>
                <p>{test!.name}</p>
            </div>
            <button onClick={() => navigate(-1)}>
                BACK
            </button>
        </div>
    );
}

export default ResultsPage;
