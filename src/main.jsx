import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContactsProvider from './Provider/ContactsProvider.jsx';


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ContactsProvider>
    <RouterProvider router={router} />
    </ContactsProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

