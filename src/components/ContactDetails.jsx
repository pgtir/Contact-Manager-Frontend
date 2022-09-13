import { Box, Avatar, Typography, Stack,  Badge, Divider, Button, Tooltip } from "@mui/material"
import GroupsIcon from '@mui/icons-material/Groups';
import TagOutlined from "@mui/icons-material/TagOutlined";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Star from '@mui/icons-material/Star';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Error from '@mui/icons-material/Error';
import { List, ListItem, ListItemIcon, ListItemText, Skeleton} from "@mui/material"
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotesIcon from '@mui/icons-material/Notes';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { styled } from "@mui/material/styles";
import { useState, useEffect } from 'react'
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import { useSelector } from 'react-redux'
import {deleteContact, updateContact, getAllContacts, loadCurrentContact} from "../redux/contactFeatures/contactSlice"
import ModalTemplate from "./utils/ModalTemplate";
import CreateContact from "./CreateContact/CreateContact";
import TagsGroupsModal from "./ShowTagsGroups/TagsGroupsModal";
import UploadModal from "./SetPhoto/UploadModal";


function ContactDetails({dispatch, pageType, searchText}) {
  const MyDeleteButton = styled(Button)(({ theme }) => ({
    fontWeight: "600",
    color: "#fff",
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  }));

  const MyEditButton = styled(Button)(({ theme }) => ({
    fontWeight: "600",
    color: "#fff",
    backgroundColor: theme.palette.info.main,
    "&:hover": {
      backgroundColor: theme.palette.success.main,

    },
  }));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openTag, setOpenTag] = useState(false);
  const handleOpenTag = () => setOpenTag(true);
  const handleCloseTag = () => setOpenTag(false);
  const [openGroup, setOpenGroup] = useState(false);
  const handleOpenGroup = () => setOpenGroup(true);
  const handleCloseGroup = () => setOpenGroup(false);
  const [openImg, setOpenImg] = useState(false);
  const handleOpenImg = () => setOpenImg(true);
  const handleCloseImg = () => setOpenImg(false);

  const {currentContact, isLoading} = useSelector(
    (state) => state.contacts
  )
 
  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id))
    }
  const handleCategory = (id, contactData) => {
    dispatch(updateContact({id, contactData}))
    if(pageType === "starred")
    dispatch(getAllContacts({searchText, category: "Starred"}))
    if(pageType === "important")
    dispatch(getAllContacts({searchText, category: "Important"}))
    }
