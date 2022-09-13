import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Logo = () => {
  const navigate = useNavigate()
  return (
    <>
      <Stack onClick={() => {
        if(window.location.pathname !== "/signup" && window.location.pathname !== "/login"){
          navigate("/home")
        }
      }} direction="row" spacing={1} alignItems="center" sx={{
        cursor: 'pointer'
      }}>
        <Box>
          <img alt="logo" src={require("../images/connect.svg").default}></img>
        </Box>
        <Typography
          fontWeight={600}
          variant="h5"
          color="primary.dark"
          gutterBottom
          component="div"
        >
          Linkify
        </Typography>
      </Stack>
    </>
  );
};

export default Logo;
