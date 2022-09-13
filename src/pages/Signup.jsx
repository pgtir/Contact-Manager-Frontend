import { useFormik } from 'formik';
import * as yup from 'yup';
import SignupForm from '../components/SignupForm'
import Overview from '../components/Overview'
import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import Logo from '../components/logo'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, reset } from "../redux/authFeatures/authSlice"
import { toast } from "react-toastify";
import {  useEffect } from "react";

const Signup = () => {
  const INITIAL_FORM_STATE = {
    name: "",
    email: "",
    password: "",
    password_confirm: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email.").required("Email is required"),
    password: yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    password_confirm: yup.string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm password!"),
  });

  const formik = useFormik({
    initialValues: {
      ...INITIAL_FORM_STATE
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      const userData = {
        name : values.name,
        email : values.email,
        password : values.password,
        password_confirm : values.password_confirm,
      }
      dispatch(signup(userData))
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/home");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  return (
    <>
      <Box mb={5} sx={{display: "flex", flexDirection: {xs: "column", md: "row"}, height: "100vh"}}  justifyContent="space-between">
      <Stack flex={1} height="100%" direction='column'>
        <Box ml={8} mt={5}>
       <Logo></Logo>
        </Box>
       <Overview></Overview>
      </Stack>
      <SignupForm 
      formik={formik}
      >
      </SignupForm>
      </Box>
    </>
  )
}

export default Signup