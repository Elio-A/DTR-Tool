import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Activity, HomeIcon, LogOutIcon, MapIcon, MenuIcon } from "lucide-react"
interface SideBarProps {
    initialSelected?: string;
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}

function AppSidebar({ initialSelected = "Home", isCollapsed, setIsCollapsed }: SideBarProps){
    const theme = useTheme();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(initialSelected);
    
    const handleNavigation = (route: string) => {
        setSelected(route)
        navigate(route)
    }

    return(
        <Box
            sx={{
                position: "fixed",
                height: "100vh",
                zIndex: 100,
                "& .pro-sidebar-inner": {
                    background: theme.palette.primary.main,
                    height: "100vh",
                },
                "& .pro-icon-wrapper": {
                    background: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: theme.palette.secondary.main,
                },
                "& .pro-menu-item.active": {
                    color: theme.palette.secondary.light,
                },
            }}
        >
            <Sidebar collapsed={isCollapsed}>
                <Menu>
                    <MenuItem 
                        icon={<MenuIcon size={24}/>} 
                        onClick={() => setIsCollapsed(!isCollapsed)}>
                    </MenuItem>
                </Menu>
                <Menu>
                    {/* Home Route */}
                    <MenuItem
                        icon={<HomeIcon/>}
                        onClick={() => handleNavigation("/home")}
                        active={selected === "Home"}
                    >
                        <Typography>Home</Typography>
                    </MenuItem>

                    {/* Map Route */}
                    <MenuItem
                        icon={<MapIcon/>}
                        onClick={() => handleNavigation("/map")}
                        active={selected === "Map"}
                        >
                        <Typography>Map View</Typography>
                    </MenuItem>

                    {/* Status Route */}
                    <MenuItem
                        icon={<Activity/>}
                        onClick={() => handleNavigation("/status")}
                        active={selected === "Status"}
                        >
                        <Typography>Status</Typography>
                    </MenuItem>

                    {/* Logout Route */}
                    <MenuItem
                        icon={<LogOutIcon/>}
                        onClick={() => handleNavigation("/login")}
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
