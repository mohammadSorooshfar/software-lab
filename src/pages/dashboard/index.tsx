import { Box, Button } from "@mui/material";
import AdminDashboard from "components/admin";
import AddModal from "components/modals/AddModal";
import EnhancedTable from "components/table/Table";
import TrProduct from "components/table/TrProduct";
import UserPersonalData from "components/userPersonalData/UserPersonalData";
import DashboardLayout from "layouts/Dashboard.Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, getToken } from "utilities/index";

const RowType: React.FC<{
  rowData: any;
  refreshFunction: any;
}> = ({ rowData, refreshFunction }) => {
  return <TrProduct rowData={rowData} refreshFunction={refreshFunction} />;
};
const ActionButtons: React.FC = ({ refreshFunction }: any) => {
  const [addOpen, setAddOpen] = useState(false);
  const editList = [];
  const dispatch = useDispatch();
  const handleEditPrice = () => {
    // setLoading(true);
    // const getPromises = editList.map((editedRow: any) => {
    //   return getProductService(editedRow.id.toString());
    // });
    // Promise.all(getPromises)
    //   .then((products) => {
    //     const putPromises = products.map((product, index) => {
    //       editList[index].priceEdit &&
    //         (product.price = editList[index].priceData);
    //       editList[index].inventoryEdit &&
    //         (product.inventory = editList[index].inventoryData);
    //       return updateProductsAdminService(product.id.toString(), product);
    //     });
    //     Promise.all(putPromises)
    //       .then(() => {
    //         toast.success("ویرایش محصولات با موفقیت انجام شد");
    //         dispatch(deleteEditList());
    //         refreshFunction();
    //       })
    //       .catch((res) => {
    //         toast.error("در ویرایش آگهیها خطایی صورت گرفت");
    //       });
    //   })
    //   .catch((res) => {
    //     toast.error("در ویرایش آگهیها خطایی صورت گرفت");
    //   });
  };
  const handleAdd = (data: {
    name: string;
    price: string;
    color: string;
    inventory: string;
    gender: { fa: string; en: string };
    category: { fa: string; en: string };
    files: FileList;
    description: string;
  }) => {
    const reqConfig = {
      headers: {
        "content-type": "multipart/form-data",
        token: getToken(),
      },
    };
    const imagePromises = Object.values(data.files).map((file: any) => {
      let formData = new FormData();
      formData.append("image", file);
      // return uploadImagesAdminService(formData, reqConfig);
    });
    Promise.all(imagePromises).then((arrOfResults) => {
      const now = new Date();
      const allFormData = {
        name: data.name,
        colors: [data.color],
        images: [...arrOfResults],
        price: +data.price,
        inventory: +data.inventory,
        gender: { en: data.gender.en, fa: data.gender.fa },
        category: { en: data.category.en, fa: data.category.fa },
        description: data.description,
        createdAt: now,
      };
      console.log([data.color], allFormData.colors);
      refreshFunction();
      // addProductAdminService(allFormData)
      //   .then((res) => {
      //     console.log(res);
      //     toast.success("آگهی با موفقیت اضافه شد");
      //     refreshFunction();
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: "20px",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "#05c46b" }}
          onClick={() => setAddOpen(true)}
        >
          افزودن آگهی
        </Button>
      </Box>
      <AddModal
        open={addOpen}
        setOpen={setAddOpen}
        handleSubmit={handleAdd}
        edit={false}
      />
    </>
  );
};
const Dashboard: React.FC = () => {
  const location = useRouter();
  const [loading, setLoading] = useState<any>(true);
  const [headers, setHeaders] = useState<any[]>([]);
  const [selectedMenu, setSelectedMenu] = useState("offers");
  const userData = useSelector((state: any) => state.user.userData);
  console.log(userData.role);
  useEffect(() => {
    if (!checkAuth()) location.push("/login");
    else setLoading(false);
  }, []);
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
        id: "isbn",
        numeric: false,
        disablePadding: true,
        label: "isbn",
      },
      {
        id: "publisher",
        numeric: false,
        disablePadding: true,
        label: "نویسنده",
      },
      {
        id: "visible",
        numeric: false,
        disablePadding: true,
        label: "مشاهده",
      },
    ]);
  };
  useEffect(() => {
    setHeaderByPath(location.pathname);
  }, [location.pathname]);

  return (
    <>
      {loading ? (
        ""
      ) : userData.role === 1 ? (
        <AdminDashboard />
      ) : (
        <DashboardLayout
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        >
          {selectedMenu == "offers" ? (
            <EnhancedTable
              headers={headers}
              RowType={RowType}
              ActionButtons={ActionButtons}
            />
          ) : (
            <UserPersonalData />
          )}
        </DashboardLayout>
      )}
    </>
  );
};

export default Dashboard;
