import { useState } from 'react';
import AnnouncementIcon from "@mui/icons-material/Announcement";
import {
  Stack,
  Drawer,
  Typography,
  Checkbox,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  Box,
  ListItemText,
  ListItemAvatar,
  Skeleton,
  Button,
  IconButton,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector} from "react-redux";
import {
  getAllContacts,
  loadCurrentContact,
  reset,
} from "../redux/contactFeatures/contactSlice";
import { useParams } from "react-router-dom";
import ContactDetails from "./ContactDetails";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
function ContactList({ selectedIds, dispatch, pageType, searchText}) {
  const [open, setOpen] = useState(false);
  selectedIds.splice(0, selectedIds.length);
  let { contacts, isLoading, isError, message } = useSelector(
    (state) => state.contacts
  );

  const toggleDrawer = (open) => (event) => {
    setOpen(open);
  };

  const handleCurrentContact = (id) => {
    dispatch(loadCurrentContact(id));
  };

  const skelCount = [1, 2, 3, 4, 5, 6, 7, 8];
  if (isLoading) {
    return (
      <Box p={2}>
        {skelCount.map((skel) => {
          return (
            <Stack
              key={skel}
              mb={1}
              direction="row"
              width="100%"
              alignItems="center"
              spacing={2}
            >
              <Skeleton variant="circular" width={50} height={50} />
              <Skeleton
                variant="text"
                flex={1}
                width="85%"
                sx={{ fontSize: "2.3rem" }}
              />
            </Stack>
          );
        })}
      </Box>
    );
  }

  function handleCheckbox(e) {
    console.log(e.target.checked)
    if (e.target.checked) {
      selectedIds.push(e.target.id);
      console.log(selectedIds)
    }
    else {
      const index = selectedIds.indexOf(e.target.id);
      console.log(index)
      selectedIds.splice(index, 1);
    }
  }
  
  return (
    <Box height="100%">
      {contacts.length > 0 ? (
        <List>
          {contacts.map((contact) => (
            <Box  sx={{display: "flex", pr: {xs: 2, md: 0}}}>
            <ListItem onClick={toggleDrawer(true)} key={contact._id}>
              <ListItemButton onClick={() => {
                handleCurrentContact(contact._id)
              }}>
                <ListItemAvatar>
                {
              (contact.image && contact.image.length ? (
                <Box component="img" sx={{objectFit: "cover", width: '3rem', height: "3rem", borderRadius: "50%", border: "1px solid", borderColor: "secondary.main"}} alt="prrofile-pic" src={contact.image}></Box>
              ) : (<Avatar sx={{width: '3rem', height: "3rem"}}></Avatar>
              ))
             }
                </ListItemAvatar>
                <ListItemText
                  sx={{ color: "primary.dark" }}
                  primary={contact.name}
                />
              </ListItemButton>
              
            </ListItem>
            <Checkbox
                id={contact._id}
                onClick={handleCheckbox}
                sx={{
                  color: "primary.light",
                  "&.Mui-checked": {
                    color: "info.main",
                  },
                }}
              ></Checkbox>
            </Box>
          ))}{" "}
        </List>
      ) : (
        <Box p={3} pr={0} height="100%">
          <Stack
            height="100%"
            justifyContent="center"
            alignItems="center"
            sx={{
              border: "1px solid",
              borderColor: "primary.light",
              borderRadius: "20px",
              height: "100%",
            }}
          >
            <AnnouncementIcon
              sx={{ fontSize: "3.4rem", color: "primary.light" }}
            />
            <Typography
              variant="h6"
              sx={{ fontSize: "1.36rem", color: "primary.light" }}
            >
              No Contacts Here
            </Typography>
          </Stack>
        </Box>
      )}
         <Drawer
            BackdropProps={{
  sx: {
    backgroundColor: {xs: "rgba(0, 0, 0, 0.4)", md: "transparent"},
  }
}}            variant="temporary"
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            anchor={"right"}
            open={open}
            onClose={toggleDrawer(false)}
          >
            {<Box sx={{width: {xs: "100vw", sm: "82vw"}, display: {md: "none"}}}>
            <IconButton onClick={toggleDrawer(false)} sx={{color: "secondary.main", margin: "24px", }}>
              <ArrowBackRoundedIcon sx={{fontSize: "1.85rem" }}/>
            </IconButton>
            <ContactDetails
              dispatch={dispatch}
             pageType={pageType}
             searchText={searchText}
            >
            </ContactDetails>
            </Box>}
          </Drawer>
    </Box>
  );
}

export default ContactList;
