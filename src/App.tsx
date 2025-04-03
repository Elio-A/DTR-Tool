import './App.css';
import Login from "./views/LoginPage/Login"
import HomePage from "./views/HomePage/Home"

import MapView from "./views/MapPage/MapView"
import NbPower from './views/OutsideLinks/NbPower';

import Signup from "./views/SignupPage/Signup"
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './global/AppSidebar';
import { useEffect, useState } from 'react';
// import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';

function App() {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true"; 
  });

  const location = useLocation()
  const showSidebar = location.pathname !== "/login";

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
  }, [isAuthenticated]);

  return (
    <Box display={'flex'} flexDirection={"column"} height={"100vh"}>
      {isAuthenticated && (
      <Sidebar
        initialSelected='Home'
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        setIsAuthenticated={setIsAuthenticated}
      />
      )}
      <Box
        sx={{
          flexGrow: 1,
          paddingLeft: showSidebar ? isSidebarCollapsed
            ? "80px" : "270px"
          : "0px",
          transition: "padding-left 0.3s",
          overflow: "auto"
        }}
      >
        <main className="content">
          <Routes>
            <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)}/>}/>
            <Route path="*" element={<Navigate to="/login"/>}/>

            <Route path="/signup" element={<Signup/>}/>


          {isAuthenticated && (
            <>
            {/* <Route element={<ProtectedRoutes/>}> */}
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/map" element={<MapView/>}/>
              <Route path="/NBPower" element={<NbPower/>}/>
            {/* </Route> */}
            </>
          )}
          </Routes>
        </main>
      </Box>
    </Box>
  );
}

export default App;