import { useSelector } from 'react-redux'
import { Card,Typography,Stack, Box, Button, Modal } from '@mui/material'
import { styled } from "@mui/material/styles";
import Add from "@mui/icons-material/Add";
import * as React from 'react';
import ModalTemplate from './utils/ModalTemplate';
import CreateContact from './CreateContact/CreateContact';


const HomeGreet = () => {
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const MyButton = styled(Button)(({ theme }) => ({
        paddingLeft: "3.8%",
        fontWeight: "500",
        fontSize: "1rem",
        color: "#fff",
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
          backgroundColor: theme.palette.secondary.light,
        },
      }));
    const { user } = useSelector((state) => state.auth.user)
   
  return (
    <Card sx={{
                boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
                borderRadius: "20px",
                padding: "4%",
                height: "100%",
                alignContent: "center",
              }}
            >
              <Stack
                sx={{ height: "100%" }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    color="primary.dark"
                    fontWeight={500}
                    variant="h3"
                    fontSize="1.312rem"
                    marginBottom={1}
                  >
                    Hey, {user && user.name}
                  </Typography>
                  <Typography
                    color="primary.dark"
                    fontWeight={500}
                    variant="h3"
                    fontSize="1.312rem"
                    marginBottom={4}
                  >
                    Hit the Create Button to start managing your contacts
                  </Typography>
                  <Box>
                  <MyButton onClick={handleOpen}>
                    Create
                    <Add sx={{ ml: 1 }}></Add>
                  </MyButton>
                  <ModalTemplate open={open} onClose={handleClose}>
                  <CreateContact isNewContact={true} onClose={handleClose}></CreateContact>
                  </ModalTemplate>
                  </Box>
                </Box>
                <Box sx={{ width: { sm: "25%", md: "15%" } }}>
                  <img
                    src={require("../images/create.svg").default}
                    alt="greeting"
                  ></img>
                </Box>
              </Stack>
            </Card>
  )
}

export default HomeGreet