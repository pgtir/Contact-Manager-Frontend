import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import { logout, reset } from "../redux/authFeatures/authSlice"
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box, Typography, Tooltip, Menu, MenuItem, Stack, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logout from '@mui/icons-material/Logout';
import ModalTemplate from './utils/ModalTemplate'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function AccountMenu() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth.user)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
        <Tooltip title="Account settings">
          <IconButton 
            onClick={handleClick}
            size="small"
            sx={{ml: 0, 
            borderRadius: "6px",}}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{user && user.name.substring(0,1).toUpperCase()}</Avatar>
            <Box sx={{display:  { xs: 'none', sm: 'flex' }, alignItems: "center", ml: 1}} color="primary.light">
              <Typography>Hi, </Typography>
              <Stack direction="row" alignItems="center">
              <Typography ml={1} fontWeight={700}>{user && user.name}</Typography>
              <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
              </Stack>
             
            </Box>
          </IconButton>
        </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
        <ListItemIcon>
            <ManageAccountsIcon fontSize="medium" sx={{color: "success.main"}}/>
          </ListItemIcon>
          Account Settings
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{color: "secondary.main"}}/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
