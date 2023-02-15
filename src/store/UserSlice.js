import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  userLogged: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin(state, action) {
      state.userLogged = true
      console.log(state.userLogged);
    },
    userLogout(state, action) {
      state.userLogged = false
      console.log(state.userLogged);
    }
  }
})

export const {userLogin, userLogout} = userSlice.actions;
export default userSlice.reducer;