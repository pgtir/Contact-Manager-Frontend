import * as React from 'react';
import Logo from "./logo"
import TopBar from "./TopBar"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BrowseGalleryOutlinedIcon from '@mui/icons-material/BrowseGalleryOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import {Box, Toolbar, AppBar, CssBaseline, Drawer, IconButton, Skeleton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { setCurrentGroupAndTag } from '../redux/contactFeatures/contactSlice';
import { useDispatch, useSelector } from 'react-redux';
import ModalTemplate from "./utils/ModalTemplate";
import {useState} from 'react'
import AddModal from './AddTagGroup/AddModal';
const drawerWidth = 240;

const Layout = (props) => {
  let navigate = useNavigate();
  const { window, setSearchText, searchText, dispatch } = props;

  const {myData, isLoading} = useSelector(
    (state) => state.user
  )
  const [openTag, setOpenTag] = useState(false);
  const handleOpenTag = () => setOpenTag(true);
  const handleCloseTag = () => setOpenTag(false);
  const [openGroup, setOpenGroup] = useState(false);
  const handleOpenGroup = () => setOpenGroup(true);
  const handleCloseGroup = () => setOpenGroup(false);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
   const [active, setActive] = useState("none")
  const menuList = [
    {
     title: "CATEGORIES",
     itemsList:   [
      {
        text: "Browse All",
        icon: <BrowseGalleryOutlinedIcon />,
        onClick: (text) => {
        navigate("/contacts/all")
        handleDrawerToggle()
        setActive(text)
      }
      },
      {
        text: "Important",
        icon: <PriorityHighOutlinedIcon />,
        onClick: () => {
          handleDrawerToggle()
          navigate("/contacts/important")
          setActive("Important")
          }
      },
      {
        text: "Starred",
        icon: <StarBorderOutlinedIcon />,

        onClick: (text) => {
          handleDrawerToggle()
          navigate("/contacts/starred")
          setActive(text)
          }
      }
    ]
    },
    {
     title: "TAGS",
     addIcon: <AddTwoToneIcon/>,
     itemsList:   (myData ? myData.tags.map((tag) => {
      return {
        text: tag,
        icon: <TagOutlinedIcon />,
        onClick: () => {
          handleDrawerToggle()
          dispatch(setCurrentGroupAndTag({tag: tag.toLowerCase()}))
          navigate(`/tags/${tag.toLowerCase()}`)
          }
      }
     }) : [])
    },
    {
     title: "GROUPS",
     addIcon: <AddTwoToneIcon/>,
     itemsList:  (myData ? myData.groups.map((group) => {
      return {
        text: group,
        icon: <GroupsOutlinedIcon />,
        onClick: () => {
          handleDrawerToggle()
          dispatch(setCurrentGroupAndTag({group: group.toLowerCase()}))
          navigate(`/groups/${group.toLowerCase().split(' ').join('-')}`)
          }
      }
     }) : [])
    },
   
  ]
  const drawer = (
    <>
      <Box p={2}>
      <Logo></Logo>
      </Box>
      <List sx={{overflowY: "scroll", 
            '&::-webkit-scrollbar': {
            width: '0rem'
            }}}>
        {menuList.map((menu) => {
          const {title, addIcon,itemsList} = menu;
          return (<List>
          <ListItem key={title}>
          <ListItemText sx={{color: "primary.light"}} primary={title} />
            {addIcon && <ListItemIcon onClick={
              () => {
                if(title === "TAGS") handleOpenTag()
                if(title === "GROUPS") handleOpenGroup()
              }
            }  sx={{cursor: 'pointer', color: 'primary.light'}}>{addIcon}</ListItemIcon>}
          <ModalTemplate opacity={"0.15"} open={openTag} onClose={handleCloseTag}>
            <AddModal modalFor={"tags"} onClose={handleCloseTag}/>
          </ModalTemplate>
          <ModalTemplate opacity={"0.15"} open={openGroup} onClose={handleCloseGroup}>
          <AddModal modalFor={"groups"} onClose={handleCloseGroup}/>
          </ModalTemplate>
          </ListItem>
          <List>
            {itemsList.map((item) => {
          const { text, icon, onClick } = item;
          return (
            (isLoading ? <ListItem key={text}>
              <Skeleton variant='rounded' width={210} height={41}></Skeleton>
            </ListItem> : <ListItem key={text} onClick={() => onClick(text)}>
              <ListItemButton>
              {icon && <ListItemIcon sx={{color: "primary.main"}}>{icon}</ListItemIcon>}
              <ListItemText sx={{color: "primary.dark"}} primary={text} />
              </ListItemButton>
            </ListItem>)
          );
        })}
        </List>
          </List>);
        })}
      </List>
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          backgroundColor: "#fff",
          boxShadow: "none",
          color: "primary.light"
        }}
      >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: {xs:0, lg:1}, display: { lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <TopBar
          searchText={searchText}
          setSearchText={setSearchText}
          ></TopBar>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, boxShadow:"rgb(90 114 123 / 11%) 0px 7px 30px 0px" },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, boxShadow:"rgb(90 114 123 / 11%) 0px 7px 30px 0px" },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { lg: `calc(100% - ${drawerWidth}px)` }, backgroundColor: "#fafbfb", height: "100vh"}}
      >
        <Toolbar />
        <Box>
        </Box>
        <Box width="100%" height="83%">
        {props.children}
        </Box>
      </Box>
    </Box>
  );
}



export default Layout;

