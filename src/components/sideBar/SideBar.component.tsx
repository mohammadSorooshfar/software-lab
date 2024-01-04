import ListAltIcon from "@mui/icons-material/ListAlt";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";

let managementSections: any = {
  offers: {
    persian: "آگهی ها",
    icon: <ListAltIcon sx={{ marginRight: "auto" }} />,
  },
  info: {
    persian: "اطلاعات شخصی",
    icon: <InfoIcon sx={{ marginRight: "auto" }} />,
  },
};
const drawerWidth = 240;

const SideBar: React.FC<{
  mobileOpen: any;
  handleDrawerToggle: any;
  selectedMenu: any;

  setSelectedMenu: any;
}> = ({ mobileOpen, handleDrawerToggle, selectedMenu, setSelectedMenu }) => {
  const navigate = useRouter();
  const location = navigate;
  const userData = useSelector((state: any) => state.user.userData);
  if (userData.role == 1) {
    managementSections = {
      offers: {
        persian: "آگهی ها",
        icon: <ListAltIcon sx={{ marginRight: "auto" }} />,
      },
    };
  } else {
    managementSections = {
      offers: {
        persian: "آگهی ها",
        icon: <ListAltIcon sx={{ marginRight: "auto" }} />,
      },
      info: {
        persian: "اطلاعات شخصی",
        icon: <InfoIcon sx={{ marginRight: "auto" }} />,
      },
    };
  }

  const editable: any = [];
  const ListItemActive = styled(ListItem)<ListItemProps>(({ theme }) => ({
    color: "#dce4ec",
    textAlign: "right",
    justifyContent: "space-between",
    "&::before": {
      content: '""',
      width: "6px",
      height: "30px",
      borderRadius: "10px",
      backgroundColor: "#FCFAFE",
    },
  }));

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate.push("/");
    }
  };
  const drawer = (
    <Box>
      <Toolbar sx={{ justifyContent: "center", mt: 2 }}>
        <Typography
          variant="h5"
          onClick={() => navigate.push("/")}
          sx={{ "&:hover": { cursor: "pointer" }, color: "#dce4ec" }}
        >
          یونی بوک
        </Typography>
      </Toolbar>
      <List>
        {Object.entries(managementSections).map((section: any, index) =>
          selectedMenu === section[0] ? (
            <ListItemActive key={section[1].persian} disablePadding>
              <ListItemButton onClick={() => handleDrawerToggle()}>
                <ListItemIcon sx={{ color: "inherit" }}>
                  {section[1].icon}
                </ListItemIcon>{" "}
                <ListItemText primary={section[1].persian} />
              </ListItemButton>
            </ListItemActive>
          ) : (
            <ListItem key={section[1].persian} disablePadding>
              <ListItemButton
                onClick={() => {
                  setSelectedMenu(section[0]);
                  handleDrawerToggle();
                }}
              >
                <ListItemIcon sx={{ color: "#dce4ec" }}>
                  {section[1].icon}
                </ListItemIcon>
                <ListItemText
                  primary={section[1].persian}
                  sx={{ color: "#dce4ec" }}
                />
              </ListItemButton>
            </ListItem>
          )
        )}
        <ListItem disablePadding>
          <ListItemButton onClick={() => logout()}>
            <ListItemIcon sx={{ color: "#dce4ec" }}>
              <LogoutIcon sx={{ marginRight: "auto" }} />
            </ListItemIcon>
            <ListItemText primary={"خروج"} sx={{ color: "#dce4ec" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            right: 0,
            backgroundColor: "#575fcf",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        anchor="right"
        transitionDuration={0}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            right: 0,
            borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
            backgroundColor: "#575fcf",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default SideBar;
