import {useState} from "react";
import TextFieldCustom from "../utils/TextFieldCustom"
import { styled } from "@mui/material/styles";
import {TextField, Box, Stack, Button, Select, FormControl, MenuItem, InputLabel } from "@mui/material";

const ContactForm = ({formik, onClose,  setFileData, isNewContact}) => {
    const MyCreateButton = styled(Button)(({ theme }) => ({
        padding: "2%",
        paddingLeft: "6%",
        paddingRight: "6%",
        fontWeight: "500",
        color: "#fff",
        backgroundColor: theme.palette.info.main,
        "&:hover": {
          backgroundColor: theme.palette.secondary.light,
        },
      }));
      const MyCloseButton = styled(Button)(({ theme }) => ({
        paddingLeft: "6%",
        paddingRight: "6%",
        fontWeight: "600",
        color: "#fff",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
        },
      }));
// const [fileData, setFileData] = useState()
const [image, setFile] = useState("");
const handleFileChange = ({ target }) => {
  setFileData(target.files[0])
  setFile(target.value)
  console.log(target.files[0])
  formik.values.image = target.value
}
  return (
    <Box
      bgcolor="#FAFBFB"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex={1}
    >
      <Box>
        <Stack component="form" onSubmit={formik.handleSubmit} spacing={2}>
              <TextFieldCustom
                id="name"
                name="name"
                type="text"
                label="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextFieldCustom
                id="description"
                name="description"
                type="text"
                label="Description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
          {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Add Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        //   name="category"
          value={formik.values.category}
          label="Add Category"
          onChange={formik.handleChange}
        >
          <MenuItem value={"Important"}>Important</MenuItem>
          <MenuItem value={"Starred"}>Starred</MenuItem>
        </Select>
      </FormControl> */}
              <TextFieldCustom 
                id="phone"
                name="phone"
                type="text"
                value={formik.values.phone}
                label="Phone"
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
              <TextFieldCustom
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                label="Email"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextFieldCustom
                id="address"
                name="address"
                type="text"
                label="Address"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              <TextFieldCustom
                id="company"
                name="company"
                type="text"
                label="Company"
                onChange={formik.handleChange}
                value={formik.values.company}
              />
              <TextFieldCustom
                id="notes"
                name="notes"
                type="text"
                label="Add Notes"
                onChange={formik.handleChange}
                value={formik.values.notes}
              />
              <TextField
              fullWidth
              isRequired={true}
                focused
                error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={formik.touched.image && formik.errors.image}
                label="Upload Profile Photo"
                id="image"
                name="image"
                type="file"
                accept="image/*"
                value={image}
                onChange={handleFileChange}
                sx={{
                  display: (isNewContact? "block": "none"),
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
            <Stack mt={3} direction= "row" spacing= {1} justifyContent="flex-end">
        <MyCreateButton type="submit">{isNewContact? "Create" : "Update"}</MyCreateButton>
        <MyCloseButton onClick={onClose}>Cancel</MyCloseButton>
        </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ContactForm;