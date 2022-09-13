import { TextField } from "@mui/material";
const TextFieldCustom = (props) => {
return (
    <TextField
    sx={{
        width: {xs: "80vw",sm: "60vw", md: "25rem", lg: "30rem"},
        "& label": {
          color: "primary.main",
        },
        "&:hover label": {
          color: "primary.dark",
        },
        "& label.Mui-focused": {
          color: "info.main",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "primary.light",
          },
          "&:hover fieldset": {
            borderColor: "primary.main",
          },
          "&.Mui-focused fieldset": {
            borderColor: "info.main",
          },
        }, 
      }}
      {...props}
    ></TextField>
)
}

export default TextFieldCustom;