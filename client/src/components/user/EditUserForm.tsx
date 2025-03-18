import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { Formik, Field, Form } from "formik";
import "../../styles/EditUserForm.scss";
import { IUser } from "../../types/user";
import ConfirmLeaveDialog from "../dialogs/ConfirmLeaveDialog";
import { useUpdateUser } from "../../hooks/mutations/useUserMutation";
import { userValidationSchema } from "../../validation/userValidation";
import { getUserById } from "../../services/userServices";
import { BASE_URL } from "../../constants";
import { useRecoilValue } from "recoil";
import { userAccessLevelState } from "../../state/atoms";

const EditUserForm: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFormModified, setIsFormModified] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const userAccessLevel = useRecoilValue(userAccessLevelState);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { mutate: updateUserMutation } = useUpdateUser();

  useEffect(() => {
    const fetchuser = async () => {
      if (id) {
        try {
          const data = await getUserById(id);
          setUser(data);
        } catch (error) {
          console.error(`Error fetching user: ${error}`);
        }
      }
    };

    fetchuser();
  }, [id]);

  const handleEditSubmit = (values: IUser) => {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("phone", values.phone);
    if (selectedImage) {
      formData.append("profileImage", selectedImage);
    } else if (values.profileImage) {
      formData.append("profileImage", values.profileImage);
    }
    formData.append("accessLevel", values.accessLevel.toString());
    updateUserMutation({ id: id ?? "", formData });
    navigate(-1);
  };
  const handleCancel = () => {
    if (isFormModified) {
      setOpenModal(true);
    } else {
      navigate(-1);
    }
  };
  const handleConfirmCancel = () => {
    setOpenModal(false);
    navigate(-1);
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleCloseModal = () => setOpenModal(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setIsFormModified(true);
    }
  };
  return (
    <Container className="edit-user-form">
      <button className="go-back-button" onClick={handleGoBack}>
        ← Go Back
      </button>

      <Typography variant="h4" gutterBottom>
        Edit user
      </Typography>
      {user && (
        <Formik
          initialValues={user}
          validationSchema={userValidationSchema}
          enableReinitialize
          onSubmit={handleEditSubmit}
        >
          {({ values, handleChange, handleBlur, dirty, errors, touched }) => {
            setIsFormModified(dirty || selectedImage !== null);

            return (
              <Form>
                <Field
                  as={TextField}
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  margin="normal"
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <Field
                  as={TextField}
                  label="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  margin="normal"
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <Field
                  as={TextField}
                  label="Phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  margin="normal"
                  placeholder="Flag URL"
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
                <Grid item xs={12}>
                  {user.profileImage && (
                    <div>
                      <Typography variant="body1">Current Image:</Typography>
                      <img
                        src={`${BASE_URL}/uploads/${user.profileImage}`}
                        alt="Current Profile"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Grid>

                {imagePreview && (
                  <Grid item xs={12}>
                    <Typography variant="body1">Selected Image:</Typography>
                    <img
                      src={imagePreview}
                      alt="Selected Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </Grid>
                )}
                {userAccessLevel === 5 && (
                  <Field
                    as={TextField}
                    label="Access Level"
                    name="accessLevel"
                    value={values.accessLevel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    margin="normal"
                    error={touched.accessLevel && Boolean(errors.accessLevel)}
                    helperText={touched.accessLevel && errors.accessLevel}
                  />
                )}
                <div className="buttons-container">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!dirty && !selectedImage}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleCancel}
                    disabled={!dirty && !selectedImage}
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

export default EditUserForm;
