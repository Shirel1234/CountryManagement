import { useQuery } from "@tanstack/react-query";
import { fetchRequests } from "../../services/requestAccessService";

export const useFetchRequests = (userId?: string) => {
  return useQuery({
    queryKey: ["requests", userId],
    queryFn: () => fetchRequests(userId),
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};
