import { Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminPage.scss";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/manage-countries")}
          >
            Manage Countries
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/manage-users")}
          >
            Manage Users
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/manage-requests")}
          >
            Manage Requests
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default AdminDashboard;
