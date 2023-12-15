import { Paper } from "@mui/material";
import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import React from "react";

const UserLayout: React.FC<any> = ({
  children,
  setSearchText,
}: {
  children: any;
  setSearchText: any;
}) => {
  return (
    <div>
      <Header navHeight="100px" setSearchText={setSearchText} />
      <Paper sx={{ paddingTop: "110px" }}>{children}</Paper>
      <Footer />
    </div>
  );
};

export default UserLayout;
