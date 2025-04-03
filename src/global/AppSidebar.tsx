import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Activity, HomeIcon, LogOutIcon, MapIcon, MenuIcon } from "lucide-react"
import "./Sidebar.css"

interface SideBarProps {
    initialSelected?: string;
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
    setIsAuthenticated: (authState: boolean) => void;
}

function AppSidebar({ initialSelected = "Home", isCollapsed, setIsCollapsed, setIsAuthenticated }: SideBarProps){
    const theme = useTheme();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(initialSelected);
    
    const handleNavigation = (route: string) => {
        setSelected(route)
        navigate(route)
    }

    const handleSignout = () =>{
        if (window.confirm("Are you sure you want to sign out?")){
            setIsAuthenticated(false);
            localStorage.removeItem("isAuthenticated");
            navigate("/login")
        }
        
    }

    return (
        <Box className="sidebar-container">
            <Sidebar collapsed={isCollapsed}>
                <Menu>
                    {/* Collapse/Expand Button */}
                    <MenuItem
                        icon={<MenuIcon size={24} />}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    ></MenuItem>
                </Menu>
                <Menu>
                    {/* Home Route */}
                    <MenuItem
                        icon={<HomeIcon />}
                        onClick={() => handleNavigation("/home")}
                        active={selected === "Home"}
                    >
                        <Typography>Home</Typography>
                    </MenuItem>

                    {/* Map Route */}
                    <MenuItem
                        icon={<MapIcon />}
                        onClick={() => handleNavigation("/map")}
                        active={selected === "Map"}
                    >
                        <Typography>Map View</Typography>
                    </MenuItem>

                    {/* Status Route */}
                    <MenuItem
                        icon={<Activity />}
                        onClick={() => handleNavigation("/status")}
                        active={selected === "Status"}
                    >
                        <Typography>Status</Typography>
                    </MenuItem>

                    {/* Logout Route */}
                    <MenuItem
                        icon={<LogOutIcon />}
                        onClick={handleSignout}
                        active={selected === "Logout"}
                    >
                        <Typography>Sign Out</Typography>
                    </MenuItem>
                </Menu>
            </Sidebar>
        </Box>
    )
}

export default AppSidebar
