import { styled } from "@mui/material/styles";
import {Link as RouterLink} from 'react-router-dom';
import Logo from "../components/logo";
import TextFieldCustom from "./utils/TextFieldCustom"

import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const LoginForm = ({formik}) => {
 
  const MyButton = styled(Button)(({ theme }) => ({
    padding: "2%",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  }));
  
  return (
    <Box p={5}  bgcolor="#FAFBFB" display="flex" justifyContent="center" flex={1}>
      <Stack  direction="column" height="100%"  justifyContent="flex-start" spacing={12}>
        <Logo></Logo>
        <Box>
        <Typography mt={6} variant="h5" fontWeight={600} color="primary.dark">
          Welcome to Linkify
        </Typography>
        <Stack mb={2} direction="row" spacing={1}>
          <Typography variant="subtitle1" fontWeight={300} color="primary.main">
            New Here?
          </Typography>
          <Typography
            component={RouterLink} to ="/signup"
            variant="subtitle1"
            fontWeight={500}
            color="info.main"
            sx={{
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            Create an account
          </Typography>
        </Stack>
        <Stack component='form' onSubmit={formik.handleSubmit} spacing={2}>
          <TextFieldCustom 
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          label="Email"
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}/>
          <TextFieldCustom 
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          label="Password"
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password} />
          <Stack
            // display="flex"
            display="none"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    color: "primary.light",
                    "&.Mui-checked": {
                      color: "info.main",
                    },
                  }}
                />
              }
              label="Remember me"
              sx={{
                color: "primary.dark",
                fontWeight: "600",
              }}
            />
            <Typography
              color="info.main"
              fontWeight={500}
              sx={{
                cursor: "pointer",
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>
          <MyButton type="submit" variant="text">Sign In</MyButton>
        </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default LoginForm;
