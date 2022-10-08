import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Login from './pages/login/login';
import ErrorPage from './pages/error/error';
import SignUp from './pages/signup/signup';
import SketchHome from './pages/sketch-home/sketch-home';
import AuthProvider from './services/authenticate';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />
  },
  {
    path: "/sketch",
    element: <SketchHome />,
    errorElement: <ErrorPage />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);


