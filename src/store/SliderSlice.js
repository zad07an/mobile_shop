import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'http://localhost:5000/slider_images';

const initialState = {
  slideData: []
}

export const fetchSliderImages = createAsyncThunk('slider/fetchSliderImages', async () => {
  const response = await axios.get(URL);
  return await response.data;
})

const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    setImages(state, action) {
      state.slideData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliderImages.fulfilled, (state, action) => {
        state.slideData = action.payload;
      })
  }
})

export const {} = sliderSlice.actions;
export default sliderSlice.reducer;