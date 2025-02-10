import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUser } from "../types/user";
import { addUser } from "../services/userServices";
import { showErrorToast, showSuccessToast } from "../components/Toast";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { isLoggedInState } from "../state/atoms";
import { useSetRecoilState } from "recoil";

export const useAddUser = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation<
    IUser,
    Error,
    Omit<IUser, "_id" | "accessLevel">
  >({
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
