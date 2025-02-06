import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUser } from "../types/user";
import { addUser } from "../services/userServices";
import { showErrorToast, showSuccessToast } from "../components/Toast";

export const useAddUser = () => {
    const queryClient = useQueryClient();
  
    const addMutation = useMutation<IUser, Error,Omit<IUser, "_id" | "accessLevel">>({
      mutationFn: (newUser) => addUser(newUser),
      onSuccess: (newUser) => {
        queryClient.setQueryData(
          ["users"],
          (oldData: IUser[] | undefined) => {
            return oldData ? [...oldData, newUser] : [newUser];
          }
        );
        console.log("User added successfully!");
        showSuccessToast("User added successfully!");
      },
      onError: (error) => {
        console.error(`Add failed: ${(error as Error).message}`);
        showErrorToast("Failed to add User.");
      },
    });
  
    return addMutation;
  };