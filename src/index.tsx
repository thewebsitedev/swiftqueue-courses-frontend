import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import AuthRoute from './AuthRoute';
import App from './App';
import Login from './Login';
import { AuthProvider } from './AuthContext';
import Spinner from './components/Spinner';
import Register from './Register';
import Page404 from './components/Page404';

// import reportWebVitals from './reportWebVitals';

const Courses = React.lazy(() => import('./Courses'));
const AddCourse = React.lazy(() => import('./AddCourse'));
const EditCourse = React.lazy(() => import('./EditCourse'));
const Course = React.lazy(() => import('./Course'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/courses",
    element: (
      <AuthRoute>
        <Suspense fallback={<Spinner />}>
          <Courses />
        </Suspense>
      </AuthRoute>
    ),
  },
  {
    path: "/courses/add",
    element: (<AuthRoute>
      <Suspense fallback={<Spinner />}>
        <AddCourse />
      </Suspense>
    </AuthRoute>
    ),
  },
  {
    path: "/courses/:id",
    element: <AuthRoute>
      <Suspense fallback={<Spinner />}><Course /></Suspense></AuthRoute>,
  },
  {
    path: "/courses/:id/edit",
    element: <AuthRoute><Suspense fallback={<Spinner />}><EditCourse /></Suspense></AuthRoute>,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
