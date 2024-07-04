// client/src/app/contexts/JWTAuthContext.js
import { createContext, useEffect, useReducer } from "react";
import axios from "../../axios";
import { MatxLoading } from "app/components";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialized: true, user };
    }
    case "LOGIN": {
      return { ...state, isAuthenticated: true, user: action.payload.user };
    }
    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null };
    }
    case "REGISTER": {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }
    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("token", token);

      dispatch({ type: "LOGIN", payload: { user } });
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const register = async (email, username, password) => {
    try {
      const response = await axios.post("/auth/register", { email, username, password });
      const { user, token } = response.data;

      localStorage.setItem("token", token);

      dispatch({ type: "REGISTER", payload: { user } });
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const { data } = await axios.get("/auth/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch({ type: "INIT", payload: { isAuthenticated: true, user: data.user } });
        } else {
          dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
      }
    })();
  }, []);

  if (!state.isInitialized) return <MatxLoading />;

  return (
    <AuthContext.Provider value={{ ...state, method: "JWT", login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
