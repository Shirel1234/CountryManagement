import { useQuery } from "@tanstack/react-query";
import { fetchCities } from "../../services/cityService";
import { API_CONFIG, QUERY_KEYS } from "../../constants";

export const useFetchCities = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.CITIES], 
      queryFn: fetchCities, 
      retry: API_CONFIG.RETRY,           
      staleTime: API_CONFIG.STALE_TIME, 
    });
  };
