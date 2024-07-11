export const loginSuccess = (user) => ({
    type: 'LOGIN_USER_SUCCESS',
    payload: user,
  });

  export const logout = () => ({ type: 'LOGOUT' });