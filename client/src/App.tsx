import React from "react";
import { Routes, Route } from "react-router-dom";
import DataList from "./components/DataList";
import "./styles/global.scss";
import EditCountryForm from "./components/EditCountryForm";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<DataList />} />
        <Route path="/edit-country/:id" element={<EditCountryForm />} />
      </Routes>
      </>
  );
};

export default App;
