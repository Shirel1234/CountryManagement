import { Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminPage.scss";
import { ROUTES } from "../../constants";

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
            onClick={() => navigate(ROUTES.MANAGE_COUNTRIES)}
          >
            Manage Countries
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate(ROUTES.MANAGE_USERS)}
          >
            Manage Users
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate(ROUTES.MANAGE_REQUESTS)}
          >
            Manage Requests
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default AdminDashboard;
