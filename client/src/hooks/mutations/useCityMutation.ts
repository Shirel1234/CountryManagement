import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCity, addCity, updateCity } from "../../services/cityService";
import { ICity } from "../../types/city";
import { showErrorToast, showSuccessToast } from "../../components/Toast";

export const useDeleteCity = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (cityId: string) => deleteCity(cityId),
    onSuccess: (_data, variables) => {
      const cityId = variables;
      queryClient.setQueryData(["cities"], (oldData: ICity[] | undefined) => {
        return oldData ? oldData.filter((city) => city._id !== cityId) : [];
      });
      console.log("City deleted successfully!");
      showSuccessToast("City deleted successfully!");
    },
    onError: (error) => {
      console.error(`Delete failed: ${(error as Error).message}`);
      showErrorToast("Failed to delete city.");
    },
  });

  return deleteMutation;
};

export const useAddCity = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation<ICity, Error, Omit<ICity, "_id">>({
    mutationFn: (newcity) => addCity(newcity),
    onSuccess: (newcity) => {
      queryClient.setQueryData(["cities"], (oldData: ICity[] | undefined) => {
        return oldData ? [...oldData, newcity] : [newcity];
      });

      console.log("City added successfully!");
      showSuccessToast("City added successfully!");
    },
    onError: (error) => {
      console.error(`Add failed: ${(error as Error).message}`);
      showErrorToast("Failed to add city.");
    },
  });

  return addMutation;
};

export const useUpdateCity = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation<ICity, Error, ICity>({
    mutationFn: (updatedcity) => updateCity(updatedcity._id, updatedcity),
    onSuccess: (updatedcity) => {
      queryClient.setQueryData(["cities"], (oldData: ICity[] | undefined) => {
        return oldData
          ? oldData.map((city) =>
              city._id === updatedcity._id ? { ...city, ...updatedcity } : city
            )
          : [];
      });
      console.log("City updated successfully!");
      showSuccessToast("City updated successfully!");
    },
    onError: (error) => {
      console.error(`Failed to update the city: ${(error as Error).message}`);
      showErrorToast("Failed to update the city.");
    },
  });

  return updateMutation;
};
