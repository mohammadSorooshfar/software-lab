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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ReviewService } from "services/ReviewService";
import { getToken } from "utilities";

const TrProduct: React.FC<{
  rowData: any;
  refreshFunction: any;
  setOpen: any;
  setRowId: any;
}> = ({ rowData, refreshFunction, setOpen, setRowId }) => {
  const reviewService = new ReviewService();

  const submitReview = (id: number) => {
    reviewService.add(id, 1, "").then((res) => {
      toast.success("تایید با موفقیت صورت گرفت");
      refreshFunction();
    });
  };
  const SubmitButton = styled(Button)<{}>(({ theme }) => ({
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  }));
  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={rowData.name}>
        <TableCell align="center">{rowData.name}</TableCell>
        <TableCell align="center">{rowData.price}</TableCell>
        <TableCell align="center">{rowData.edition}</TableCell>
        <TableCell align="center">{rowData.publisher}</TableCell>
        <TableCell align="center">
          <ButtonGroup disableElevation variant="contained">
            <SubmitButton onClick={() => submitReview(rowData.id)}>
              تایید آگهی
            </SubmitButton>
            <Button
              color="error"
              onClick={() => {
                setOpen(true);
                setRowId(rowData.id);
              }}
            >
              رد آگهی
            </Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TrProduct;
