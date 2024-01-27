import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import router from './routes/route';
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CookiesProvider>
        <RouterProvider router={router}></RouterProvider>
    </CookiesProvider>
);
