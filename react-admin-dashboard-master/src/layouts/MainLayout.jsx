import React, { useState } from 'react'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Topbar from "../scenes/global/Topbar";
import CustomSidebar from "../scenes/global/Sidebar";
import { Outlet } from 'react-router-dom' //this is an important component that holds the dynamic contents


const MainLayout = () => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = React.useState(true);

  return (
         <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={`app ${isSidebar ? "sidebar-collapsed" : "sidebar-expanded"}`}>
          <CustomSidebar isSidebar={isSidebar} />
          <main className="content" style={{ marginLeft: isSidebar ? "60px" : "240px" }}>
            <Topbar setIsSidebar={setIsSidebar} />
            
            <Outlet/>
           
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default MainLayout