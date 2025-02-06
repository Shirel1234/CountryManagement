import React from "react";
import { Button, TextField, Grid, Container, Typography } from "@mui/material";
import { Formik, Field, Form } from "formik";
import "../styles/SignUp.scss";
import { userValidationSchema } from "../validation/userValidation";
import { IUser } from "../types/user";
import { useAddUser } from "../hooks/useUserMutation";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const { mutate: addUserMutation } = useAddUser();
  const navigate = useNavigate();

  const handleAddUser = (newUser: Omit<IUser, "_id" | "accessLevel">) => {
    addUserMutation(newUser);
    navigate("/");
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className="sign-up-form">
        <Typography variant="h5" align="center" className="form-title">
          Sign Up
        </Typography>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            phone: "",
            profileImage: "",
            password: "",
          }}
          validationSchema={userValidationSchema}
          onSubmit={handleAddUser}
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="phone"
                    label="Phone"
                    type="tel"
                    variant="outlined"
                    fullWidth
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="profileImage"
                    label="Profile Image URL"
                    type="url"
                    variant="outlined"
                    fullWidth
                    error={touched.profileImage && Boolean(errors.profileImage)}
                    helperText={touched.profileImage && errors.profileImage}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>

                <Grid item xs={12} className="submit-btn">
                  <Button type="submit" fullWidth variant="contained">
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default SignUp;