if(!currentContact) {
  return (
    <Box p={3} height="100%">
    <Stack  height="100%" justifyContent="center" alignItems="center" sx={{
      border: "1px solid",
      borderColor: "info.main",
      borderRadius:"20px"
    }}>
     <HighlightAltIcon sx={{fontSize: "3.4rem", color: "secondary.main"}}/>
     <Typography variant="h6" sx={{fontSize: "1.36rem", color: "primary.light"}}>
      Click on any contact to view its details
     </Typography>
    </Stack>
    </Box>
  )
}


  if (isLoading) {
    return (
     <Box p={3}  height="100%">
      <Stack mb={2} direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Stack width="50%"  direction="row" alignItems="center"  spacing={2}>
            <Skeleton variant="circular" sx={{width: '6rem', height: "6rem"}}/>
              <Box flex={1}>
                  <Skeleton variant="text" sx={{ fontSize: '1.3rem',  width: "45%"  }}/>
                  <Skeleton variant="text" sx={{ fontSize: '1.3rem', width: "36%" }}/>
              </Box>
          </Stack>
          <Stack spacing={2} direction="row">
          <Skeleton variant="rounded" width={25} height={25}/>
          <Skeleton variant="rounded" width={25} height={25}/>
          </Stack>
          </Stack>
          <Divider/>
          <Box mt={2}>
          <Stack spacing={2}>
          <Skeleton variant="rounded" sx={{width: "60%", height: "2.2rem"}}/>
          <Skeleton variant="rounded" sx={{width: "60%", height: "2.2rem"}}/>
          <Skeleton variant="rounded" sx={{width: "60%", height: "2.2rem"}}/>
          <Skeleton variant="rounded" sx={{width: "60%", height: "2.2rem"}}/>
          <Skeleton variant="rounded" sx={{width: "60%", height: "2.2rem"}}/>
          </Stack>
          <Stack mt={3} direction= "row" spacing= {1} justifyContent="flex-end">
          <Skeleton variant="rounded" sx={{width: "10%", height: "2.3rem"}}/>
          <Skeleton variant="rounded" sx={{width: "10%", height: "2.3rem"}}/>
          </Stack>
          </Box>
     </Box>
    )
  }
  return (
    <Box p={3} height="100%">
       <Box>
          <Stack mb={2} direction= {{xs: "column", sm: "row"}} alignItems="center" justifyContent="space-between" spacing={2}>
          <Stack direction="row" alignItems="center"  spacing={2}>
            <Box onClick={handleOpenImg} sx={{
              width: '6rem', cursor: "pointer",
               height: "6rem", borderRadius: "50%", overflow: "hidden"}}>
             {
              (currentContact.image && currentContact.image.length ? (
                <Box component="img" sx={{objectFit: "cover", width: '6rem', height: "6rem", borderRadius: "50%", border: "1px solid", borderColor: "info.main"}} alt="prrofile-pic" src={currentContact.image}></Box>
              ) : (<Avatar sx={{width: '6rem', height: "6rem"}}></Avatar>
              ))
             }
            </Box>
            <ModalTemplate open={openImg} onClose={handleCloseImg}>
          <UploadModal id={currentContact._id}  onClose={handleCloseImg}  modalFor={"contact"} ></UploadModal>
         </ModalTemplate>
              <Box>
                  <Stack direction="row" spacing={3}>
                  <Typography variant="h3" fontSize="1.2rem" fontWeight={500} color="primary.dark">{currentContact ? currentContact.name : " Miss ABCD Goel"}</Typography>
                  <Stack direction="row" spacing={1}>
                  {currentContact && currentContact.category === "Starred"? (
                    <Tooltip title="Remove from Starred">
                    <Star onClick={() => handleCategory(currentContact._id, {category: "General"})} sx={{cursor: "pointer", color: "success.main"}}/>
                   </Tooltip>
                  ) : (
                    <Tooltip title="Mark as Starred">
                    <StarOutlineIcon onClick={() => handleCategory(currentContact._id, {category: "Starred"})} sx={{cursor: "pointer", color: "success.main"}}/>
                   </Tooltip>
                  )}
                  {currentContact && currentContact.category === "Important"? (
                    <Tooltip title="Remove from Important">
                    <Error onClick={() => handleCategory(currentContact._id, {category: "General"})} sx={{cursor: "pointer", color:"primary.light"}}/>
                   </Tooltip>
                  ) : (
                    <Tooltip title="Mark as Important">
                   <ErrorOutlineIcon onClick={() => handleCategory(currentContact._id, {category: "Important"})} sx={{cursor: "pointer", color:"primary.light"}}/>
                  </Tooltip>
                  )}
                  </Stack>
                  </Stack>
                  <Typography variant="subtitle1" fontWeight={500}  color="primary.main">{currentContact ? (currentContact.description ? currentContact.description   : "") : ""}</Typography>
              </Box>
          </Stack>
          <Stack spacing={2} direction="row" sx={{justifyContent: {xs: "flex-end"}, width: {xs: "100%", sm: "auto"}}}>
            <Box onClick={handleOpenGroup} sx={{cursor: "pointer"}}>
          <Badge badgeContent={currentContact.groupNames.length ? currentContact.groupNames.length : 0} showZero  sx={{
      "& .MuiBadge-badge": {
        color: "#fff",
        backgroundColor: "secondary.main"
      }
    }}>
         <GroupsIcon sx={{color: "primary.main"}} />
         </Badge>
            </Box>
         <ModalTemplate open={openGroup} onClose={handleCloseGroup}>
          <TagsGroupsModal id={currentContact._id} icon={<GroupsIcon/>} onClose={handleCloseGroup}  arrayNames={currentContact.groupNames} modalFor={"groups"} ></TagsGroupsModal>
         </ModalTemplate>
            <Box onClick={handleOpenTag} sx={{cursor: "pointer"}}>
          <Badge badgeContent={currentContact.tagNames.length ? currentContact.tagNames.length : 0} showZero sx={{
      "& .MuiBadge-badge": {
        color: "#fff",
        backgroundColor: "info.main",
      }
    }}>
         <TagOutlined sx={{color: "primary.main"}} />
         </Badge>
            </Box>
         <ModalTemplate open={openTag} onClose={handleCloseTag} >
         <TagsGroupsModal id={currentContact._id} icon={<TagOutlined/>}  arrayNames={currentContact.tagNames} modalFor={"tags"} onClose={handleCloseTag}></TagsGroupsModal>
         </ModalTemplate>
          </Stack>
          </Stack>
          <Divider/>
          <Box sx={{display: 'flex', flexDirection: "column"}}>
          <List >
          <ListItem>
              <ListItemIcon sx={{color:"primary.main"}}>
                  <PhoneIcon></PhoneIcon>
              </ListItemIcon>
              <ListItemText
          disableTypography
          primary={<Typography style={{ color: 'primary.dark', fontWeight: "500" }}>Phone :</Typography>}
        />            <Box color="primary.main" flex={15}>{currentContact ? currentContact.phone : " 98745903765"}</Box>
          </ListItem>
          <ListItem>
              <ListItemIcon sx={{color:"primary.main"}}>
                  <EmailIcon></EmailIcon>
              </ListItemIcon>
              <ListItemText
          disableTypography
          primary={<Typography style={{ color: 'primary.dark', fontWeight: "500" }}>Email :</Typography>}
        />            <Box color="primary.main" flex={15}>{currentContact ? currentContact.email : "mi@gmail.com"}</Box>
          </ListItem>
          <ListItem>
              <ListItemIcon sx={{color:"primary.main"}}>
                  <LocationOnIcon></LocationOnIcon>
              </ListItemIcon>
              <ListItemText
          disableTypography
          primary={<Typography style={{ color: 'primary.dark', fontWeight: "500" }}>Address :</Typography>}
        />            <Box color="primary.main" flex={15}>{currentContact ? (currentContact.address ? currentContact.address   : "Add Field by hitting the edit button") : "Add Field by hitting the edit button"}</Box>
          </ListItem>
   
          <ListItem>
              <ListItemIcon sx={{color:"primary.main"}}>
                  <CorporateFareIcon sx={{color: "primary.main"}}></CorporateFareIcon>
              </ListItemIcon>
              <ListItemText
          disableTypography
          primary={<Typography style={{ color: 'primary.dark', fontWeight: "500" }}>Company :</Typography>}
        />            <Box color="primary.main" flex={15}>{currentContact ? (currentContact.company ? currentContact.company   : "Add Field by hitting the edit button") : "Add Field by hitting the edit button"}</Box>
          </ListItem>
          <ListItem>
              <ListItemIcon sx={{color:"primary.main"}}>
                  <NotesIcon sx={{color: "primary.main"}}></NotesIcon>
              </ListItemIcon>
              <ListItemText
          disableTypography
          primary={<Typography style={{ color: 'primary.dark', fontWeight: "500" }}>Notes :</Typography>}
        />            <Box color="primary.main" flex={15}>{currentContact ? (currentContact.notes ? currentContact.notes   : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam eveniet autem rem.") : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam eveniet autem rem."}</Box>
          </ListItem>
          </List>
          <Stack mt={3} direction= "row" spacing= {1} justifyContent="flex-end">
          <MyEditButton onClick={handleOpen}>Edit</MyEditButton>
          <ModalTemplate open={open} onClose={handleClose}>
          <CreateContact isNewContact={false} onClose={handleClose}></CreateContact>
          </ModalTemplate>
          <MyDeleteButton onClick={() => handleDeleteContact(currentContact._id)}>Delete</MyDeleteButton>
          </Stack>
          </Box>
        </Box>
    </Box>
  )
}

export default ContactDetails