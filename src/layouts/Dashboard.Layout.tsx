import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SideBar from "components/sideBar/SideBar.component";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const DashboardLayout: React.FC<any> = ({
  children,
  selectedMenu,
  setSelectedMenu,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  console.log(selectedMenu);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#f0f1f8",
        minHeight: "100vh",
      }}
    >
      <SideBar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <IconButton
        color="inherit"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          position: "absolute",
          right: "15px",
          top: "15px",
          display: { sm: "none" },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Box
        component="main"
        sx={{
          pt: 3,
          width: { xs: "100vw", sm: `calc(100% - ${drawerWidth}px)` },
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h4"
          textAlign={"center"}
          noWrap
          component="div"
          color={"black"}
        >
          {selectedMenu == "offers"
            ? "پنل مدیریت آگهی‌ها"
            : "ویرایش اطلاعات شخصی"}
        </Typography>
        <Box
          sx={{
            mt: "20px",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default DashboardLayout;
