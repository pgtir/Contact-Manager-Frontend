import axios from 'axios'

const API_URL = '/api/v1/users/'

//Get User
const getMe = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(API_URL + "me", config)
    return response.data
  }

// Update User
  const updateMe = async (userData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.patch(API_URL + "updateMe", userData, config)
    return response.data
  }

  const userService = {
    getMe,
    updateMe,
  }
  
  export default userService