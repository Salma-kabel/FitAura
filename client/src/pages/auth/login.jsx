import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, Checkbox, Grid, TextField, Box, styled, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import loginPageImg from './loginPageImg.png';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../userInformation/userActions';
import { Paragraph } from "../../components/Typography";

let canBeLoggedIn = false;

// STYLED COMPONENTS
const FlexBox = styled(Box)(() => ({
  display: "flex"
}));

const ContentBox = styled("div")(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)"
}));

const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },

  ".img-wrapper": {
    height: "100%",
    minWidth: 320,
    display: "flex",
    padding: "2rem",
    alignItems: "center",
    justifyContent: "center"
  }
}));

// initial login credentials
const initialValues = {
  email: "jason@ui-lib.com",
  password: "dummyPass",
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string().email("Invalid Email address").required("Email is required!")
});

let emailValue = '';
let passwordValue = '';

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      emailValue = values.email;
      passwordValue = values.password;

      console.log(`Email: ${emailValue} from FORMIK`);
      console.log(`Password: ${passwordValue} from FORMIK`);

      localStorage.setItem("email", emailValue);
      localStorage.setItem("passwd", passwordValue);

      if (localStorage.getItem("email") && localStorage.getItem("passwd")) {
        canBeLoggedIn = true;
        console.log(canBeLoggedIn)
      }

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const { authorization } = data;
      localStorage.setItem('token', authorization);
      dispatch(loginSuccess(data));
      navigate('/getinformation', { state: { email: 'salma' } });
    } catch (error) {
      setLoading(false);
      console.error('Error in login:', error.message);
      navigate('/login');
    }
  };

  return (
    <StyledRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <div className="img-wrapper">
              <img src={loginPageImg} width="100%" alt="login-page-svg" />
            </div>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <FlexBox justifyContent="space-between">
                      <FlexBox gap={1}>
                        <Checkbox
                          size="small"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{ padding: 0 }}
                        />

                        <Paragraph>Remember Me</Paragraph>
                      </FlexBox>

                      <NavLink
                        to="/forgotpassword"
                        style={{ color: theme.palette.primary.main }}>
                        Forgot password?
                      </NavLink>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      className="login-button"
                      sx={{ my: 2 }}>
                      Login
                    </LoadingButton>

                    <Paragraph>
                      Don't have an account?
                      <NavLink
                        to="/register"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}>
                        Register
                      </NavLink>
                    </Paragraph>
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

export { canBeLoggedIn };
