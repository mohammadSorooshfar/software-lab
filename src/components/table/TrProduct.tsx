import {
  Avatar,
  Button,
  ButtonGroup,
  styled,
  TableCell,
  TableRow,
} from "@mui/material";
import AddModal from "components/modals/AddModal";
import DeleteModal from "components/modals/DeleteModal";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getToken } from "utilities";

const TrProduct: React.FC<{
  rowData: any;
  refreshFunction: any;
}> = ({ rowData, refreshFunction }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const router = useRouter();
  const goToProductPage = (id: number) => {
    router.push("/product/" + id);
  };
  const handleSubmit = () => {
    // deleteProductsAdminService(rowData.id.toString())
    //   .then((res) => {
    //     setOpenDelete(false);
    //     toast.success("آگهی با موفقیت حذف شد");
    //     refreshFunction();
    //   })
    //   .catch((e) => {
    //     setOpenDelete(false);
    //     toast.error("حذف آگهی با خطا روبرو شد");
    //   });
  };
  const handleEdit = (
    data: {
      name: string;
      price: string;
      color: string;
      inventory: string;
      gender: { fa: string; en: string };
      category: { fa: string; en: string };
      files: FileList;
      description: string;
      deletedImages: number[];
    },
    productBeforeEdit: any
  ) => {
    const initialProduct = JSON.parse(JSON.stringify(productBeforeEdit));
    console.log(data.deletedImages);
    data.deletedImages.forEach((imgIndex) => {
      console.log(imgIndex, initialProduct.images[imgIndex]);

      initialProduct.images.splice(imgIndex, 1);
    });
    const reqConfig = {
      headers: {
        "content-type": "multipart/form-data",
        token: getToken(),
      },
    };
    const imagePromises = data.files;
    Object.values(data.files).map((file: any) => {
      let formData = new FormData();
      formData.append("image", file);
      // return uploadImagesAdminService(formData, reqConfig);
    });
    Promise.all(imagePromises).then((arrOfResults) => {
      const allFormData = {
        id: initialProduct.id,
        name: data.name,
        colors: [
          data.color ? data.color : initialProduct.colors[0],
          ...initialProduct.colors.slice(1),
        ],
        images: [...initialProduct.images, ...arrOfResults],
        price: +data.price,
        inventory: +data.inventory,
        gender: { en: data.gender.en, fa: data.gender.fa },
        category: { en: data.category.en, fa: data.category.fa },
        description: data.description,
      };

      // updateProductsAdminService(rowData.id.toString(), allFormData)
      //   .then((res) => {
      //     console.log(res);
      //     toast.success("آگهی با موفقیت ویرایش شد");
      //     refreshFunction();
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    });
  };
  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={rowData.name}>
        <TableCell align="center">{rowData.book_title}</TableCell>
        <TableCell align="center">{rowData.price}</TableCell>
        <TableCell align="center">{rowData.isbn}</TableCell>
        <TableCell align="center">{rowData.publisher}</TableCell>
        <TableCell align="center">
          {rowData.status == 1
            ? "در انتظار تایید"
            : rowData.status == 2
            ? "تایید شده"
            : "رد شده"}
        </TableCell>
        <TableCell align="center">
          <Button
            variant="contained"
            color="info"
            onClick={() => goToProductPage(rowData.id)}
          >
            صفحه آگهی
          </Button>
        </TableCell>
      </TableRow>
      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        product={rowData.name}
        handleSubmit={handleSubmit}
      />
      <AddModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        handleSubmit={handleEdit}
        initProduct={{}}
        refresh={refreshFunction}
        edit={true}
      />
    </>
  );
};

export default TrProduct;
