import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../services/countryService";
import { API_CONFIG, QUERY_KEYS } from "../../constants";

export const useFetchCountries = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.COUNTRIES], 
      queryFn: fetchCountries, 
      retry: API_CONFIG.RETRY,           
      staleTime: API_CONFIG.STALE_TIME, 
    });
  };
