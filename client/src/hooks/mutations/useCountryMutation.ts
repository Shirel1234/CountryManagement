import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteCountry,
  addCountry,
  updateCountry,
} from "../../services/countryService";
import { ICountry } from "../../types/country";
import { showErrorToast, showSuccessToast } from "../../components/Toast";

export const useDeleteCountry = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (countryId: string) => deleteCountry(countryId),
    onSuccess: (_data, variables) => {
      const countryId = variables;
      queryClient.setQueryData(
        ["countries"],
        (oldData: ICountry[] | undefined) => {
          return oldData
            ? oldData.filter((country) => country._id !== countryId)
            : [];
        }
      );
      console.log("Country deleted successfully!");
      showSuccessToast("Country deleted successfully!");
    },
    onError: (error) => {
      console.error(`Delete failed: ${(error as Error).message}`);
      showErrorToast("Failed to delete country.");
    },
  });

  return deleteMutation;
};

export const useAddCountry = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation<ICountry, Error, Omit<ICountry, "_id">>({
    mutationFn: (newCountry) => addCountry(newCountry),
    onSuccess: (newCountry) => {
      queryClient.setQueryData(
        ["countries"],
        (oldData: ICountry[] | undefined) => {
          return oldData ? [...oldData, newCountry] : [newCountry];
        }
      );
      console.log("Country added successfully!");
      showSuccessToast("Country added successfully!");
    },
    onError: (error) => {
      console.error(`Add failed: ${(error as Error).message}`);
      showErrorToast("Failed to add country.");
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
        ["countries"],
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
      console.log("Country updated successfully!");
      showSuccessToast("Country updated successfully!");
    },
    onError: (error) => {
      console.error(
        `Failed to update the country: ${(error as Error).message}`
      );
      showErrorToast("Failed to update the country.");
    },
  });

  return updateMutation;
};
