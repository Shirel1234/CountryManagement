import { Paper, Button, Typography, Tabs, Tab } from "@mui/material";
import "../../styles/RequestsTable.scss";
import { useFetchRequests } from "../../api/queries/useRequestsQuery";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useUpdateRequest } from "../../api/mutations/useRequestMutation";
import { useState } from "react";
import { mapActionToAccessLevel } from "../../utils/accessUtils";
import { useUpdateUser } from "../../api/mutations/useUserMutation";
import { useNavigate } from "react-router-dom";
import {
  RequestAccessAction,
  RequestAccessStatus,
} from "../../constants/requestAccessEnum";

const RequestsTable = () => {
  const [idRequest, setIdRequest] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const { data: requests, isLoading } = useFetchRequests();
  const { mutate: updateRequestMutation } = useUpdateRequest(idRequest);
  const { mutate: updateUserMutation } = useUpdateUser();
  const navigate = useNavigate();

  const handleAction = (
    id: string,
    userId: string,
    action: RequestAccessAction,
    status: RequestAccessStatus.APPROVED | RequestAccessStatus.DENIED
  ) => {
    setIdRequest(id);
    updateRequestMutation({ id, status });
    if (status === RequestAccessStatus.APPROVED) {
      const formData = new FormData();

      const newAccessLevel = mapActionToAccessLevel(action);
      formData.append("accessLevel", newAccessLevel.toString());

      updateUserMutation({ id: userId, formData });
    }
  };
  const handleFilterChange = (
    _event: React.SyntheticEvent,
    newValue: string
  ) => {
    setFilter(newValue);
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  const filteredRequests =
    requests?.filter((req) => {
      if (filter === "all") return true;
      return req.status === filter;
    }) ?? [];

  const columns: GridColDef[] = [
    {
      field: "userId",
      headerName: "User",
      flex: 1,
      valueGetter: (params) => {
        return (params as { username: string }).username || "Unknown User";
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      cellClassName: (params) => `action-${params.value}`,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: (params) => `status-${params.value}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        if (params.row.status === RequestAccessStatus.PENDING) {
          return (
            <div className="actions">
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() =>
                  handleAction(
                    params.row._id,
                    params.row.userId._id,
                    params.row.action,
                    RequestAccessStatus.APPROVED
                  )
                }
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() =>
                  handleAction(
                    params.row._id,
                    params.row.userId._id,
                    params.row.action,
                    RequestAccessStatus.DENIED
                  )
                }
              >
                Deny
              </Button>
            </div>
          );
        }
        return null;
      },
    },
  ];

  return (
    <div className="manage-requests">
      <button className="go-back-button" onClick={handleGoBack}>
        ← Go Back
      </button>
      <Typography variant="h4" className="title">
        Manage Requests
      </Typography>
      <Tabs
        value={filter}
        onChange={handleFilterChange}
        className="request-tabs"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="All Requests" value="all" />
        <Tab label="Pending" value="pending" />
        <Tab label="Approved" value="approved" />
        <Tab label="Denied" value="denied" />
      </Tabs>
      <Paper sx={{ height: 500, width: "80%" }}>
        <DataGrid
          rows={filteredRequests}
          columns={columns}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          loading={isLoading}
        />
      </Paper>
    </div>
  );
};

export default RequestsTable;
