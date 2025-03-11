import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper, Button, Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../../styles/UsersTable.scss";
import { IUser } from "../../types/user";
import { useFetchUsers } from "../../hooks/queries/useUsersQuery";
import DeleteConfirmDialog from "../dialogs/DeleteConfirmDialog";
import {
  useAddUser,
  useDeleteUser,
} from "../../hooks/mutations/useUserMutation";
import { useNavigate } from "react-router-dom";
import AddUserDialog from "./AddUserDialog";
import { ROUTES } from "../../constants";

const UsersTable = () => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  const { data: users, isLoading } = useFetchUsers();
  const { mutate: addUserMutation } = useAddUser();
  const { mutate: deleteUserMutation } = useDeleteUser();

  const handleEditClick = (user: IUser) => {
    setTimeout(() => {
      navigate(ROUTES.EDIT_USER(user._id));
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
  const handleAddUser = (newUser: Omit<IUser, "_id">) => {
    const formData = new FormData();
    formData.append("firstName", newUser.firstName);
    formData.append("lastName", newUser.lastName);
    formData.append("username", newUser.username);
    formData.append("email", newUser.email);
    formData.append("phone", newUser.phone);
    formData.append("password", newUser.password);
    formData.append("accessLevel", newUser.accessLevel.toString());
    if (newUser.profileImage) {
      formData.append("profileImage", newUser.profileImage);
    }
    addUserMutation(formData);
    setAddDialogOpen(false);
  };
  const handleGoBack = () => {
    navigate(-1);
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
    <div className="users-table">
      <button className="go-back-button" onClick={handleGoBack}>
        ← Go Back
      </button>
      <Typography variant="h4" className="title">
        Manage Users
      </Typography>
      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <IconButton
            color="primary"
            onClick={() => setAddDialogOpen(true)}
            data-testid="add-button"
          >
            <AddIcon />
          </IconButton>
        </Box>
        <AddUserDialog
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onAdd={handleAddUser}
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

export default UsersTable;
