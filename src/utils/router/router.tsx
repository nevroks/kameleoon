import { createBrowserRouter, RouterProvider } from "react-router";
import { APP_PATHS } from '@utils/consts'
import { Layout } from "@components";
import PublicRoute from "./PublicRoute";
import { lazy } from "react";

const DashboardPage = lazy(() => import("@pages/DashboardPage/DashboardPage"))
const FinalizePage = lazy(() => import("@pages/FinalizePage/FinalizePage"))
const ResultsPage = lazy(() => import("@pages/ResultsPage/ResultsPage"))

const router = createBrowserRouter([
    {
        path: APP_PATHS.ROOT,
        element: <Layout />,
        children: [
            {
                path: APP_PATHS.DASHBOARD,
                element: <PublicRoute element={<DashboardPage />} />
            },
            {
                path: APP_PATHS.FINALIZE,
                element: <PublicRoute element={<FinalizePage />} />
            },
            {
                path: APP_PATHS.RESULTS,
                element: <PublicRoute element={<ResultsPage />} />
            },

        ],
    },

]);

const Router = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Router;

