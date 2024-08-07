import { RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import appRouter from "./appRouter";

import "./app.css";

const queryClient = new QueryClient();

const AppEntry = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <RouterProvider router={appRouter} />
      </CookiesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppEntry;
