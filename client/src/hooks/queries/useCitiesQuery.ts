import { useQuery } from "@tanstack/react-query";
import { fetchCities } from "../../services/cityService";

export const useFetchCities = () => {
    return useQuery({
      queryKey: ["cities"], 
      queryFn: fetchCities, 
      retry: 2,           
      staleTime: 5 * 60 * 1000, 
    });
  };
