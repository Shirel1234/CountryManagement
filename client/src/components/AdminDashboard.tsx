import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Paper,
  Button,
} from "@mui/material";
import "../styles/AdminDashboard.scss";
import { IUser } from "../types/user";
import { useFetchUsers } from "../hooks/queries/useUsersQuery";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { useDeleteUser } from "../hooks/mutations/useUserMutation";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  const { data: users, isLoading } = useFetchUsers();
  // const { mutate: addUserMutation } = useAddCountry();
  const { mutate: deleteUserMutation } = useDeleteUser();
  const handleEditClick = (user: IUser) => {
    setTimeout(() => {
      navigate(`/edit-user/${user._id}`);
    }, 0);
  };
  const handleDeleteClick = async (user: IUser) => {
    setSelectedUser(user);
    setDeleteConfirmOpen(true);
  };
  const handleDeleteConfirm = () => {
    if (selectedUser) {
      deleteUserMutation(selectedUser._id);
      setDeleteConfirmOpen(false);
    }
  };

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "accessLevel", headerName: "Access Level", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEditClick(params.row)} color="primary">
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteClick(params.row)}
            color="secondary"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
        <DeleteConfirmDialog
          open={deleteConfirmOpen}
          selectedItem={selectedUser?.firstName}
          onClose={() => setDeleteConfirmOpen(false)}
          onDelete={handleDeleteConfirm}
        />
      </Paper>
    </div>
  );
};

export default AdminDashboard;
