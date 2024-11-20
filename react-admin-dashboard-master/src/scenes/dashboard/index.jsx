import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import {useState, useEffect} from "react";
import axios from "axios";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
// import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";



const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalClientCount, setTotalClientCount] = useState(0);
  const [totalAdminCount, setTotalAdminCount] = useState(0);
  const [totalEmailsSent, setTotalEmailsSent] = useState(0);
  const targetClientCount = 2500; 
  const targetAdminCount= 25;
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios
      .get('https://localhost:7291/api/Admin/GetAdmin')
      .then(response => {
        setAdmins(response.data);
      })
      .catch(error => {
        console.error('Error fetching admins:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch total client count from the API
    axios.get('https://localhost:7291/api/Client/GetTotalClientCount')
      .then(response => {
        setTotalClientCount(response.data);
      })
      .catch(error => {
        console.error('Error fetching total client count:', error);
      });
  }, []);
  
  useEffect(() => {
    // Fetch total admin count from the API
    axios.get('https://localhost:7291/api/Admin/GetTotalAdminCount')
      .then(response => {
        setTotalAdminCount(response.data);
      })
      .catch(error => {
        console.error('Error fetching total admin count:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch the total email count from the API
    axios.get('https://localhost:7291/api/Email/count')
      .then(response => {
        setTotalEmailsSent(response.data.emailCount);
      })
      .catch(error => {
        console.error('Error fetching total email count:', error);
      });
  }, []);

  const progress= (totalClientCount / targetClientCount) * 100;
  const adminProgress = ( totalAdminCount / targetAdminCount) * 100;
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
        >
        
          <StatBox
            title={totalEmailsSent}
            subtitle="Emails Recieved"
            progress=""
            increase=""
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
        >
          <StatBox
            title={totalAdminCount}
            subtitle="Total Admins"
            progress={adminProgress}
            increase={adminProgress + "%"}
            icon={
              <AdminPanelSettingsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
        >
          <StatBox
            title={totalClientCount}
            subtitle="Clients"
            progress={progress}
            increase={progress + "%"}
            
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
        >
          <StatBox
            title=""
            subtitle="Traffic Received"
            progress=""
            increase=""
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
          
        >
          <Box
            mt="25px"
            p="0 30px"
            
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
                
              >
                Registered Users
              </Typography>
              
            </Box>
            
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600" position="fixed" backgroundColor="#1f2a40">
              Users
            </Typography>
          </Box>
          {admins.map((admin, i) => (
            <Box
              key={`admin-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {admin.id}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {admin.firstName}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{admin.email}</Box>
              {/* Add additional admin data fields here */}
            </Box>
          ))}
        
        </Box>

       
        
      </Box>
    </Box>
  );
};

export default Dashboard;
