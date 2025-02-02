import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../services/countryService";

export const useFetchData = () => {
    return useQuery({
      queryKey: ["countries"], 
      queryFn: fetchCountries, 
      retry: 2,           
      staleTime: 5 * 60 * 1000, 
    });
  };
