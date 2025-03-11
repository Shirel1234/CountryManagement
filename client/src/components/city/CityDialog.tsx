import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { ICountry } from "../../types/country";
import { ICity } from "../../types/city";
import {
  useAddCity,
  useUpdateCity,
} from "../../hooks/mutations/useCityMutation";
import { useDeleteCity } from "../../hooks/mutations/useCityMutation";
import { useRecoilValue } from "recoil";
import { userAccessLevelState } from "../../state/atoms";
import { CITY_ERROR_MESSAGES } from "../../constants";

interface CityDialogProps {
  open: boolean;
  onClose: () => void;
  selectedCountry: ICountry | null;
  onSave: (updatedCities: ICity[]) => void;
}

const CityDialog: React.FC<CityDialogProps> = ({
  open,
  onClose,
  selectedCountry,
  onSave,
}) => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [newCityName, setNewCityName] = useState("");
  const [editingCity, setEditingCity] = useState<ICity | null>(null);
  const userAccessLevel = useRecoilValue(userAccessLevelState);
  const { mutate: addCityMutation } = useAddCity();
  const { mutate: deleteCityMutation } = useDeleteCity();
  const { mutate: updateCityMutation } = useUpdateCity();

  useEffect(() => {
    if (selectedCountry) {
      setCities(selectedCountry.cities || []);
    }
  }, [selectedCountry]);

  const handleAddCity = () => {
    if (
      newCityName.trim() === "" ||
      cities.some((city) => city.name === newCityName)
    )
      return;
    addCityMutation({ name: newCityName } as Omit<ICity, "_id">, {
      onSuccess: (newCity) => {
        setCities((prevCities) => [...prevCities, newCity]);
        setNewCityName("");
      },
      onError: (error) => {
        console.error(CITY_ERROR_MESSAGES, error);
      },
    });
  };
  const handleDeleteCity = (cityDelete: ICity) => {
    setCities(cities.filter((city) => city !== cityDelete));
    deleteCityMutation(cityDelete._id);
  };
  const handleEditCity = (city: ICity) => {
    setEditingCity(city);
    setNewCityName(city.name);
  };
  const handleSaveEdit = () => {
    if (editingCity) {
      const updatedCity = { ...editingCity, name: newCityName };
      updateCityMutation(updatedCity);
      setCities(
        cities.map((city) =>
          city._id === editingCity._id ? updatedCity : city
        )
      );
      setEditingCity(null);
      setNewCityName("");
    }
  };
  const handleSaveChanges = () => {
    onSave(cities);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Manage Cities of {selectedCountry?.name}</DialogTitle>
      <DialogContent>
        <List>
          {cities.map((city) => (
            <ListItem
              key={city._id}
              secondaryAction={
                <>
                  {userAccessLevel && userAccessLevel >= 3 && (
                    <IconButton onClick={() => handleEditCity(city)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  {userAccessLevel && userAccessLevel >= 4 && (
                    <IconButton
                      onClick={() => handleDeleteCity(city)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </>
              }
            >
              <ListItemText primary={city.name} />
            </ListItem>
          ))}
        </List>
        {userAccessLevel && userAccessLevel >= 2 && (
          <TextField
            label="City Name"
            fullWidth
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
            margin="normal"
          />
        )}

        {editingCity ? (
          <Button onClick={handleSaveEdit} color="primary" variant="contained">
            Save Edit
          </Button>
        ) : (
          (userAccessLevel ?? 0) >= 2 && (
            <IconButton onClick={handleAddCity} color="primary">
              <AddIcon />
            </IconButton>
          )
        )}
      </DialogContent>
      {userAccessLevel && userAccessLevel >= 2 && (
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CityDialog;
