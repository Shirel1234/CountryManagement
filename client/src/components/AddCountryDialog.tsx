// AddCountryDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { countryValidationSchema } from "../validation/countryValidation";

interface AddCountryDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (country: {
    name: string;
    flag: string;
    population: number;
    region: string;
    cities: string[];
  }) => void;
}

const AddCountryDialog: React.FC<AddCountryDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      flag: "",
      population: 0,
      region: "",
      cities: [],
    },
    validationSchema:countryValidationSchema,
    onSubmit: (values) => {
      onAdd(values);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Country</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="country name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            id="country-name"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Flag URL"
            name="flag"
            value={formik.values.flag}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.flag && Boolean(formik.errors.flag)}
            helperText={formik.touched.flag && formik.errors.flag}
            id="flag-url"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Population"
            name="population"
            type="number"
            value={formik.values.population}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.population && Boolean(formik.errors.population)
            }
            helperText={formik.touched.population && formik.errors.population}
            id="population"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Region"
            name="region"
            value={formik.values.region}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.region && Boolean(formik.errors.region)}
            helperText={formik.touched.region && formik.errors.region}
            id="region"
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-testid="add-country-button"
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCountryDialog;
