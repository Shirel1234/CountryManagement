import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IRequestAccess } from "../../types/requestAccess";
import { addRequestAccess } from "../../services/requestAccessService";
import { showErrorToast, showSuccessToast } from "../../components/Toast";

export const useAddRequestAccess = () => {
    const queryClient = useQueryClient();
  
    const addMutation = useMutation<IRequestAccess, Error, { action: string }>({
      mutationFn: (newRequest) => addRequestAccess(newRequest),
      onSuccess: (newRequestAccess) => {
        queryClient.setQueryData(
          ["requestsAccess"],
          (oldData: IRequestAccess[] | undefined) => {
            return oldData ? [...oldData, newRequestAccess] : [newRequestAccess];
          }
        );
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