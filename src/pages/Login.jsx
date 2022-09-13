import { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {login, reset} from '../redux/authFeatures/authSlice'
import LoginForm from "../components/LoginForm";
import Overview from "../components/Overview";
import { Stack, Box, Skeleton } from "@mui/material";
import * as yup from 'yup';

const Login = () => {
  const INITIAL_FORM_STATE = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email.").required("Email is required"),
    password: yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      ...INITIAL_FORM_STATE
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const userData = {
        email : values.email,
        password : values.password,
      }
      dispatch(login(userData))
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error("There was some error logging you in!");
    }
   
    if (isSuccess) {
      navigate("/home");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  if(isLoading) {
    return (
      <Stack direction="row">
        <Box  sx={{ display: {xs: "none", lg: "block"}, width: "240px", height: "100vh"}}>
          <Box p={3}>
          <Skeleton  mb={1} height={55}></Skeleton>
          </Box>
         <Stack p={3}>
          <Skeleton mb={1} height={40}></Skeleton>
          <Skeleton mb={1} height={40}></Skeleton>
          <Skeleton mb={1} height={40}></Skeleton>
         </Stack>
         <Stack p={3}>
          <Skeleton mb={4} height={55}></Skeleton>
          <Skeleton mb={1} height={40}></Skeleton>
          <Skeleton mb={1} height={40}></Skeleton>
         </Stack>
         <Stack p={3}>
          <Skeleton mb={4} height={55}></Skeleton>
          <Skeleton mb={1} height={40}></Skeleton>
          <Skeleton mb={1} height={40}></Skeleton>
         </Stack>
        </Box>
        <Stack flex={1} width="calc(100vw - 240px)">
        <Box p={4} pb={0} >
          <Stack direction="row" justifyContent="space-between">
            <Skeleton variant='rounded' height={30} width={240}></Skeleton>
            <Skeleton variant='circular' height={30} width={30}></Skeleton>
          </Stack>
        </Box>
        <Box p={4} pt={0}>
          <Stack spacing={3}>
            <Skeleton height={200}/>
            <Stack direction="row" spacing={3}>
            <Skeleton width={1000} height={200}/>
            <Skeleton width={1000} height={200}/>
            </Stack>
          </Stack>
        </Box>
        </Stack>
      </Stack>
    )
  }
  return (
      <Stack
        sx={{ height: "100vh" }}
        direction={{xs: "column", md: "row"}}
        justifyContent="space-between"
      >
        <LoginForm
        formik={formik}
        ></LoginForm> <Overview></Overview>
      </Stack>
  );
};

export default Login;
