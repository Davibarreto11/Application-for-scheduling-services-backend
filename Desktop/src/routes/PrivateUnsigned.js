import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { store } from '../store';

function PrivateRoute() {
  const { signed } = store.getState().auth;

  if (!signed) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
