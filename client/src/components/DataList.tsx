import React, { useEffect } from "react";
import { useFetchData } from "../hooks/useFetchData";
import Loader from "./Loader";
import { showSuccessToast, showErrorToast } from "./Toast";
import "../styles/DataList.scss";
import CountriesTable from "./CountriesTable";

const DataList: React.FC = () => {
  const {isLoading, isError, isSuccess, error } = useFetchData();

  useEffect(() => {
    if (isSuccess) showSuccessToast("Data loaded successfully!");
    if (isError) showErrorToast("Failed to load data.");
  }, [isSuccess, isError]);

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <p className="error">
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </p>
    );
  return <CountriesTable />;
};

export default DataList;
