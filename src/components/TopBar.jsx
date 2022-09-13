import {useState} from 'react';
import {
  Stack,
  Divider,
  TextField,
  Tooltip,
  Box,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from "@mui/icons-material/Search";
import AccountMenu from "./AccountMenu";
import ModalTemplate from './utils/ModalTemplate';
import CreateContact from './CreateContact/CreateContact';

function TopBar({searchText, setSearchText}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  return (
    <Box
      flex={1}
      sx={{
        display: "flex",
        justifyContent: `space-between`,
        alignItems: "center",
      }}
    >
      <Stack
        display='flex'
        px={1}
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: "6px",
          maxWidth: {xs: "12rem", sm: "19rem"}
        }}
        direction="row"
        alignItems="center"
        justifyContent="center"
      > 
        <SearchIcon sx={{ color: "primary.light" }} />
        <TextField
          sx={
            {
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.light",
                  border: "none",
                },
                "& fieldset::placeholder": {
                  color: "primary.main",
                },
              },
            }
          }
          onChange={e => setSearchText(e.target.value)}
          variant="outlined"
          placeholder="Search contacts"
          inputProps={{
            style: {
              padding: 8,
            },
          }}
        />
      </Stack>
      
      <Stack direction="row"  alignItems="center" justifyContent="space-between">
      <Box>
      <Tooltip title="Create New Contact">
      <AddIcon onClick={handleOpen}  sx={{ fontSize: "2rem", cursor: "pointer", color: "info.main", mr: {xs: 0, sm: 0}}} />
      </Tooltip>
      <ModalTemplate open={open} onClose={handleClose}>
          <CreateContact isNewContact={true} onClose={handleClose}></CreateContact>
        </ModalTemplate>
      </Box>
        <Box>
        <Divider orientation="vertical" flexItem sx={{height: "25px", fontWeight: 700,display: { xs: " block"}, borderWidth: {xs:"0.8px"}, mx: 1}} />
        </Box>
        <AccountMenu />
      </Stack>
    </Box>
  );
}

export default TopBar;
