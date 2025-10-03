import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import Layout from './layouts/main';
import TodoPage from './pages';
import SignInPage from './pages/signin';
import CalendarPage from './pages/calendar';

/**
 * Definición de las rutas de la aplicación y su jerarquía.
 */
const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '',
            Component: TodoPage,
          },
          {
            path: 'calendar',
            Component: CalendarPage,
          },
        ],
      },
      {
        path: '/sign-in',
        Component: SignInPage,
      },
    ],
  },
]);

/**
 * Punto de entrada que monta la aplicación de React en el DOM.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
