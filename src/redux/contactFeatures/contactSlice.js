import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import contactService from './contactService'
import { logout, login } from '../authFeatures/authSlice'
import { toast } from 'react-toastify'

const initialState = {
  contacts: [],
  checkedIds: [],
  currentContact: null,
  currentTag: "",
  currentGroup: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new contact
export const createContact = createAsyncThunk(
    'contacts/create',
    async (contactData, thunkAPI) => {
      console.log("ssli", contactData)
      try {
        const token = thunkAPI.getState().auth.user.token
        return await contactService.createContact(contactData, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
          console.log(error)
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

  //Load Current Contact
  export const loadCurrentContact = createAsyncThunk(
    'contacts/current',
    async(id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await contactService.loadCurrentContact(id, token)
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
// Get All Contacts
export const getAllContacts = createAsyncThunk(
    'contacts/getAll',
    async ({searchText, category, tag, group}, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await contactService.getAllContacts(searchText,category,tag, group,token)
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
// Delete user contact
export const deleteContact = createAsyncThunk(
    'contacts/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await contactService.deleteContact(id, token)
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
// Edit user contact
export const updateContact = createAsyncThunk(
    'contacts/edit',
    async ({id, contactData}, thunkAPI) => {
      console.log("slice", id)
      try {
        const token = thunkAPI.getState().auth.user.token
        return await contactService.updateContact(id, contactData, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
          console.log(message)
        return thunkAPI.rejectWithValue(message)
      }
    }
  )
// Edit user contact
export const updateMany = createAsyncThunk(
    'contacts/editMany',
    async ({selectedIds, contactData}, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await contactService.updateMany(selectedIds, contactData, token)
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

  export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
      reset: (state) => initialState,
      setCurrentGroupAndTag: (state, action) => {
        state.currentTag = (action.payload.tag? action.payload.tag: null)
        state.currentGroup = (action.payload.group? action.payload.group: null)
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(createContact.pending, (state) => {
          state.isLoading = true
          state.isSuccess = false
        })
        .addCase(createContact.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          toast.success("Contact created successfully")
          state.contacts.push(action.payload.contact)
        })
        .addCase(createContact.rejected, (state, action) => {
          state.isLoading = false
          state.isSuccess = false
          state.isError = true
          toast.error('Oops! There was some error creating the contact', {
            position: "top-right",
            });
          state.message = action.payload
        })
        .addCase(getAllContacts.pending, (state) => {
          state.isSuccess = false
          state.isLoading = true
        })
        .addCase(getAllContacts.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.contacts = action.payload.contacts.sort()
        })
        .addCase(getAllContacts.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.isSuccess = false
          toast.error('Oops! There was some error fetching contacts', {
            position: "top-right",
            });
        })
        .addCase(deleteContact.pending, (state) => {
          state.isSuccess = false
          state.isLoading = true
        })
        .addCase(deleteContact.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          toast.success('Successfully Deleted!', {
            position: "top-right",
            });
          if(!state.contacts.includes(state.currentContact)){
          state.currentContact = null
        }
        action.payload.deletedIds.forEach(id => {
          state.contacts = state.contacts.filter(
            (contact) => contact._id !== id
          ) 
        });
        })
        .addCase(deleteContact.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.isSuccess = false
          toast.error('Oops! There was some error deleting the contact', {
            position: "top-right",
            });
        })
        .addCase(loadCurrentContact.pending, (state) => {
          state.isSuccess = false
          state.isLoading = true
        })
        .addCase(loadCurrentContact.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.currentContact = action.payload.contact
        })
        .addCase(logout.fulfilled, (state, action) => {
          state.currentContact = null
        })
        .addCase(loadCurrentContact.rejected, (state, action) => {
          state.isSuccess = false
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          toast.error('Oops! There was some error loading the contact', {
            position: "top-right",
            });
        })
        
        .addCase(updateContact.pending, (state) => {
          state.isSuccess = false
          state.isLoading = true
        })
        .addCase(updateContact.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.currentContact = action.payload.updatedContact
        })
        .addCase(updateContact.rejected, (state, action) => {
          state.isSuccess = false
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          toast.error('Oops! There was some error updaing the contact', {
            position: "top-right",
            });
        })
        .addCase(updateMany.pending, (state) => {
          state.isLoading = true
          state.isSuccess = false
        })
        .addCase(updateMany.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          toast.success('Successfully Updated!', {
            position: "top-right",
            });
        })
        .addCase(updateMany.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.isSuccess = false
          toast.error('Oops! There was some error updating the contacts', {
            position: "top-right",
            });
        })
    },
  })
  
  export const { reset, setCurrentGroupAndTag } = contactSlice.actions
  export default contactSlice.reducer