import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IRequestAccess } from "../../types/requestAccess";
import {
  addRequestAccess,
  updateRequest,
} from "../../services/requestAccessService";
import { showErrorToast, showSuccessToast } from "../../components/utils/Toast";
import { QUERY_KEYS, REQUEST_ACCESS_MUTATION_MESSAGES } from "../../constants";

export const useAddRequestAccess = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation<IRequestAccess, Error, { action: string }>({
    mutationFn: (newRequest) => addRequestAccess(newRequest),
    onSuccess: (newRequestAccess) => {
      queryClient.setQueryData(
        [QUERY_KEYS.REQUESTS],
        (oldData: IRequestAccess[] | undefined) => {
          return oldData ? [...oldData, newRequestAccess] : [newRequestAccess];
        }
      );
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUESTS] });
      console.log(REQUEST_ACCESS_MUTATION_MESSAGES.REQUEST_SENT);
      showSuccessToast(REQUEST_ACCESS_MUTATION_MESSAGES.REQUEST_SENT);
    },
    onError: (error) => {
      console.error(REQUEST_ACCESS_MUTATION_MESSAGES.REQUEST_FAILED, error);
      showErrorToast(REQUEST_ACCESS_MUTATION_MESSAGES.REQUEST_FAILED);
    },
  });

  return addMutation;
};
export const useUpdateRequest = (id: string | null) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation<
    IRequestAccess,
    Error,
    { id: string; status: string }
  >({
    mutationFn: (updatedRequest) => updateRequest(id, updatedRequest),
    onSuccess: (updatedRequest) => {
      queryClient.setQueryData(
        [QUERY_KEYS.REQUESTS],
        (oldData: IRequestAccess[] | undefined) => {
          if (!oldData) return [];

          return oldData.map((request) =>
            request._id === updatedRequest._id
              ? { ...request, status: updatedRequest.status }
              : request
          );
        }
      );

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUESTS] });

      console.log(REQUEST_ACCESS_MUTATION_MESSAGES.REQUEST_UPDATED);
      showSuccessToast(REQUEST_ACCESS_MUTATION_MESSAGES.REQUEST_UPDATED);
    },
    onError: (error) => {
      console.error(
        `${REQUEST_ACCESS_MUTATION_MESSAGES.UPDATE_FAILED}: ${
          (error as Error).message
        }`
      );
      showErrorToast(REQUEST_ACCESS_MUTATION_MESSAGES.UPDATE_FAILED);
    },
  });

  return updateMutation;
};
