import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import { Button, Card, Grid, styled, TextField } from "@mui/material";
import { useSelector } from 'react-redux';

const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  minHeight: "100vh !important",

  "& .card": {
    maxWidth: 800,
    margin: "1rem",
    borderRadius: 12
  },

  ".img-wrapper": {
    display: "flex",
    padding: "2rem",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const ContentBox = styled("div")(({ theme }) => ({
  padding: 32,
  background: theme.palette.background.default
}));

const initialValues = {
  gender: "",
  age: "",
  weight: "",
  height: "",
  waterpercent: "",
  bodyFatPercent: "",
  muscleMassPercent: "",
  goalWeight: "",
  goalBodyFatPercent: "",
  goalMuscleMassPercent:"",
  remember: true
};

export default function GetInformation() {
  const [inputValue, setInputValue] = useState('0');
  const user = useSelector((state) => state.user);
  const navigate = useNavigate(); 

  const handleFormSubmit = async (values) => {
    try {
      const id = user.id;
      values.id = id;
      const response = await fetch('http://localhost:5000/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        navigate('/api/dashboard');
      } catch (error) {
        console.error('Error updating information:', error);
      }
  };
  const handleInputChange = (event) => {
    if (event.target.value >= 0 && event.target.value <= 100) {
      setInputValue(event.target.value);
    }
  };
  
  return (
    <StyledRoot>
      <Card className="card">
        <Grid container>
          <Grid item xs={12}>
            <div className="img-wrapper">
              <img width="300" src="/assets/images/illustrations/dreamer.svg" alt="" />
            </div>

            <ContentBox>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      type="text"
                      name="gender"
                      size="small"
                      label="Gender"
                      placeholder="Enter gender"
                      value={values.gender}
                      variant="outlined"
                      onChange={handleChange}
                      sx={{ mb: 3, width: "100%" }}
                    />
                    <TextField
                      type="number"
                      name="age"
                      size="small"
                      label="Age"
                      value={values.age}
                      placeholder="Enter Age"
                      variant="outlined"
                      onChange={handleChange}
                      sx={{ mb: 3, width: "100%" }}
                    />
                    <TextField
                      type="number"
                      name="weight"
                      size="small"
                      label="Weight"
                      placeholder="Enter Weight"
                      value={values.weight}
                      variant="outlined"
                      onChange={handleChange}
                      sx={{ mb: 3, width: "100%" }}
                    />
                    <TextField
                      type="number"
                      name="height"
                      size="small"
                      label="Height"
                      placeholder="Enter Height"
                      value={values.height}
                      variant="outlined"
                      onChange={handleChange}
                      sx={{ mb: 3, width: "100%" }}
                    />
                    <TextField
                      type="number"
                      name="waterpercent"
                      size="small"
                      label="Water Percentage"
                      placeholder="Enter Water Percentage"
                      value={values.waterpercent}
                      variant="outlined"
                      onChange={handleChange}
                      sx={{ mb: 3, width: "100%" }}
                    />
                    <TextField
                      type="number"
                      name="bodyFatPercent"
                      size="small"
                      label="Fat Percentage"
                      placeholder="Enter Fat Percentage"
                      value={values.bodyFatPercent}
                      variant="outlined"
                      onChange={handleChange}
                      sx={{ mb: 3, width: "100%" }}
                    />
                    <TextField
                      type="number"
                      name="muscleMassPercent"
                      size="small"
                      label="Muscle Percentage"
                      placeholder="Enter Muscle Percentage"
                      value={values.muscleMassPercent}
                      variant="outlined"
                      onChange={handleChange}
                      sx={{ mb: 3, width: "100%" }}
                    />
                    <TextField
                      type="number"
                      name="goalWeight"
                      size="small"
                      label="Weight Goal"
                      placeholder="Enter Weight Goal"
                      value={values.goalWeight}
                      variant="outlined"
                      onChange={handleChange}
                      sx={{ mb: 3, width: "100%" }}
                    />
                    <TextField
                      type="number"
                      name="goalBodyFatPercent"
                      size="small"
                      label="Fat Percentage Goal"
                      placeholder="Enter Fat Percentage Goal"
                      value={values.goalBodyFatPercent}
                      variant="outlined"
                      onChange={handleChange}
                      sx={{ mb: 3, width: "100%" }}
                    />
                    <TextField
                      type="number"
                      name="goalMuscleMassPercent"
                      size="small"
                      label="Muscle Percentage Goal"
                      placeholder="Enter Muscle Percentage Goal"
                      value={values.goalMuscleMassPercent}
                      variant="outlined"
                      onChange={handleChange}
                      sx={{ mb: 3, width: "100%" }}
                    />
                    <Button fullWidth variant="contained" color="primary" type="submit">
                      Submit
                    </Button>

                    <Button
                      fullWidth
                      color="primary"
                      variant="outlined"
                      onClick={() => navigate('/api/dashboard')}
                      sx={{ mt: 2 }}>
                      Skip for now
                    </Button>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </StyledRoot>
  );
}