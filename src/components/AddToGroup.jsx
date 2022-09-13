import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {Button, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { getAllContacts, updateContact, updateMany } from '../redux/contactFeatures/contactSlice';

import { Stack } from '@mui/system';
import { styled } from "@mui/material/styles";
const AddToGroup = ({selectedIds, onClose, searchText}) => {
  const {pageType} = useParams()

  let {currentContact, currentTag, currentGroup, isLoading, isError, message} = useSelector(
    (state) => state.contacts
    )
  const {myData} = useSelector((state) => state.user)
  const MyButton = styled(Button)(({ theme }) => ({
    padding: "2%",
    paddingLeft: "10%",
    paddingRight: "10%",
    fontWeight: "500",
    color: "#fff",
  }));

  const checkedItems = [];
  const dispatch = useDispatch();
  function handleCheckbox(e) {
    if (e.target.checked) checkedItems.push(e.target.id);
    else {
      const index = checkedItems.indexOf(e.target.id);
      checkedItems.splice(index, 1);
    }
  }
  function handleAdd() {
   if(checkedItems.length > 0) {
    const contactData = { $addToSet: { "groupNames": {$each : [...checkedItems ]} } }
    if(currentContact && selectedIds.includes(currentContact._id)) dispatch(updateContact({id: currentContact._id, contactData}))
    dispatch(updateMany({selectedIds, contactData}))
    if(pageType === "all")
    dispatch(getAllContacts({searchText, category: "General"}))
    if(pageType === "starred")
    dispatch(getAllContacts({searchText, category: "Starred"}))
    if(pageType === "important")
    dispatch(getAllContacts({searchText, category: "Important"}))
    if(pageType === `${currentTag}`)
    dispatch(getAllContacts({searchText, tag: `${currentTag}`}))
      if(pageType.split("-").join(" ") === `${currentGroup}`){
        dispatch(getAllContacts({searchText, group: `${currentGroup}`}))
      }

    onClose();
   }
  }
  return (
    <div>
        <Typography variant="h6" sx={{color: "primary.dark", fontWeight: 500}}>Select Groups :</Typography>
        <List>
        {myData && myData.groups.map((group => 
        (
            <ListItem key={group}>
              <ListItemButton >
                <ListItemIcon sx={{color: "secondary.main"}}>
                    <GroupsOutlinedIcon/>
                </ListItemIcon>
                <ListItemText
                  sx={{ color: "primary.dark" }}
                  primary={group}
                />
              </ListItemButton>
              <Checkbox
                id={group}
                onClick={handleCheckbox}
                sx={{
                  color: "primary.light",
                  "&.Mui-checked": {
                    color: "info.main",
                  },
                }}
              ></Checkbox>
            </ListItem>
        )
        ))}
        </List>
        <Stack direction="row" justifyContent="space-between" spacing={3}>
        <MyButton onClick={handleAdd} sx={{backgroundColor: 'info.main',
        flexGrow: 1,
        "&:hover": {
         backgroundColor: 'secondary.light',
         },}}>Add <AddOutlinedIcon sx={{marginLeft: "10%"}}/></MyButton>
        <MyButton onClick={onClose} sx={{
            backgroundColor: 'primary.main',
            flexGrow: 1,
            "&:hover": {
              backgroundColor: 'primary.light',
            },
        }}>Cancel</MyButton>
        </Stack>
    </div>
  )
}

export default AddToGroup