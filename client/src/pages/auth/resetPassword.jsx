import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Grid, styled, TextField } from "@mui/material";

// STYLED COMPONENTS
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

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newpassword, setNpassone] = useState();
  const [newpasswordagain, setNpasstwo] = useState();

  const handleFormSubmit = async (newpassword) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newpassword),
        });
        const data = await response.json();
        console.log(data);
        navigate('/login');
      } catch (error) {
        console.error('Error requesting password reset:', error);
        navigate('/resetpassword');
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
              <form onSubmit={handleFormSubmit}>
                <TextField
                  type="newpassword"
                  name="newpassword"
                  size="small"
                  label="New Password"
                  value={newpassword}
                  variant="outlined"
                  onChange={(e) => setNpassone(e.target.value)}
                  sx={{ mb: 3, width: "100%" }}
                />
                <TextField
                  type="newpasswordagain"
                  name="newpasswordagain"
                  size="small"
                  label="Enter New Password Again"
                  value={newpasswordagain}
                  variant="outlined"
                  onChange={(e) => setNpasstwo(e.target.value)}
                  sx={{ mb: 3, width: "100%" }}
                />

                <Button fullWidth variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </StyledRoot>
  );
}
