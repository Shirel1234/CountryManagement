import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../services/userServices";

export const useFetchUsers = () => {
    return useQuery({
      queryKey: ["users"], 
      queryFn: fetchUsers, 
      retry: 2,           
      staleTime: 5 * 60 * 1000, 
    });
  };
