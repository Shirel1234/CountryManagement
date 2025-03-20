import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCity, addCity, updateCity } from "../services/cityService";
import { ICity } from "../types/city";
import { showErrorToast, showSuccessToast } from "../../components/utils/Toast";
import { CITY_MUTATION_MESSAGES, QUERY_KEYS } from "../../constants";

export const useDeleteCity = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (cityId: string) => deleteCity(cityId),
    onSuccess: (_data, variables) => {
      const cityId = variables;
      queryClient.setQueryData(
        [QUERY_KEYS.CITIES],
        (oldData: ICity[] | undefined) => {
          return oldData ? oldData.filter((city) => city._id !== cityId) : [];
        }
      );
      console.log(CITY_MUTATION_MESSAGES.CITY_DELETED);
      showSuccessToast(CITY_MUTATION_MESSAGES.CITY_DELETED);
    },
    onError: (error) => {
      console.error(
        `${CITY_MUTATION_MESSAGES.DELETE_CITY_FAILED}: ${
          (error as Error).message
        }`
      );
      showErrorToast(CITY_MUTATION_MESSAGES.DELETE_CITY_FAILED);
    },
  });

  return deleteMutation;
};
export const useAddCity = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation<ICity, Error, Omit<ICity, "_id">>({
    mutationFn: (newcity) => addCity(newcity),
    onSuccess: (newcity) => {
      queryClient.setQueryData(
        [QUERY_KEYS.CITIES],
        (oldData: ICity[] | undefined) => {
          return oldData ? [...oldData, newcity] : [newcity];
        }
      );

      console.log(CITY_MUTATION_MESSAGES.CITY_ADDED);
      showSuccessToast(CITY_MUTATION_MESSAGES.CITY_ADDED);
    },
    onError: (error) => {
      console.error(
        `${CITY_MUTATION_MESSAGES.ADD_CITY_FAILED}: ${(error as Error).message}`
      );
      showErrorToast(CITY_MUTATION_MESSAGES.ADD_CITY_FAILED);
    },
  });

  return addMutation;
};
export const useUpdateCity = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation<ICity, Error, ICity>({
    mutationFn: (updatedcity) => updateCity(updatedcity._id, updatedcity),
    onSuccess: (updatedcity) => {
      queryClient.setQueryData(
        [QUERY_KEYS.CITIES],
        (oldData: ICity[] | undefined) => {
          return oldData
            ? oldData.map((city) =>
                city._id === updatedcity._id
                  ? { ...city, ...updatedcity }
                  : city
              )
            : [];
        }
      );
      console.log(CITY_MUTATION_MESSAGES.CITY_UPDATED);
      showSuccessToast(CITY_MUTATION_MESSAGES.CITY_UPDATED);
    },
    onError: (error) => {
      console.error(
        `${CITY_MUTATION_MESSAGES.UPDATE_CITY_FAILED}: ${
          (error as Error).message
        }`
      );
      showErrorToast(CITY_MUTATION_MESSAGES.UPDATE_CITY_FAILED);
    },
  });

  return updateMutation;
};
