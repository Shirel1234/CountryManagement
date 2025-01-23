import React from "react";
import DataList from "./components/DataList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from "react-toastify";
import "./styles/global.scss";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-right" autoClose={3000} />
      <DataList />
      <ReactQueryDevtools 
        initialIsOpen={false}
      />
    </QueryClientProvider>
  );
};

export default App;
