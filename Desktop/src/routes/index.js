import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateUnsigned from './PrivateUnsigned';
import PrivateSigned from './PrivateSigned';

import Signin from '../pages/Signin';
import Signup from '../pages/Signup';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

function Router() {
  return (
    <Routes>
      <Route element={<PrivateSigned />}>
        <Route path="/" exact element={<Signin />} />
        <Route path="/register" element={<Signup />} />
      </Route>

      <Route element={<PrivateUnsigned />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default Router;
