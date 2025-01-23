import React, { useState } from 'react';
import { 
  DataGrid, 
  GridColDef, 
  GridActionsCellItem 
} from '@mui/x-data-grid';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Button, 
  Box 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFetchData } from '../hooks/useFetchData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICountry } from '../types/country';
import { deleteCountry } from '../services/apiService';

const CountriesTable: React.FC = () => {
  const queryClient = useQueryClient();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);

  // Fetch data hook
  const { data: countries, isLoading } = useFetchData();

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCountry(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['data'] });
      setDeleteConfirmOpen(false);
    },
    onError: (error) => {
      console.error('Delete failed:', error);
      // Handle error (e.g., show error toast)
    }
  });

  // Open delete confirmation dialog
  const handleDeleteClick = (country: ICountry) => {
    setSelectedCountry(country);
    setDeleteConfirmOpen(true);
  };

  // Confirm delete action
  const handleDeleteConfirm = () => {
    if (selectedCountry) {
      deleteMutation.mutate(selectedCountry._id);
    }
  };

  // Edit handler (navigate to edit form)
//   const handleEditClick = (country: ICountry) => {
    // Implement navigation to edit form
    // Example: navigate(`/edit-country/${country._id}`)
//   };

  const columns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Country Name', 
      flex: 1 
    },
    { 
      field: 'capital', 
      headerName: 'Capital', 
      flex: 1 
    },
    { 
      field: 'region', 
      headerName: 'Region', 
      flex: 1 
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        const country = params.row as ICountry;
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            //onClick={() => handleEditClick(country)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(country)}
            color="error"
          />
        ];
      },
    },
  ];

  // Delete Confirmation Dialog
  const DeleteConfirmDialog = () => (
    <Dialog
      open={deleteConfirmOpen}
      onClose={() => setDeleteConfirmOpen(false)}
    >
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {selectedCountry?.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
        <Button 
          onClick={handleDeleteConfirm} 
          color="error" 
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={countries || []}
        columns={columns}
        getRowId={(row) => row._id}
        loading={isLoading}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <DeleteConfirmDialog />
    </Box>
  );
};

export default CountriesTable;