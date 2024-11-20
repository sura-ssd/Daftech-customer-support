import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, useTheme, Avatar, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { fetchAdmins, deleteAdmin } from "../../data/ApiService";
import "./style.css";
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [admins, setAdmins] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const adminData = useSelector((state) => state.auth.adminData);

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000); // Hide after 3 seconds 
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000); 
  };

  useEffect(() => {
    // Fetch admin data and update state
    fetchAdmins()
      .then((data) => {
        setAdmins(data);
      })
      .catch((error) => console.error("Error fetching admins:", error));
  }, []);

  const handleDeleteAdmin = (admin) => {
    const adminId = admin.BackendId;

    if(window.confirm("Are you sure you want to delete this admin")){
      deleteAdmin(adminId)
      .then((response) => {
        if (response) {
          // If deletion was successful, remove the deleted admin from the state
          setAdmins((prevAdmins) =>
            prevAdmins.filter((a) => a.Id !== admin.Id)
          );
          showSuccessMessage("Admin deleted successfully");
        } else {
          console.error("Error deleting admin: Validation failed");
          showErrorMessage("Error deleting admin");
        }
      })
      .catch((error) => {
        console.error("Error deleting admin:", error);
        showErrorMessage("Error deleting admin");
      });
    }
    
  };

  const columns = [
    { field: "Id", headerName: "ID" },
    {
      field: "firstName",
      headerName: "FirstName",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "LastName",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "PhoneNumber",
      flex: 1,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "Admin"
                ? colors.greenAccent[600]
                : role === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "Admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "manager" && <SecurityOutlinedIcon />}
            {role === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "profileImage",
      headerName: "Profile Image",
      flex: 1,
      renderCell: ({ row: { profileImage } }) => {
        return (
          <Avatar src={profileImage} alt="Profile Image" variant="rounded" />
        );
      },
    },
    
    
  ];

  if (adminData?.role === "manager") {
    columns.push({
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <Button
            variant="outlined"
            color="info"
            onClick={() => handleDeleteAdmin(row)}
          >
            Delete
          </Button>
        );
      },
    });
  }

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        <DataGrid checkboxSelection rows={admins} columns={columns} />
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </Box>
    </Box>
  );
};

export default Team;
