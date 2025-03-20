import React, { useEffect, useRef } from "react";
import { useFetchCountries } from "../../api/queries/useCountriesQuery";
import Loader from "../ui/Loader";
import { showSuccessToast, showErrorToast } from "../utils/Toast";
import "../../styles/DataList.scss";
import CountriesTable from "../country/CountriesTable";
import { TOAST_MESSAGES_DATA_LIST } from "../../constants";

const DataList: React.FC = () => {
  const { isLoading, isError, isSuccess, error } = useFetchCountries();
  const hasShownSuccessToast = useRef(false);
  useEffect(() => {
    if (isSuccess && !hasShownSuccessToast.current) {
      showSuccessToast(TOAST_MESSAGES_DATA_LIST.LOAD_DATA_SUCCESS);
      hasShownSuccessToast.current = true;
    }
    if (isError) showErrorToast(TOAST_MESSAGES_DATA_LIST.LOAD_DATA_FAILURE);
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
