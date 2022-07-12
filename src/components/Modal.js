import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  maxHeight: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

const BasicModal = ({ open, handleClose, title, children }) => (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        disableScrollLock
        disableEscapeKeyDown
        aria-labelledby="Create new tournament"
        aria-describedby="Create new tournament"
      >
        <Box sx={style}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h2>{title}</h2>
            <CloseIcon
              style={{
                cursor: 'pointer',
              }}
              onClick={handleClose}
            />
          </div>
          {children}
        </Box>
      </Modal>
    </div>
  )

BasicModal.defaultProps = {};

export default BasicModal;