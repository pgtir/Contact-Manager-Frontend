import React from "react";
import TextFieldCustom from "./utils/TextFieldCustom"
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Stack, Typography, Button } from "@mui/material";

const SignupForm = ({formik}) => {
  const MyButton = styled(Button)(({ theme }) => ({
    padding: "2%",
    fontWeight: "500",
    color: "#fff",
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  }));

  return (
    <Box
      bgcolor="#FAFBFB"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex={1}
    >
      <Box>
        <Typography variant="h5" fontWeight={600} color="primary.dark">
          Welcome to Linkify
        </Typography>
        <Stack mb={2} direction="row" spacing={1}>
          <Typography variant="subtitle1" fontWeight={300} color="primary.main">
            Already have an Account?
          </Typography>
          <Typography
            component={RouterLink}
            to="/login"
            variant="subtitle1"
            fontWeight={500}
            color="info.main"
            sx={{ cursor: "pointer", textDecoration: "none" }}
          >
            Sign In
          </Typography>
        </Stack>
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
                sx={{
                  // width: "30rem",
                  "& label": {
                    color: "primary.main",
                  },
                  "&:hover label": {
                    color: "primary.dark",
                  },
                  "& label.Mui-focused": {
                    color: "secondary.main",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "primary.light",
                    },
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "secondary.main",
                    },
                  }, 
                }}
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
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                label="Password"
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextFieldCustom
                id="password_confirm"
                name="password_confirm"
                type="password"
                value={formik.values.password_confirm}
                label="Confirm Password"
                onChange={formik.handleChange}
                error={formik.touched.password_confirm && Boolean(formik.errors.password_confirm)}
                helperText={formik.touched.password_confirm && formik.errors.password_confirm}
              />
              <MyButton type="submit" variant="text">
                Sign Up
              </MyButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignupForm;
