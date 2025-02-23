import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IRequestAccess } from "../../types/requestAccess";
import {
  addRequestAccess,
  updateRequest,
} from "../../services/requestAccessService";
import { showErrorToast, showSuccessToast } from "../../components/Toast";

export const useAddRequestAccess = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation<IRequestAccess, Error, { action: string }>({
    mutationFn: (newRequest) => addRequestAccess(newRequest),
    onSuccess: (newRequestAccess) => {
      queryClient.setQueryData(
        ["requests"],
        (oldData: IRequestAccess[] | undefined) => {
          return oldData ? [...oldData, newRequestAccess] : [newRequestAccess];
        }
      );
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      console.log("Request sent to the admin!");
      showSuccessToast("Request sent to the admin!");
    },
    onError: (error) => {
      console.error("Error sending request:", error);
      showErrorToast("Failed to send request.");
    },
  });

  return addMutation;
};

export const useUpdateRequest = (id: string| null ) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation<
    IRequestAccess,
    Error,
    { id: string; status: string }
  >({
    mutationFn: (updatedRequest) => updateRequest(id, updatedRequest),
    onSuccess: (updatedRequest) => {
      queryClient.setQueryData(
        ["requests"],
        (oldData: IRequestAccess[] | undefined) => {
          if (!oldData) return [];

          return oldData.map((request) =>
            request._id === updatedRequest._id
              ? { ...request, status: updatedRequest.status }
              : request
          );
        }
      );

      queryClient.invalidateQueries({ queryKey: ["requests"] });

      console.log("Request updated successfully!");
      showSuccessToast("Request updated successfully!");
    },
    onError: (error) => {
      console.error(
        `Failed to update the request: ${(error as Error).message}`
      );
      showErrorToast("Failed to update the request.");
    },
  });

  return updateMutation;
};
