import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import contactService from '../contactFeatures/contactService';
import userService from './userService'
import { updateContact } from '../contactFeatures/contactSlice';
const initialState = {
  myData: null,
  starred_count: 0,
  important_count: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user 
export const getMe = createAsyncThunk(
    'user/getMe',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await userService.getMe(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  );
// Edit user data
export const updateMe = createAsyncThunk(
  'user/edit',
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.updateMe(userData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)  
  
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
    
        .addCase(getMe.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getMe.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.myData = action.payload.user
        })
        .addCase(getMe.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(updateMe.pending, (state) => {
          state.isLoading = true
        })
        .addCase(updateMe.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.myData = action.payload.updatedUser
        })
        .addCase(updateMe.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(updateContact.fulfilled, (state, action) => {
          state.starred_count += 2
        })
    },
  })
  
  export const { reset } = userSlice.actions
  export default userSlice.reducer