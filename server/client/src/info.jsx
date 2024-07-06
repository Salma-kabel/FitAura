import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Grid, styled, TextField } from "@mui/material";


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

export default function ForgotPassword() {
  const [inputValue, setInputValue] = useState('0');
  const navigate = useNavigate(); 

  const handleFormSubmit = () => {
    console.log(inputValue);
  };
  const handleInputChange = (event) => {
    if (event.target.value >= 0 && event.target.value <= 100) {
      setInputValue(event.target.value);
    }
  };

  const move = () => {
    navigate('/Goal');
  }

  return (
    <StyledRoot>
      <Card className="card">
        <Grid container>
          <Grid item xs={12}>
            <div className="img-wrapper">
              <img width="300" src="/assets/images/illustrations/dreamer.svg" alt="" />
            </div>

            <ContentBox>
              <form onSubmit={handleFormSubmit}>
              <TextField
                  type="gender"
                  name="gender"
                  size="small"
                  label="Gender"
                  placeholder="Enter gender"
                  value={inputValue}
                  variant="outlined"
                  onChange={handleInputChange}
                  sx={{ mb: 3, width: "100%" }}
                />
                <TextField
                  type="age"
                  name="age"
                  size="small"
                  label="Age"
                  value={inputValue}
                  placeholder="Enter Age"
                  variant="outlined"
                  onChange={handleInputChange}
                  sx={{ mb: 3, width: "100%" }}
                />
                <TextField
                  type="weight"
                  name="weight"
                  size="small"
                  label="Weight"
                  placeholder="Enter Weight"
                  value={inputValue}
                  variant="outlined"
                  onChange={handleInputChange}
                  sx={{ mb: 3, width: "100%" }}
                />
                <TextField
                  type="height"
                  name="height"
                  size="small"
                  label="Height"
                  placeholder="Enter Height"
                  value={inputValue}
                  variant="outlined"
                  onChange={handleInputChange}
                  sx={{ mb: 3, width: "100%" }}
                />
                <TextField
                  type="water"
                  name="water"
                  size="small"
                  label="Water Percentage"
                  placeholder="Enter Water Percentage"
                  value={inputValue}
                  variant="outlined"
                  onChange={handleInputChange}
                  sx={{ mb: 3, width: "100%" }}
                />
                <TextField
                  type="fat"
                  name="fat"
                  size="small"
                  label="Fat Percentage"
                  placeholder="Enter Fat Percentage"
                  value={inputValue}
                  variant="outlined"
                  onChange={handleInputChange}
                  sx={{ mb: 3, width: "100%" }}
                />
                <TextField
                  type="muscle"
                  name="muscle"
                  size="small"
                  label="Muscle Percentage"
                  placeholder="Enter Muscle Percentage"
                  value={inputValue}
                  variant="outlined"
                  onChange={handleInputChange}
                  sx={{ mb: 3, width: "100%" }}
                />
                <TextField
                  type="weightGoal"
                  name="weightGoal"
                  size="small"
                  label="Weight Goal"
                  placeholder="Enter Weight Goal"
                  value={inputValue}
                  variant="outlined"
                  onChange={handleInputChange}
                  sx={{ mb: 3, width: "100%" }}
                />
                <TextField
                  type="fat"
                  name="fat"
                  size="small"
                  label="Fat Percentage Goal"
                  placeholder="Enter Fat Percentage Goal"
                  value={inputValue}
                  variant="outlined"
                  onChange={handleInputChange}
                  sx={{ mb: 3, width: "100%" }}
                />
                <TextField
                  type="muscle"
                  name="muscle"
                  size="small"
                  label="Muscle Percentage Goal"
                  placeholder="Enter Muscle Percentage Goal"
                  value={inputValue}
                  variant="outlined"
                  onChange={handleInputChange}
                  sx={{ mb: 3, width: "100%" }}
                />
                <Button fullWidth variant="contained" color="primary" type="submit" onClick={move}>
                  Submit
                </Button>

                <Button
                  fullWidth
                  color="primary"
                  variant="outlined"
                  sx={{ mt: 2 }}>
                  Skip for now
                </Button>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </StyledRoot>
  );
}