import React, { useEffect, useRef } from "react";
import { useFetchCountries } from "../../hooks/queries/useCountriesQuery";
import Loader from "../ui/Loader";
import { showSuccessToast, showErrorToast } from "../utils/Toast";
import "../../styles/DataList.scss";
import CountriesTable from "../tables/CountriesTable";

const DataList: React.FC = () => {
  const { isLoading, isError, isSuccess, error } = useFetchCountries();
  const hasShownSuccessToast = useRef(false);
  useEffect(() => {
    if (isSuccess && !hasShownSuccessToast.current) {
      showSuccessToast("Data loaded successfully!");
      hasShownSuccessToast.current = true;
    }
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
