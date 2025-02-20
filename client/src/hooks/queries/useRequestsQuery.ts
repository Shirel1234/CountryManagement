import { useQuery } from "@tanstack/react-query";
import { fetchRequests } from "../../services/requestAccessService";

export const useFetchRequests = () => {
  return useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};
