import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "../styles/EditCountryForm.scss";
import { getCountryById, updateCountry } from "../services/apiService";
import { ICountry } from "../types/country";
import { showErrorToast, showSuccessToast } from "./Toast";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmLeaveDialog from "./ConfirmLeaveDialog";

const EditCountryForm: React.FC = () => {
  const [country, setCountry] = useState<ICountry | null>(null);
  const [isFormModified, setIsFormModified] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
      queryClient.invalidateQueries({ queryKey: ["data"] });
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

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Container className="edit-country-form">
      <button className="go-back-button" onClick={handleGoBack}>
        ← Go Back
      </button>

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
                <div className="buttons-container">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!dirty || !isValid}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleCancel}
                    disabled={!dirty}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}

      <ConfirmLeaveDialog
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCancel}
      />
    </Container>
  );
};

export default EditCountryForm;
