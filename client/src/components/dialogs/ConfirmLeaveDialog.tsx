import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

interface ConfirmLeaveDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmLeaveDialog: React.FC<ConfirmLeaveDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Leave Without Saving?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to leave without saving the changes you've made?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No, keep editing</Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Yes, discard changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmLeaveDialog;
