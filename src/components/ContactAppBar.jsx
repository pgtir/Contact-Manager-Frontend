import {Box, Stack, IconButton, Tooltip, Menu, MenuItem, Button} from "@mui/material";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { styled } from "@mui/material/styles";
import { useParams } from 'react-router-dom'
import TagOutlined from "@mui/icons-material/TagOutlined";
import { useSelector, useDispatch } from 'react-redux'
import {deleteContact,updateMany, getAllContacts, loadCurrentContact, updateContact} from "../redux/contactFeatures/contactSlice"
import ModalTemplate from "./utils/ModalTemplate";
import {useState} from 'react'
import AddToGroup from "./AddToGroup";
import AddToTag from "./AddToTag";
import { toast } from "react-toastify"
function ContactAppBar({selectedIds, clicked, setClicked, searchText}) {
  const MyIconButton = styled(IconButton)(({ theme }) => ({
    padding: "6px",
    boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
    fontSize: "3rem",
    color: "#fff",
    borderColor: theme.palette.info.main,
    border: "1.8px solid",
    "&:hover": {
      borderColor: theme.palette.primary.dark,
      border: "1.8px solid",
      color: theme.palette.primary.dark
    },
  }));
  const {pageType} = useParams()
  const [openTag, setOpenTag] = useState(false);
  const handleOpenTag = () => setOpenTag(true);
  const handleCloseTag = () => setOpenTag(false);
  const [openGroup, setOpenGroup] = useState(false);
  const handleOpenGroup = () => setOpenGroup(true);
  const handleCloseGroup = () => setOpenGroup(false);
  let {currentContact, currentTag, currentGroup, isLoading, isError, message} = useSelector(
    (state) => state.contacts
    )
  //Deleting
  const dispatch = useDispatch();
  function handleDelete(){
    if(selectedIds.length > 0) {
      dispatch(deleteContact(selectedIds.join(",")))
    } 
    else toast.error('Please select some contacts to perform this action', {
      position: "top-center",
      });
  }
//starring grouping etc
function handleCategory(contactData) {
  if(selectedIds.length > 0){
    if(currentContact && selectedIds.includes(currentContact._id)) dispatch(updateContact({id: currentContact._id, contactData }))
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
  }   else toast.error('Please select some contacts to perform this action', {
    position: "top-center",
    });
  
}
  return (
    <Box bgcolor="" sx={{
      pl: {xs: 0, sm: 2},
      pb: 2,
      display: {xs: "flex", md: "block"}, justifyContent: "center", alignItems: "center",  maxWidth: `calc(100vw - 24px)`}}>
      <Stack spacing={3}  direction="row"sx={{maxWidth: `calc(100vw - 24px)`, flexWrap: "wrap"}}>
          <Tooltip title="Add to Important">
            <MyIconButton onClick={()=> handleCategory({category: "Important"})} sx= {{backgroundColor: "info.main"}}>
              <PriorityHighIcon sx={{ fontSize:"1.2rem"}}></PriorityHighIcon>
            </MyIconButton>
          </Tooltip>
          <Tooltip title="Add to Starred">
            <MyIconButton onClick={()=> handleCategory({category:"Starred"})} sx= {{
                backgroundColor: "warning.main",
                }}>
              <StarBorderOutlinedIcon  sx={{ fontSize:"1.2rem"}}></StarBorderOutlinedIcon>
            </MyIconButton>
          </Tooltip>
          <Box>
          <Tooltip title="Add Tag">
            <MyIconButton onClick={() => {
              if(selectedIds.length > 0)
              handleOpenTag()
              else toast.error('Please select some contacts to perform this action', {
                position: "top-center",
                });
            }}
             sx= {{backgroundColor: "primary.main"}}>
              <TagOutlined sx={{ fontSize:"1.2rem"}}></TagOutlined>
            </MyIconButton>
          </Tooltip>
          <ModalTemplate open={openTag} onClose={handleCloseTag}>
              <AddToTag searchText={searchText} selectedIds={selectedIds} onClose={handleCloseTag}/>
            </ModalTemplate>
          </Box>
          <Box>
          <Tooltip title="Add To group">
            <MyIconButton onClick={() => {
              if(selectedIds.length > 0)
              handleOpenGroup()
              else toast.error('Please select some contacts to perform this action', {
                position: "top-center",
                });
            }} sx= {{backgroundColor: "success.main"}}>
              <GroupAddOutlinedIcon sx={{ fontSize:"1.2rem"}}></GroupAddOutlinedIcon>
            </MyIconButton>
          </Tooltip>
          <ModalTemplate open={openGroup} onClose={handleCloseGroup}>
              <AddToGroup searchText={searchText} selectedIds={selectedIds} onClose={handleCloseGroup}/>
            </ModalTemplate>
          </Box>
          <Tooltip title="Remove from collection">
            <MyIconButton onClick={()=> handleCategory({category:"General"})} sx= {{backgroundColor: "primary.dark"}} >
              <NotInterestedIcon  sx={{ fontSize:"1.2rem"}}></NotInterestedIcon>
            </MyIconButton>
          </Tooltip>
          <Tooltip  title="Delete">
            <MyIconButton onClick={handleDelete} sx= {{backgroundColor: "secondary.main"}} >
              <DeleteOutlinedIcon sx={{ fontSize:"1.2rem", backgroundColor: ""}}></DeleteOutlinedIcon>
            </MyIconButton>
          </Tooltip>
      </Stack>    
    </Box>
  )
}

export default ContactAppBar