import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'http://localhost:5000/users'

const initialState = {
  users: [],
  userLogged: false
}

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await axios.get(URL);
  return await response.data;
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin(state, action) {
      state.userLogged = true;
    },
    userLogout(state, action) {
      state.userLogged = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
  }
})

export const {userLogin, userLogout} = userSlice.actions;
export default userSlice.reducer;