import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { fetchClients } from "../../data/ApiService";
import { Link } from 'react-router-dom';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [clients, setClients] = useState([]);

  const columns = [
    {
      field: 'BackendId',
      headerName: 'ID',
      flex: 0.5,
      renderCell: (params) => (
        <Link to={`/profile/${params.row.BackendId}`} style={{ textDecoration: 'none' }}>
          {params.row.FrontendId}
        </Link>
      ),
    },
    
    {
      field: "Username",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Email",
      headerName: "Email",
      
      headerAlign: "left",
      align: "left",
      flex:1,
    },
    {
      field: "PhoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "City",
      headerName: "City",
      flex: 1,
    },
    {
      field: "Region",
      headerName: "Region",
      flex: 1,
    },
    
   
  ];

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchClients()
      .then((data) => {
        setClients(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },         
        }}
      >
        <DataGrid
          rows={clients}
          columns={columns}
          slots={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
