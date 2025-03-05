import { Suspense } from 'react';
import { Outlet } from 'react-router';
import classes from "./style.module.css"
const Layout = () => {
    return (
        <main className={classes['layout']}>
            <Suspense fallback={<div>Loading Content...</div>}>
                <Outlet />
            </Suspense>
        </main>
    );
}

export default Layout;
