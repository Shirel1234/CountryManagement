import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useFormik } from "formik";
import { userValidationSchema } from "../../utils/validation/userValidation";
import { AccessLevel } from "../../constants/accessLevelEnum";

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (user: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    profileImage: string;
    password: string;
    accessLevel: number;
  }) => void;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      profileImage: "",
      password: "",
      accessLevel: AccessLevel.VIEWER,
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      onAdd(values);
      formik.resetForm();
      onClose();
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            id="first-name"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            id="last-name"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            id="username"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            id="email"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            id="phone"
          />
          <input
            type="file"
            name="profileImage"
            id="profileImage"
            onChange={(event) => {
              formik.setFieldValue(
                "profileImage",
                event.currentTarget.files?.[0]
              );
            }}
            onBlur={formik.handleBlur}
            style={{ marginBottom: "16px" }}
            accept="image/*"
          />
          {formik.touched.profileImage && formik.errors.profileImage && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formik.errors.profileImage}
            </div>
          )}
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            id="password"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Access Level</InputLabel>
            <Select
              name="accessLevel"
              label="Access Level"
              value={formik.values.accessLevel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.accessLevel && Boolean(formik.errors.accessLevel)
              }
            >
              {Object.entries(AccessLevel)
                .filter(([key]) => isNaN(Number(key))) 
                .map(([key, value]) => (
                  <MenuItem key={value} value={value}>
                    {key}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-testid="add-User-button"
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
