// components/CountriesTable.tsx
import React, { useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICountry } from "../types/country";
import { addCountry, deleteCountry } from "../services/countryService";
import AddCountryDialog from "./AddCountryDialog";
import AddIcon from "@mui/icons-material/Add";
import { showErrorToast, showSuccessToast } from "./Toast";
import { useSetRecoilState } from "recoil";
import { selectedCountryState } from "../state/atoms";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import "../styles/CountriesTable.scss";
import { AxiosError } from "axios";

const CountriesTable: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const setSelectedCountryState = useSetRecoilState(selectedCountryState);

  // Fetch data hook
  const { data: countries, isLoading } = useFetchData();

  // Add Country Mutation
  const addMutation = useMutation({
    mutationFn: (newCountry: Omit<ICountry, "_id">) => addCountry(newCountry),
    onSuccess: (newCountry) => {
      queryClient.setQueryData(
        ["countries"],
        (oldData: ICountry[] | undefined) => {
          return oldData ? [...oldData, newCountry] : [newCountry];
        }
      );
      setAddDialogOpen(false);
      console.log("Country added successfully!");
      showSuccessToast("Country added successfully!");
    },
    onError: (error: unknown) => {
      console.error(`Add failed: ${(error as Error).message}`);
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        showErrorToast("Invalid input detected. Please check your data.");
      } else {
        showErrorToast("An unexpected error occurred. Please try again.");
      }
    },
  });

  // Delete mutation
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
      setDeleteConfirmOpen(false);
      console.log("Country deleted successfully!");
      showSuccessToast("Country deleted successfully!");
    },
    onError: (error) => {
      console.error(`Delete failed: ${(error as Error).message}`);
      showErrorToast("Failed to delete country.");
    },
  });

  // Open delete confirmation dialog
  const handleDeleteClick = (country: ICountry) => {
    setSelectedCountry(country);
    setDeleteConfirmOpen(true);
  };

  // Confirm delete action
  const handleDeleteConfirm = () => {
    if (selectedCountry) {
      deleteMutation.mutate(String(selectedCountry._id));
    }
  };

  // Edit handler (navigate to edit form)
  const handleEditClick = (country: ICountry) => {
    setSelectedCountryState(country);
    setTimeout(() => {
      navigate(`/edit-country/${country._id}`);
    }, 0);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Country Name",
      flex: 1,
    },
    {
      field: "flag",
      headerName: "Flag",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img
            src={params.value}
            alt={`${params.row.name} flag`}
            style={{ height: "30px", width: "50px", objectFit: "cover" }}
          />
        </div>
      ),
    },
    {
      field: "population",
      headerName: "Population",
      flex: 1,
    },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
    },
    {
      field: "cities",
      headerName: "Cities",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
            {params.value && params.value.length > 0 ? (
              params.value.map((city: string, index: number) => (
                <li key={index} style={{ fontSize: "12px", color: "#555" }}>
                  {city}
                </li>
              ))
            ) : (
              <li>No cities available</li>
            )}
          </ul>
        </div>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        const country = params.row as ICountry;
        return [
          <GridActionsCellItem
            data-testid="edit-button"
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(country)}
            color="inherit"
          />,
          <GridActionsCellItem
            data-testid="delete-button"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(country)}
            color="error"
          />,
        ];
      },
    },
  ];

  return (
    <div data-testid="countries-table">
      <Box sx={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={countries || []}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <IconButton
            color="primary"
            onClick={() => setAddDialogOpen(true)}
            data-testid="add-button"
          >
            <AddIcon />
          </IconButton>
        </Box>
        <AddCountryDialog
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onAdd={(newCountry) => {
            const countryWithCities = {
              ...newCountry,
              cities: newCountry.cities || [],
            };
            addMutation.mutate(countryWithCities);
          }}
        />
        <DeleteConfirmDialog
          open={deleteConfirmOpen}
          selectedCountry={selectedCountry}
          onClose={() => setDeleteConfirmOpen(false)}
          onDelete={handleDeleteConfirm}
        />
      </Box>
    </div>
  );
};

export default CountriesTable;
