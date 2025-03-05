import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../styles/RequestAccess.scss";
import { useAddRequestAccess } from "../../hooks/mutations/useRequestMutation";
import { useFetchRequests } from "../../hooks/queries/useRequestsQuery";
import Loader from "../ui/Loader";
import { useNavigate } from "react-router-dom";
import { RequestAccessAction } from "../../constants/requestAccessEnum";

const requestOptions = [
  { id: RequestAccessAction.ADD, label: "Request to Add", icon: <AddIcon /> },
  { id: RequestAccessAction.UPDATE, label: "Request to Update", icon: <EditIcon /> },
  { id: RequestAccessAction.DELETE, label: "Request to Delete", icon: <DeleteIcon /> },
];

const RequestAccess = () => {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserId(userData.myId); // Set the userId from localStorage
    }
  }, []);
  const { mutate: addRequestAccessMutation } = useAddRequestAccess();
  const { data: userRequests, isLoading } = useFetchRequests(userId ?? undefined);

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
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="request-access">
       <div className="go-back-container">
      <button className="go-back-button" onClick={handleGoBack}>
        ← Go Back
      </button>
      </div>
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
      <Paper className="user-requests">
        <Typography variant="h6" className="request-history-title">
          Request History
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Request Date</TableCell>
                <TableCell>Update Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Loader />
                  </TableCell>
                </TableRow>
              ) : (
                userRequests?.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell>{request.action}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>
                      {new Date(request.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(request.updatedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default RequestAccess;
