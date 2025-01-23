import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../services/apiService";

export const useFetchData = () => {
    return useQuery({
      queryKey: ["data"], 
      queryFn: fetchData, 
      retry: 2,           
      staleTime: 5 * 60 * 1000, 
    });
  };
