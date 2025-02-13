// components/CountriesTable.tsx
import React, { useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useFetchCountries } from "../hooks/queries/useCountriesQuery";
import { ICountry } from "../types/country";
import AddCountryDialog from "./AddCountryDialog";
import AddIcon from "@mui/icons-material/Add";
import { useSetRecoilState } from "recoil";
import { selectedCountryState } from "../state/atoms";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { Tooltip } from "@mui/material";
import "../styles/CountriesTable.scss";
import { useAddCountry, useDeleteCountry } from "../hooks/mutations/useCountryMutation";

const CountriesTable: React.FC = () => {
  const navigate = useNavigate();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const setSelectedCountryState = useSetRecoilState(selectedCountryState);

  const { data: countries, isLoading } = useFetchCountries();
  const { mutate: addCountryMutation } = useAddCountry();
  const { mutate: deleteCountryMutation } = useDeleteCountry();

  const handleAddCountry = (newCountry: Omit<ICountry, "_id">) => {
    const countryWithCities = {
      ...newCountry,
      cities: newCountry.cities || [],
    };
    addCountryMutation(countryWithCities);
    setAddDialogOpen(false);
  };
  const handleDeleteConfirm = () => {
    if (selectedCountry) {
      deleteCountryMutation(selectedCountry._id);
      setDeleteConfirmOpen(false);
    }
  };
  const handleDeleteClick = (country: ICountry) => {
    setSelectedCountry(country);
    setDeleteConfirmOpen(true);
  };
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
      renderHeader: (params) => (
        <Tooltip title={params.colDef.headerName} placement="top">
          <span>{params.colDef.headerName}</span>
        </Tooltip>
      ),
    },
    {
      field: "flag",
      headerName: "Flag",
      flex: 1,
      renderCell: (params) => (
        <div className="flag-cell">
          <img
            src={params.value}
            alt={`${params.row.name} flag`}
            className="flag-image"
            style={{ height: "30px", width: "50px", objectFit: "cover" }}
          />
        </div>
      ),
      renderHeader: (params) => (
        <Tooltip title={params.colDef.headerName} placement="top">
          <span>{params.colDef.headerName}</span>
        </Tooltip>
      ),
    },
    {
      field: "population",
      headerName: "Population",
      flex: 1,
      renderHeader: (params) => (
        <Tooltip title={params.colDef.headerName} placement="top">
          <span>{params.colDef.headerName}</span>
        </Tooltip>
      ),
    },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
      renderHeader: (params) => (
        <Tooltip title={params.colDef.headerName} placement="top">
          <span>{params.colDef.headerName}</span>
        </Tooltip>
      ),
    },
    {
      field: "cities",
      headerName: "Cities",
      flex: 1,
      renderHeader: (params) => (
        <Tooltip title={params.colDef.headerName} placement="top">
          <span>{params.colDef.headerName}</span>
        </Tooltip>
      ),
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
      renderHeader: (params) => (
        <Tooltip title={params.colDef.headerName} placement="top">
          <span>{params.colDef.headerName}</span>
        </Tooltip>
      ),
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
          onAdd={handleAddCountry}
        />
        <DeleteConfirmDialog
          open={deleteConfirmOpen}
          selectedItem={selectedCountry?.name}
          onClose={() => setDeleteConfirmOpen(false)}
          onDelete={handleDeleteConfirm}
        />
      </Box>
    </div>
  );
};

export default CountriesTable;
