import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/userServices";
import { API_CONFIG, QUERY_KEYS } from "../../constants";

export const useFetchUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: fetchUsers,
    retry: API_CONFIG.RETRY,
    staleTime: API_CONFIG.STALE_TIME,
  });
};
