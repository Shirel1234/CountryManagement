import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUser } from "../types/user";
import { addUser, deleteUser, updateUser } from "../services/userServices";
import { showErrorToast, showSuccessToast } from "../../components/utils/Toast";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../state/atoms";
import {
  LOCAL_STORAGE_KEYS,
  QUERY_KEYS,
  ROUTES,
  USER_MUTATION_MESSAGES,
} from "../../constants";

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
  const queryClient = useQueryClient();
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const registerMutation = useMutation<
    { token: string; myId: string; myUsername: string; myProfileImage: string },
    Error,
    FormData
  >({
    mutationFn: (formData) => registerUser(formData),
    onSuccess: (newUser) => {
      queryClient.setQueryData(
        [QUERY_KEYS.USERS],
        (oldData: IUser[] | undefined) => {
          return oldData ? [...oldData, newUser] : [newUser];
        }
      );

      const { myId, myUsername, myProfileImage } = newUser;
      const userData = { myId, myUsername, myProfileImage };
      setUser(userData);

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.USER_DATA,
        JSON.stringify(userData)
      );

      showSuccessToast(USER_MUTATION_MESSAGES.USER_REGISTERED);
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
  const setUser = useSetRecoilState(userState);

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
      const currentUser = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA) || "{}"
      );
      if (currentUser.myId === updatedUser._id && updatedUser.profileImage) {
        const updatedUserData = {
          ...currentUser,
          myProfileImage: updatedUser.profileImage,
        };
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.USER_DATA,
          JSON.stringify(updatedUserData)
        );

        setUser((prev) => ({
          ...prev,
          myProfileImage: updatedUser.profileImage ?? prev.myProfileImage,
        }));
      }

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
