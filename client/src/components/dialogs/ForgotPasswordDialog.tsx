import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import "../../styles/ForgotPasswordDialog.scss";
import { showSuccessToast, showErrorToast } from "../utils/Toast";
import { requestPasswordResetClient } from "../../api/services/passwordResetService";
import { TOAST_MESSAGES_FORGOT_PASSWORD } from "../../constants";

interface ForgotPasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({
  open,
  onClose,
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await requestPasswordResetClient(email);
      showSuccessToast(TOAST_MESSAGES_FORGOT_PASSWORD.RESET_LINK_SUCCESS);
      onClose();
    } catch (error) {
      console.error(`Send reset link failed: ${(error as Error).message}`);
      showErrorToast(TOAST_MESSAGES_FORGOT_PASSWORD.RESET_LINK_FAILURE);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <Typography>
          Enter your email to receive a password reset link:
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Send Reset Link
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
