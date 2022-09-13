import Layout from "../components/Layout";
import { styled } from "@mui/material/styles";
import HomeGreet from "../components/HomeGreet";
import { Card, Skeleton } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { Box, Stack, Typography, Button } from "@mui/material";
// import { useEffect } from 'react'
import { getMe } from "../redux/userFeatures/userSlice";
import {useEffect} from "react"
import { useSelector } from "react-redux";
// import {getUser, reset} from "../redux/userFeatures/userSlice"
import { useDispatch } from "react-redux";
const Home = () => {
  const dispatch = useDispatch()
  const { myData } = useSelector((state) => state.user)
  useEffect(() => {
   dispatch(getMe())
  }, [dispatch])
    return (
      <Layout dispatch={dispatch}>
        <Stack direction="column" spacing={4} justifyContent="space-between">
          <Box flex={2}>
            <HomeGreet/>
          </Box>
          <Stack
            flex={1}
            direction={{ xs: "column", md: "row" }}
            spacing={4}
          >
            <Box flex={1}>
              <Card
                sx={{
                  backgroundColor: "info.main",
                  color: "#fff",
                  padding: "5%",
                  boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
                  borderRadius: "20px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBottom={4}
                >
                  <Typography sx={{opacity: '80%'}} fontWeight={500} variant="h3" fontSize="1.312rem">
                    Contacts
                  </Typography>
                  <PeopleIcon sx={{opacity: '80%', fontSize: "3rem" }}></PeopleIcon>
                </Stack>
                <Stack spacing={2} direction={{sm: "row"} }justifyContent="space-between" alignItems="center">
                  <Stack justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" fontWeight={700} >Total</Typography>
                  <Typography variant="h6" fontWeight={600}>{myData? myData.contacts_count : ""}</Typography>
                  </Stack>
                  <Stack justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" fontWeight={700} >Important</Typography>
                  <Typography variant="h6" fontWeight={600}>{myData? myData.important_count : ""}</Typography>
                  </Stack>
                  <Stack justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" fontWeight={700} >Starred</Typography>
                  <Typography variant="h6" fontWeight={600}>{myData? myData.starred_count : ""}</Typography>
                  </Stack>
                  
                </Stack>
              </Card>
            </Box>
            <Box flex={1}>
              <Card
                sx={{
                  color: "primary.dark",
                  padding: "5%",
                  boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
                  borderRadius: "20px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBottom={4}
                >
                  <Typography fontWeight={500} color="primary.main" variant="h3" fontSize="1.312rem">
                   Custom
                  </Typography>
                  <DashboardCustomizeIcon
                    sx={{ fontSize: "3rem", color: "info.main" }}
                  ></DashboardCustomizeIcon>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" fontWeight={700} >Total</Typography>
                  <Typography variant="h6" fontWeight={600}>{myData? myData.groups_count + myData.tags_count: ""}</Typography>
                  </Stack>
                  <Stack justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" fontWeight={700} >Tags</Typography>
                  <Typography variant="h6" fontWeight={600}>{myData?  myData.tags_count: ""}</Typography>
                  </Stack>
                  <Stack justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" fontWeight={700} >Groups</Typography>
                  <Typography variant="h6" fontWeight={600}>{myData? myData.groups_count : ""}</Typography>
                  </Stack>
                  
                </Stack>
              </Card>
            </Box>
          </Stack>
        </Stack>
      </Layout>
    );
 
};

export default Home;
