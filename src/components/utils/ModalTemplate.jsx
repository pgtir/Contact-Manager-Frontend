import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  borderRadius: "20px",
  boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
  p: 4,
  outline: "none"
};

export default function ModalTemplate(props) {
  const {opacity} = props
  return (
      <Modal
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0,0,0,0.5)',
          opacity: `${opacity}`,
          boxShadow: 'none',
        },
      }}
        open={props.open}
        onClose={props.onClose}
      >
        <Box sx={style}>
       {props.children}
        </Box>
      </Modal>
  );
}
