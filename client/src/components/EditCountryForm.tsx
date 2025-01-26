import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "../styles/EditCountryForm.scss";
import { getCountryById, updateCountry } from "../services/apiService";
import { ICountry } from "../types/country";
import { showErrorToast, showSuccessToast } from "./Toast";

const EditCountryForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [country, setCountry] = useState<ICountry | null>(null);
  const [isFormModified, setIsFormModified] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchCountry = async () => {
      if (id) {
        try {
          const data = await getCountryById(id);
          setCountry(data);
        } catch (error) {
          console.error("Error fetching country:", error);
        }
      }
    };

    fetchCountry();
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Country name is required"),
    population: Yup.number()
      .required("Population is required")
      .positive("Population must be a positive number"),
  });

  const handleSubmit = async (values: ICountry) => {
    try {
      await updateCountry(id, values);
      showSuccessToast("Country updated successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to update the country.");
    }
  };

  const handleCancel = () => {
    if (isFormModified) {
      setOpenModal(true);
    } else {
      navigate("/");
    }
  };

  const handleConfirmCancel = () => {
    setOpenModal(false);
    navigate("/");
  };

  const handleCloseModal = () => setOpenModal(false);

  return (
    <Container className="edit-country-form">
      <Typography variant="h4" gutterBottom>
        Edit Country
      </Typography>
      {country && (
        <Formik
          initialValues={country}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, handleChange, handleBlur, isValid, dirty }) => {
            setIsFormModified(dirty);

            return (
              <Form>
                <Field
                  as={TextField}
                  label="Country Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  margin="normal"
                />
                <Field
                  as={TextField}
                  label="Flag"
                  name="flag"
                  value={values.flag}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  margin="normal"
                  placeholder="Flag URL"
                />
                <Field
                  as={TextField}
                  label="Population"
                  name="population"
                  type="number"
                  value={values.population}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  margin="normal"
                />
                <Field
                  as={TextField}
                  label="Region"
                  name="region"
                  value={values.region}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Region"
                  fullWidth
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!dirty || !isValid}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                  disabled={!dirty}
                >
                  Cancel
                </Button>
              </Form>
            );
          }}
        </Formik>
      )}

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="modal-box">
          <Typography variant="h6" gutterBottom>
            Are you sure you want to leave without saving?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmCancel}
          >
            Yes, discard changes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCloseModal}
          >
            No, keep editing
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default EditCountryForm;
