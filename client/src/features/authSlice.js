import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import api from "../api/axios";

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/auth/register", credentials);
      if (!data.success) throw new Error(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/auth/login", credentials);
      if (!data.success) throw new Error(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// UPDATE PROFILE
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/api/auth/update", body);
      if (!data.success) throw new Error(data.message);
      return data.userData;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const storedUser = JSON.parse(localStorage.getItem("user"));
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    authUser: storedUser || null,
    isAdmin: storedUser?.isAdmin || false,
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.token = null;
      state.authUser = null;
      state.isAdmin = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.success("Logged out successfully");
    },
  },

  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.authUser = action.payload.userData;
        state.isAdmin = action.payload.userData.isAdmin;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.userData)
        );
        state.error = null;
        toast.success(action.payload.message);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.authUser = action.payload.userData;
        state.isAdmin = action.payload.userData.isAdmin;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.userData)
        );

        toast.success(action.payload.message);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
      })

      // UPDATE PROFILE
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.authUser = action.payload;
        toast.success("Profile updated Successfully");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
