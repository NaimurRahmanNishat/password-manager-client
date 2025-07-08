/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// User type
interface User {
  _id: string;
  username: string;
  email: string;
  birthdate?: string;
}

// Redux state type
interface AuthState {
  user: User | null;
}

// Utility to load user from localStorage
const loadUserFromLocalStorage = (): AuthState => {
  try {
    const serializedState = localStorage.getItem("user");
    if (serializedState === null) return { user: null };
    return { user: JSON.parse(serializedState) as User };
  } catch (error) {
    return { user: null };
  }
};

// Initial state
const initialState: AuthState = loadUserFromLocalStorage();

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      if (!action.payload.user) {
        console.warn("⚠️ No user payload received");
        return;
      }
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

// Export actions and reducer
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
