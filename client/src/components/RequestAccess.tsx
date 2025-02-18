import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/RequestAccess.scss";
import { useAddRequestAccess } from "../hooks/mutations/useRequestMutation";

const requestOptions = [
  { id: "add", label: "Request to Add", icon: <AdminPanelSettingsIcon /> },
  { id: "update", label: "Request to Update", icon: <EditIcon /> },
  { id: "delete", label: "Request to Delete", icon: <DeleteIcon /> },
];

const RequestAccess = () => {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: addRequestAccessMutation } = useAddRequestAccess();

  const handleRequestClick = (requestId: string) => {
    setSelectedRequest(requestId);
  };

  const handleSubmit = async () => {
    if (!selectedRequest) return;
    setIsSubmitting(true);
    addRequestAccessMutation({ action: selectedRequest });
    setSelectedRequest(null);
    setIsSubmitting(false);
  };

  return (
    <div className="request-access">
      <Card className="request-card">
        <CardContent>
          <Typography variant="h5" className="request-title">
            Select an Access Request
          </Typography>
          <List>
            {requestOptions.map((option) => (
              <ListItem
                key={option.id}
                component="button"
                onClick={() => handleRequestClick(option.id)}
                sx={{ cursor: "pointer" }}
              >
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            className="submit-btn"
            onClick={handleSubmit}
            disabled={!selectedRequest || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Request Access"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestAccess;
