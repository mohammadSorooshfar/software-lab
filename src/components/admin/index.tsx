import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import AddModal from "components/modals/AddModal";
import EnhancedTable from "components/table/Table";
import EnhancedTableAdmin from "components/table/TableAdmin";
import TrAdmin from "components/table/TrAdmin";
import DashboardLayout from "layouts/Dashboard.Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getToken,
  isAnPriceManagement,
  isAnProductManagement,
} from "utilities/index";

const RowType: React.FC<{
  rowData: any;
  refreshFunction: any;
  setOpen: any;
  setRowId: any;
}> = ({ rowData, refreshFunction, setOpen, setRowId }) => {
  return (
    <TrAdmin
      rowData={rowData}
      refreshFunction={refreshFunction}
      setOpen={setOpen}
      setRowId={setRowId}
    />
  );
};
const ActionButtons: React.FC = () => {
  return <></>;
};

const AdminDashboard: React.FC = () => {
  const location = useRouter();
  const [selectedMenu, setSelectedMenu] = useState("offers");
  const [headers, setHeaders] = useState<any[]>([]);
  const setHeaderByPath = (path: string) => {
    setHeaders([
      {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "نام کتاب",
      },
      {
        id: "totalPrice",
        numeric: true,
        disablePadding: true,
        label: "مبلغ",
      },
      {
        id: "price_deal",
        numeric: false,
        disablePadding: true,
        label: "نسخه",
      },
      {
        id: "publisher",
        numeric: false,
        disablePadding: true,
        label: "نویسنده",
      },
      {
        id: "publisher",
        numeric: false,
        disablePadding: true,
        label: "عملیات",
      },
    ]);
  };
  useEffect(() => {
    setHeaderByPath(location.pathname);
  }, [location.pathname]);
  return (
    <DashboardLayout
      selectedMenu={selectedMenu}
      setSelectedMenu={setSelectedMenu}
    >
      <EnhancedTableAdmin
        headers={headers}
        RowType={RowType}
        ActionButtons={ActionButtons}
      />
    </DashboardLayout>
  );
};

export default AdminDashboard;
