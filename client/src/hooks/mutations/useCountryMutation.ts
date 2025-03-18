import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteCountry,
  addCountry,
  updateCountry,
} from "../../services/countryService";
import { ICountry } from "../../types/country";
import { showErrorToast, showSuccessToast } from "../../components/utils/Toast";
import { COUNTRY_MUTATION_MESSAGES, QUERY_KEYS } from "../../constants";

export const useDeleteCountry = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (countryId: string) => deleteCountry(countryId),
    onSuccess: (_data, variables) => {
      const countryId = variables;
      queryClient.setQueryData(
        [QUERY_KEYS.COUNTRIES],
        (oldData: ICountry[] | undefined) => {
          return oldData
            ? oldData.filter((country) => country._id !== countryId)
            : [];
        }
      );
      console.log(COUNTRY_MUTATION_MESSAGES.COUNTRY_DELETED);
      showSuccessToast(COUNTRY_MUTATION_MESSAGES.COUNTRY_DELETED);
    },
    onError: (error) => {
      console.error(
        `${COUNTRY_MUTATION_MESSAGES.COUNTRY_DELETED}: ${
          (error as Error).message
        }`
      );
      showErrorToast(COUNTRY_MUTATION_MESSAGES.DELETE_COUNTRY_FAILED);
    },
  });

  return deleteMutation;
};
export const useAddCountry = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation<ICountry, Error, Omit<ICountry, "_id">>({
    mutationFn: (newCountry) => addCountry(newCountry),
    onSuccess: (newCountry) => {
      console.log("Mutation succeeded, new country:", newCountry);
      queryClient.setQueryData(
        [QUERY_KEYS.COUNTRIES],
        (oldData: ICountry[] | undefined) => {
          return oldData ? [...oldData, newCountry] : [newCountry];
        }
      );
      console.log(COUNTRY_MUTATION_MESSAGES.COUNTRY_ADDED);
      showSuccessToast(COUNTRY_MUTATION_MESSAGES.COUNTRY_ADDED);
    },
    onError: (error) => {
      console.error(
        `${COUNTRY_MUTATION_MESSAGES.ADD_COUNTRY_FAILED}: ${
          (error as Error).message
        }`
      );
      showErrorToast(COUNTRY_MUTATION_MESSAGES.ADD_COUNTRY_FAILED);
    },
  });

  return addMutation;
};
export const useUpdateCountry = (id: string | undefined) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation<ICountry, Error, ICountry>({
    mutationFn: (updatedCountry) => updateCountry(id, updatedCountry),
    onSuccess: (updatedCountry) => {
      queryClient.setQueryData(
        [QUERY_KEYS.COUNTRIES],
        (oldData: ICountry[] | undefined) => {
          return oldData
            ? oldData.map((country) =>
                country._id === updatedCountry._id
                  ? { ...country, cities: updatedCountry.cities }
                  : country
              )
            : [];
        }
      );
      console.log(COUNTRY_MUTATION_MESSAGES.COUNTRY_UPDATED);
      showSuccessToast(COUNTRY_MUTATION_MESSAGES.COUNTRY_UPDATED);
    },
    onError: (error) => {
      console.error(
        `${COUNTRY_MUTATION_MESSAGES.UPDATE_COUNTRY_FAILED}: ${
          (error as Error).message
        }`
      );
      showErrorToast(COUNTRY_MUTATION_MESSAGES.UPDATE_COUNTRY_FAILED);
    },
  });

  return updateMutation;
};
