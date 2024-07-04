import React, { FC } from 'react'
import Box from '@mui/material/Box'
import { StyledButton } from '@/components/styled-button'


const handleLoginClick = () => {
  // Define the action for the Log In button
  window.location.href = '/login';
};

const handleSignupClick = () => {
  // Define the action for the Sign Up button
  window.location.href = '/signup';
};


const AuthNavigation: FC = () => {
  return (
    <Box sx={{ '& button:first-child': { mr: 2 } }}>
      <StyledButton
        disableHoverEffect={true}
        onClick={handleLoginClick}
        variant="outlined"
      >
        Log In
      </StyledButton>
      <StyledButton disableHoverEffect={true} onClick={handleSignupClick}>
        Sign Up
      </StyledButton>
    </Box>
  );
}

export default AuthNavigation