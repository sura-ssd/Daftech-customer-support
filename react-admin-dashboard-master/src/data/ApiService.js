// apiService.js

import axios from "axios";

const API_BASE_URL = "https://localhost:7291/api";

export const fetchClients = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Client/GetClient`);
    const dataWithId = response.data.map((client, index) => ({
      ...client,
      FrontendId: index + 1,
      BackendId: client.id,
      Username: client.username,
      Email: client.email,
      PhoneNumber: client.phoneNumber,
      City: client.city,
      Region: client.region,
    }));
    return dataWithId;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

// export const registerAdmin = async () => {
 
// };

export const fetchAdmins = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Admin/GetAdmin`);
    
    if (response && response.data) {
      const admins = response.data;
      
      const adminsModified = admins.map((admin, index) => ({
        ...admin,
        Id: index + 1, 
        BackendId: admin.id,
      }));
      
      return adminsModified;
    } else {
      // Handle the case where the response or data is undefined
      console.error("Empty response or data:", response);
      return []; // Return an empty array or handle the error as needed
    }
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
};


export const deleteAdmin = async (adminId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/Admin/DeleteAdmin/${adminId}`);
    return response.data; 
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
};









