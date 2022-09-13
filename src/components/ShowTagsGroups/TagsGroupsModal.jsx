import { useState } from 'react'
import { Button, Stack, Box, Card, List,ListItem, ListItemText,ListItemIcon, Skeleton, ListItemButton, Typography} from '@mui/material';
import { styled } from "@mui/material/styles";
import AddOutlined from '@mui/icons-material/AddOutlined';
import {useDispatch, useSelector} from 'react-redux'
import { updateMe } from '../../redux/userFeatures/userSlice';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { updateContact } from '../../redux/contactFeatures/contactSlice';
const TagsGroupsModal = ({icon, id, arrayNames, modalFor, onClose}) => {
  const MyButton = styled(Button)(({ theme }) => ({
    padding: "2%",
    paddingLeft: "10%",
    paddingRight: "10%",
    fontWeight: "500",
    color: "#fff",
  }));
  const dispatch = useDispatch();
const {myData, isLoading} = useSelector(
    (state) => state.user
  )
   function handleRemove(name) {
    let contactData;
    if(modalFor === "tags") contactData = { $pull: { "tagNames": name } }
    if(modalFor === "groups") contactData = { $pull: { "groupNames": name } }
    dispatch(updateContact({id, contactData}))
   }
  return (
    <Box>
    <Stack>
        <Typography variant="h6"sx={{color: "primary.dark"}}>
           {arrayNames.length} {modalFor} available
        </Typography>
       <List p={0} sx={{width: {xs: "75vw", md: "30vw"}}}>
       {arrayNames.map((name) => {
          return (
            (isLoading ? <ListItem p={0} key={name} >
              <Skeleton variant='rounded' width={210} height={41}></Skeleton>
            </ListItem> : <ListItem p={0} sx={{paddingLeft: 0, paddingRight: 0, justifyContent: "space-between"}} key={name}>
              <ListItemIcon sx={{color: "info.main"}}>{icon}</ListItemIcon>
              <ListItemText sx={{color: "primary.dark"}} primary={name} />
              <ListItemIcon sx={{color: "secondary.main", display:"flex", justifyContent: "flex-end"}}>
                <RemoveCircleOutlineIcon 
                sx={{cursor: "pointer"}}
                onClick={
                    () =>{
                        handleRemove(name)
                    }
                }
                />
              </ListItemIcon>

            </ListItem>)
          );
        })}
       </List>
    </Stack>
     
    <Stack mt={4} direction="row" justifyContent="space-between" spacing={3}>
    
    <MyButton onClick={onClose} sx={{
        backgroundColor: 'primary.main',
        flexGrow: 1,
        "&:hover": {
          backgroundColor: 'primary.light',
        },
    }}>Close</MyButton>
    </Stack>
    </Box>
  )
}

export default TagsGroupsModal