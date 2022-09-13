import React from 'react'
import { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Stack, TextField } from '@mui/material';
import { styled } from "@mui/material/styles";
import AddOutlined from '@mui/icons-material/AddOutlined';
import {useDispatch} from 'react-redux'
import { getMe, updateMe } from '../../redux/userFeatures/userSlice';
import { useParams } from 'react-router-dom';

const validationSchema = yup.object({
  name: yup
    .string().required('This is a required Field'),
  
});

const AddModal = ({modalFor, onClose}) => {
  const MyButton = styled(Button)(({ theme }) => ({
    padding: "2%",
    paddingLeft: "10%",
    paddingRight: "10%",
    fontWeight: "500",
    color: "#fff",
  }));
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const contactData = { $addToSet: { [modalFor]: values.name } }
      dispatch(updateMe(contactData))
      if(window.location.pathname === "/home") dispatch(getMe())
      onClose();
    },
  });
    
  return (
        <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label={modalFor === "tags"? "Enter tag name": "Enter group name"}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{
            width: {xs: "50vw", sm: "35vw", md: "40vw", lg: "35vw"},
            "& label": {
              color: "primary.main",
            },
            "&:hover label": {
              color: "primary.dark",
            },
            "& label.Mui-focused": {
              color: "info.main",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "primary.light",
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "info.main",
              },
            }, 
          }}
        />
        <Stack mt={4} direction="row" justifyContent="space-between" spacing={3}>
        <MyButton type="submit" sx={{backgroundColor: 'info.main',
        flexGrow: 1,
        "&:hover": {
         backgroundColor: 'secondary.light',
         },}}>Add <AddOutlined sx={{marginLeft: "10%"}}/></MyButton>
        <MyButton onClick={onClose} sx={{
            backgroundColor: 'primary.main',
            flexGrow: 1,
            "&:hover": {
              backgroundColor: 'primary.light',
            },
        }}>Cancel</MyButton>
        </Stack>
      </form>
  )
}

export default AddModal