import { Box, Typography, useTheme, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Header from "../../components/Header";
import { useState } from "react";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState(mockDataTeam);

  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: true,  
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      editable: true,  
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      editable: true,  
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,  
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      editable: true,  
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: (params) => {
        return (
          <EditOutlinedIcon
            sx={{ color: colors.blueAccent[300], cursor: 'pointer' }}
            onClick={() => handleEdit(params.row)}
          />
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => {
        return (
          <DeleteOutlineOutlinedIcon
            sx={{ color: colors.redAccent[300], cursor: 'pointer' }}
            onClick={() => handleDelete(params.row.id)}
          />
        );
      },
    },
  ];

  // Handle editing
  const handleEdit = (row) => {
    setSelectedRow(row);
    setOpenModal(true); 
  };

  const handleDelete = (id) => {
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows); 
  };

  const handleUpdate = () => {
    const updatedRows = rows.map((row) =>
      row.id === selectedRow.id ? { ...row, ...selectedRow } : row
    );
    setRows(updatedRows);
    setOpenModal(false); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedRow((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));
  };

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setRows([])} 
        sx={{ marginBottom: "20px" }}
      >
        Delete All Profiles
      </Button>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
        />
      </Box>

      {}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Edit Team Member</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={selectedRow?.name || ''}
            onChange={handleChange}
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={selectedRow?.age || ''}
            onChange={handleChange}
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={selectedRow?.phone || ''}
            onChange={handleChange}
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={selectedRow?.email || ''}
            onChange={handleChange}
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="Access Level"
            name="accessLevel"
            value={selectedRow?.accessLevel || ''}
            onChange={handleChange}
            sx={{ marginBottom: '15px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;
