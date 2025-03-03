import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";
import { Formik, Field, Form } from "formik";
import "../styles/EditCountryForm.scss";
import { getCountryById } from "../services/countryService";
import { ICountry } from "../types/country";
import ConfirmLeaveDialog from "./ConfirmLeaveDialog";
import { useUpdateCountry } from "../hooks/mutations/useCountryMutation";
import { countryValidationSchema } from "../validation/countryValidation";
import { useSetRecoilState } from "recoil";
import { selectedCountryState } from "../state/atoms";

const EditCountryForm: React.FC = () => {
  const [country, setCountry] = useState<ICountry | null>(null);
  const [isFormModified, setIsFormModified] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const setSelectedCountryState = useSetRecoilState(selectedCountryState);

  const { mutate: updateCountryMutation } = useUpdateCountry(id);

  useEffect(() => {
    const fetchCountry = async () => {
      if (id) {
        try {
          const data = await getCountryById(id);
          setCountry({
            ...data,
            cities: data.cities,
          });
        } catch (error) {
          console.error(`Error fetching country: ${error}`);
        }
      }
    };

    fetchCountry();
  }, [id]);

  const handleEditSubmit = (country: ICountry) => {
    updateCountryMutation(country);
    setSelectedCountryState(null);
    navigate(-1);
  };
  const handleCancel = () => {
    if (isFormModified) {
      setOpenModal(true);
    } else {
      setSelectedCountryState(null);
      navigate(-1);
    }
  };
  const handleConfirmCancel = () => {
    setOpenModal(false);
    setSelectedCountryState(null);
    navigate(-1);
  };
  const handleGoBack = () => {
    setSelectedCountryState(null);
    navigate(-1);
  };
  const handleCloseModal = () => setOpenModal(false);
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
          validationSchema={countryValidationSchema}
          enableReinitialize
          onSubmit={handleEditSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            isValid,
            dirty,
            errors,
            touched,
          }) => {
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
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
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
                  error={touched.flag && Boolean(errors.flag)}
                  helperText={touched.flag && errors.flag}
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
                  error={touched.population && Boolean(errors.population)}
                  helperText={touched.population && errors.population}
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
                  error={touched.region && Boolean(errors.region)}
                  helperText={touched.region && errors.region}
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
