import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import router from './routes/route';
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <CookiesProvider>
            <RouterProvider router={router}></RouterProvider>
        </CookiesProvider>
    </QueryClientProvider>
);
