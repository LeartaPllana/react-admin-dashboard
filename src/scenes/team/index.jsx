import { Box, Typography, useTheme, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
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
  const [open, setOpen] = useState(false);  // For dialog visibility
  const [selectedRow, setSelectedRow] = useState(null);  // Store the row being edited

  // Columns with editable fields
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: true,
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
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={access === "admin" ? colors.greenAccent[600] : access === "manager" ? colors.greenAccent[700] : colors.greenAccent[700]}
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
            sx={{ color: colors.blueAccent[300], cursor: "pointer" }}
            onClick={() => handleEdit(params.row)}  // Pass the entire row to handleEdit
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
            sx={{ color: colors.redAccent[300], cursor: "pointer" }}
            onClick={() => handleDelete(params.row.id)}
          />
        );
      },
    },
  ];

  // Open the edit dialog and set the selected row
  const handleEdit = (row) => {
    setSelectedRow(row);
    setOpen(true);  // Open the dialog
  };

  // Handle row delete
  const handleDelete = (id) => {
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);  // Update state
  };

  // Handle row update after editing
  const handleSave = () => {
    const updatedRows = rows.map((row) =>
      row.id === selectedRow.id ? { ...row, ...selectedRow } : row
    );
    setRows(updatedRows);  // Update state with the edited row
    setOpen(false);  // Close the dialog
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
        onClick={() => setRows([])}  // Clear all rows
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
        }}
      >
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
        />
      </Box>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Team Member</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            value={selectedRow?.name || ""}
            fullWidth
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            name="phone"
            label="Phone Number"
            value={selectedRow?.phone || ""}
            fullWidth
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            name="email"
            label="Email"
            value={selectedRow?.email || ""}
            fullWidth
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            name="access"
            label="Access Level"
            value={selectedRow?.access || ""}
            fullWidth
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;
