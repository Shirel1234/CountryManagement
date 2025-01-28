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
import { addCountry, deleteCountry } from "../services/apiService";
import AddCountryDialog from "./AddCountryDialog";
import AddIcon from "@mui/icons-material/Add";
import { showErrorToast, showSuccessToast } from "./Toast";
import { useSetRecoilState } from "recoil";
import { selectedCountryState } from "../state/atoms";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import "../styles/CountriesTable.scss";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
      setAddDialogOpen(false);
      showSuccessToast("Country added successfully!");
    },
    onError: (error) => {
      console.error("Add failed:", error);
      showErrorToast("Failed to add country.");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCountry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
      setDeleteConfirmOpen(false);
      showSuccessToast("Country deleted successfully!");
    },
    onError: (error) => {
      console.error("Delete failed:", error);
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
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        const country = params.row as ICountry;
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(country)}
            color="inherit"
          />,
          <GridActionsCellItem
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
    <Box sx={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={countries || []}
        columns={columns}
        getRowId={(row) => row._id}
        loading={isLoading}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <IconButton color="primary" onClick={() => setAddDialogOpen(true)}>
          <AddIcon />
        </IconButton>
      </Box>
      <AddCountryDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={(newCountry) => addMutation.mutate(newCountry)}
      />
      <DeleteConfirmDialog
        open={deleteConfirmOpen}
        selectedCountry={selectedCountry}
        onClose={() => setDeleteConfirmOpen(false)}
        onDelete={handleDeleteConfirm}
      />
    </Box>
  );
};

export default CountriesTable;
