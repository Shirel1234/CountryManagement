import React, { useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useFetchCountries } from "../../api/queries/useCountriesQuery";
import { ICountry } from "../../api/types/country";
import AddCountryDialog from "./AddCountryDialog";

import { useSetRecoilState, useRecoilValue } from "recoil";
import { selectedCountryState, userAccessLevelState } from "../../state/atoms";
import DeleteConfirmDialog from "../dialogs/DeleteConfirmDialog";
import { Tooltip } from "@mui/material";
import "../../styles/CountriesTable.scss";
import {
  useAddCountry,
  useDeleteCountry,
  useUpdateCountry,
} from "../../api/mutations/useCountryMutation";
import CityDialog from "../city/CityDialog";
import { ICity } from "../../api/types/city";
import { ROUTES } from "../../constants";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { AccessLevel } from "../../constants/accessLevelEnum";

const CountriesTable: React.FC = () => {
  const navigate = useNavigate();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [cityDialogOpen, setCityDialogOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const userAccessLevel = useRecoilValue(userAccessLevelState);
  const setSelectedCountryState = useSetRecoilState(selectedCountryState);

  const { data: countries, isLoading } = useFetchCountries();
  const { mutate: addCountryMutation } = useAddCountry();
  const { mutate: deleteCountryMutation } = useDeleteCountry();
  const { mutate: updateCountryMutation } = useUpdateCountry(
    selectedCountry?._id
  );

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
      navigate(ROUTES.EDIT_COUNTRY(country._id));
    }, 0);
  };
  const handleOpenCitiesDialog = (country: ICountry) => {
    setSelectedCountry(country);
    setCityDialogOpen(true);
  };
  const handleSaveCities = (updatedCities: ICity[]) => {
    if (selectedCountry) {
      const updatedCountry = {
        ...selectedCountry,
        cities: updatedCities.map((city) => ({
          _id: city._id,
          name: city.name,
        })),
      };
      setSelectedCountry(updatedCountry);
      updateCountryMutation(updatedCountry);
    }
  };
  const handleGoBack = () => {
    setSelectedCountryState(null);
    navigate(-1);
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
      renderCell: (params) => {
        const cities = params.row.cities || [];
        const cityNames = cities.map((city: ICity) => city.name).join(", ");

        return (
          <Box display="flex" alignItems="center">
            <Tooltip title={cityNames} placement="top">
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                }}
              >
                {cityNames}
              </Typography>
            </Tooltip>
            <IconButton
              color="primary"
              onClick={() => handleOpenCitiesDialog(params.row)}
              sx={{ marginLeft: 1 }}
            >
              <EditNoteIcon />
            </IconButton>
          </Box>
        );
      },
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
        const actions = [];
        if (userAccessLevel && userAccessLevel >= 3) {
          actions.push(
            <GridActionsCellItem
              data-testid="edit-button"
              icon={<EditIcon />}
              label="Edit"
              onClick={() => handleEditClick(country)}
              color="inherit"
            />
          );
        }
        if (userAccessLevel && userAccessLevel >= 4) {
          actions.push(
            <GridActionsCellItem
              data-testid="delete-button"
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleDeleteClick(country)}
              color="error"
            />
          );
        }
        return actions;
      },
    },
  ];

  return (
    <div data-testid="countries-table" className="countries-table">
      {userAccessLevel === AccessLevel.ADMIN && (
        <button className="go-back-button" onClick={handleGoBack}>
          ← Go Back
        </button>
      )}
      <Typography variant="h4" className="title">
        Countries
      </Typography>
      <Box sx={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={countries || []}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
        {userAccessLevel && userAccessLevel >= AccessLevel.ADD && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <IconButton
              color="primary"
              onClick={() => setAddDialogOpen(true)}
              data-testid="add-button"
            >
              <AddIcon />
            </IconButton>
          </Box>
        )}
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
        <CityDialog
          open={cityDialogOpen}
          onClose={() => setCityDialogOpen(false)}
          selectedCountry={selectedCountry}
          onSave={handleSaveCities}
        />
      </Box>
    </div>
  );
};

export default CountriesTable;
