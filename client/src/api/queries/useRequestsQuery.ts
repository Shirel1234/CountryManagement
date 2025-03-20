import { useQuery } from "@tanstack/react-query";
import { fetchRequests } from "../services/requestAccessService";
import { API_CONFIG, QUERY_KEYS } from "../../constants";

export const useFetchRequests = (userId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.REQUESTS, userId],
    queryFn: () => fetchRequests(userId),
    retry: API_CONFIG.RETRY,
    staleTime: API_CONFIG.STALE_TIME,
  });
};
