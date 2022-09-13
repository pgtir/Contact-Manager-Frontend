import axios from "axios";
const API_URL = "/api/v1/contacts/";

// Create new contact
const createContact = async (contactData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, contactData, config);
  return response.data;
};

// Get contacts of logged-in user
const getAllContacts = async (searchText, category, tag, group,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
 
  const response = await axios.get(
    API_URL +
      `?search=${searchText ? searchText : ""}&category=${
        category ? category : "General"}${tag? `&tag=${tag}`: ""}${group? `&group=${group}`: ""}`,
    config
  );
  return response.data;
};

// Delete contact
const deleteContact = async (contactId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + contactId, config);
  // const response = await axios.delete(API_URL, config)
  return response.data;
};
// Edit contact
const updateMany = async (selectedIds, contactData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(selectedIds, "heyyservuce")
  console.log(contactData, "heyyservuce")
  const response = await axios.patch(
    API_URL + "updateMany/" + selectedIds,
    contactData,
    config
  );
  console.log(response.data)
  // return response.data
};
// Edit many
const updateContact = async (contactId, contactData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + contactId, contactData, config);
   console.log(response.data);
  return response.data;
};

// Load Current contact
const loadCurrentContact = async (contactId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + contactId, config);
  console.log(response.data)
  return response.data;
};

const contactService = {
  createContact,
  getAllContacts,
  deleteContact,
  updateContact,
  updateMany,
  loadCurrentContact,
};

export default contactService;
