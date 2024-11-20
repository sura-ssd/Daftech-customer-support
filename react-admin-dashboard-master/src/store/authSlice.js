import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  adminData: null, // New field to store admin data
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.token;
      state.adminData = action.payload.adminData; // Store admin data
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.adminData = null; // Clear admin data on login failure
      state.loading = false;
      state.error = action.payload; // Pass the error message to the state
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.adminData = null; // Clear admin data on logout
      
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const loginUser = (credentials, navigate) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await axios.post('https://localhost:7291/api/AdminLogin', credentials);

    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("isAuthenticated", true);
      dispatch(
        loginSuccess({
          token: response.data.token,
          adminData: {
            profileImage: response.data.profileImage,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phoneNumber: response.data.phoneNumber,
            email: response.data.email,
            role: response.data.role,
          },
        })
      );

      window.history.replaceState(null, null, "/");

      setTimeout(() => {
        localStorage.setItem("isAuthenticated", "false");
        localStorage.removeItem("authToken");

        dispatch(logout());
        navigate('/login');
        
      }, 3 * 60 * 60 * 1000);

      return { payload: response.data.token }; 
    }
  } catch (error) {
    console.error('Login failed:', error);
    dispatch(loginFailure(error.message));
    return { payload: null, error: error.message }; // Return error message
  }
};

export default authSlice.reducer;
