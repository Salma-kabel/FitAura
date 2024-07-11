const initialState = { user: null };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER_SUCCESS':
        console.log(action.payload.user);
      return { ...state, user: action.payload.user };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

export default userReducer;