import React, { ReactElement } from 'react';

type PublicRouteProps = {
    element: ReactElement;
};

const PublicRoute = ({ element }: PublicRouteProps) => {
    return element;
}

export default PublicRoute;
