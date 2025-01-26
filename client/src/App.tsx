import React from "react";
import { Routes, Route } from "react-router-dom";
import DataList from "./components/DataList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from "react-toastify";
import "./styles/global.scss";
import EditCountryForm from "./components/EditCountryForm";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<DataList />} />
        <Route path="/edit-country/:id" element={<EditCountryForm />} />
      </Routes>
      <ReactQueryDevtools 
        initialIsOpen={false}
      />
    </QueryClientProvider>
  );
};

export default App;
