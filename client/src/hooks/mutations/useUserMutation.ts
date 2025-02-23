import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUser } from "../../types/user";
import { addUser, deleteUser, updateUser } from "../../services/userServices";
import { showErrorToast, showSuccessToast } from "../../components/Toast";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { isLoggedInState } from "../../state/atoms";
import { useSetRecoilState } from "recoil";

export const useAddUser = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation<IUser, Error, Omit<IUser, "_id">>({
    mutationFn: (newUser) => addUser(newUser),
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (oldData: IUser[] | undefined) => {
        return oldData ? [...oldData, newUser] : [newUser];
      });
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
export const useRegisterUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const registerMutation = useMutation<{ token: string }, Error, FormData>({
    mutationFn: (formData: FormData) => {
      console.log("aaaaaaaa", formData)
      return registerUser(formData);
    },
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (oldData: IUser[] | undefined) => {
        return oldData ? [...oldData, newUser] : [newUser];
      });
      showSuccessToast("User registered successfully!");
      setIsLoggedIn(true);
      navigate("/home");
    },
    onError: (error) => {
      showErrorToast(`Error: ${(error as Error).message}`);
    },
  });

  return registerMutation;
};
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation<IUser, Error, {id: string; formData: FormData}>({
    mutationFn: ({id, formData}) => updateUser(id, formData),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users"], (oldData: IUser[] | undefined) => {
        return oldData
          ? oldData.map((User) =>
              User._id === updatedUser._id ? { ...User, ...updatedUser } : User
            )
          : [];
      });
      console.log("User updated successfully!");
      showSuccessToast("User updated successfully!");
    },
    onError: (error) => {
      console.error(`Failed to update the User: ${(error as Error).message}`);
      showErrorToast("Failed to update the User.");
    },
  });

  return updateMutation;
};
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: (_data, variables) => {
      const userId = variables;
      queryClient.setQueryData(["users"], (oldData: IUser[] | undefined) => {
        return oldData ? oldData.filter((user) => user._id !== userId) : [];
      });
      console.log("User deleted successfully!");
      showSuccessToast("User deleted successfully!");
    },
    onError: (error) => {
      console.error(`Delete failed: ${(error as Error).message}`);
      showErrorToast("Failed to delete user.");
    },
  });

  return deleteMutation;
};
