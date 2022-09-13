import React from 'react'
import { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Stack, TextField } from '@mui/material';
import { styled } from "@mui/material/styles";
import FileUploadIcon from '@mui/icons-material/FileUpload';import {useDispatch} from 'react-redux'
import { updateMe } from '../../redux/userFeatures/userSlice';
import { updateContact } from '../../redux/contactFeatures/contactSlice';

//Vaidation schema
const validationSchema = yup.object({
  image: yup
    .mixed().required('Please choose a file to upload!'),
  
});
// ------------COMPONENT DEF---------------
const UploadModal = ({modalFor, onClose, id}) => {
  const MyButton = styled(Button)(({ theme }) => ({
    padding: "2%",
    paddingLeft: "10%",
    paddingRight: "10%",
    fontWeight: "500",
    color: "#fff",
  }));
  const dispatch = useDispatch();
  const [fileData, setFileData] = useState("")
  const [image, setFile] = useState("");


  const formik = useFormik({
    initialValues: {
      image: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if(modalFor === 'contact') {
        const contactData = new FormData();
        contactData.append("image", fileData);
        // console.log(id, contactData)
        dispatch(updateContact({id, contactData}))
      }
      onClose();
    },
  });
    
  const handleFileChange = ({ target }) => {
    setFileData(target.files[0])
    setFile(target.value)
    console.log(target.files[0])
    formik.values.image = target.value
  }
  return (
        <form onSubmit={formik.handleSubmit}>
        <TextField
                focused
                label="Upload Profile Photo"
                id="image"
                name="image"
                type="file"
                accept="image/*"
                value={image}
                onChange={handleFileChange}
                error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={formik.touched.image && formik.errors.image}
                sx={{
                  "& label.Mui-focused": {
                    color: "primary.main",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.light",
                    },
                  }, 
                }}
              ></TextField>
        <Stack mt={4} direction="row" justifyContent="space-between" spacing={3}>
        <MyButton type="submit" sx={{backgroundColor: 'info.main',
        flexGrow: 1,
        "&:hover": {
         backgroundColor: 'secondary.light',
         },}}>Upload <FileUploadIcon sx={{marginLeft: "10%"}}/></MyButton>
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

export default UploadModal