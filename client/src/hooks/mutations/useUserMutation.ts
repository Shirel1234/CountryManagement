import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUser } from "../../types/user";
import { addUser, deleteUser, updateUser } from "../../services/userServices";
import { showErrorToast, showSuccessToast } from "../../components/utils/Toast";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { isLoggedInState } from "../../state/atoms";
import { useSetRecoilState } from "recoil";
import { QUERY_KEYS, ROUTES, USER_MUTATION_MESSAGES } from "../../constants";

export const useAddUser = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation<IUser, Error, FormData>({
    mutationFn: (newUser) => addUser(newUser),
    onSuccess: (newUser) => {
      queryClient.setQueryData(
        [QUERY_KEYS.USERS],
        (oldData: IUser[] | undefined) => {
          return oldData ? [...oldData, newUser] : [newUser];
        }
      );
      console.log(USER_MUTATION_MESSAGES.USER_ADDED);
      showSuccessToast(USER_MUTATION_MESSAGES.USER_ADDED);
    },
    onError: (error) => {
      console.error(
        `${USER_MUTATION_MESSAGES.ADD_USER_FAILED}: ${(error as Error).message}`
      );
      showErrorToast(USER_MUTATION_MESSAGES.ADD_USER_FAILED);
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
      queryClient.setQueryData(
        [QUERY_KEYS.USERS],
        (oldData: IUser[] | undefined) => {
          return oldData ? [...oldData, newUser] : [newUser];
        }
      );
      showSuccessToast(USER_MUTATION_MESSAGES.USER_REGISTERED);
      setIsLoggedIn(true);
      navigate(ROUTES.HOME);
    },
    onError: (error) => {
      showErrorToast(
        `${USER_MUTATION_MESSAGES.REGISTER_USER_FAILED}: ${
          (error as Error).message
        }`
      );
    },
  });

  return registerMutation;
};
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation<
    IUser,
    Error,
    { id: string; formData: FormData }
  >({
    mutationFn: ({ id, formData }) => updateUser(id, formData),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(
        [QUERY_KEYS.USERS],
        (oldData: IUser[] | undefined) => {
          return oldData
            ? oldData.map((User) =>
                User._id === updatedUser._id
                  ? { ...User, ...updatedUser }
                  : User
              )
            : [];
        }
      );
      console.log(USER_MUTATION_MESSAGES.USER_UPDATED);
      showSuccessToast(USER_MUTATION_MESSAGES.USER_UPDATED);
    },
    onError: (error) => {
      console.error(
        `${USER_MUTATION_MESSAGES.UPDATE_USER_FAILED}: ${
          (error as Error).message
        }`
      );
      showErrorToast(USER_MUTATION_MESSAGES.UPDATE_USER_FAILED);
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
      queryClient.setQueryData(
        [QUERY_KEYS.USERS],
        (oldData: IUser[] | undefined) => {
          return oldData ? oldData.filter((user) => user._id !== userId) : [];
        }
      );
      console.log(USER_MUTATION_MESSAGES.USER_DELETED);
      showSuccessToast(USER_MUTATION_MESSAGES.USER_DELETED);
    },
    onError: (error) => {
      console.error(
        `${USER_MUTATION_MESSAGES.DELETE_USER_FAILED}: ${
          (error as Error).message
        }`
      );
      showErrorToast(USER_MUTATION_MESSAGES.DELETE_USER_FAILED);
    },
  });

  return deleteMutation;
};
