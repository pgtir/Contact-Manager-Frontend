import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Button, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material"
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Stack } from '@mui/system';
import { styled } from "@mui/material/styles";
import { updateContact, updateMany } from '../redux/contactFeatures/contactSlice';

const AddToTag = ({selectedIds, onClose}) => {
  const {myData} = useSelector((state) => state.user)
  let {currentContact, currentTag, currentGroup, isLoading, isError, message} = useSelector(
    (state) => state.contacts
    )
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
     const contactData = { $addToSet: { "tagNames": {$each : [...checkedItems ]} } }
     if(currentContact && selectedIds.includes(currentContact._id)) dispatch(updateContact({id: currentContact._id, contactData}))
     dispatch(updateMany({selectedIds, contactData}))
     onClose();
    }
   }
  return (
    <div>
        <Typography variant="h6" sx={{color: "primary.dark", fontWeight: 500}}>Select Tags :</Typography>
        <List>
        {myData && myData.tags.map((tag => 
        (
            <ListItem key={tag}>
              <ListItemButton >
                <ListItemIcon sx={{color: "secondary.main"}}>
                    <TagOutlinedIcon/>
                </ListItemIcon>
                <ListItemText
                  sx={{ color: "primary.dark" }}
                  primary={tag}
                />
              </ListItemButton>
              <Checkbox
                id={tag}
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

export default AddToTag