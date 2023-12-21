import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { useFormik } from "formik";
import * as React from "react";
import { ReviewService } from "services/ReviewService";
import { persianNumber } from "utilities/index";
import * as yup from "yup";
import EnhancedTableHead from "./TableHead";
import { toast } from "react-toastify";

const validationSchema = yup.object({});
interface ITableProps {
  headers: any[];
  RowType: any;
  ActionButtons: any;
}

const EnhancedTableAdmin: React.FC<ITableProps> = ({
  headers,
  RowType,
  ActionButtons,
}) => {
  const [order, setOrder] = React.useState<any>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof any>("totalPrice");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rowsData, setRowsData] = React.useState<any[]>([]);
  const [totalRows, setTotalRows] = React.useState(0);
  const [delivered, setDelivered] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [rowId, setRowId] = React.useState(0);
  const reviewService = new ReviewService();

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  React.useEffect(() => {
    getProductsData();
  }, []);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const getProductsData = () => {
    reviewService
      .get(10)
      .then((res) => {
        setRowsData(res.offers);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const handleData = () => {
    getProductsData();
  };
  const handleChangePage = (event: unknown) => {
    setLoading(true);
    handleData();
  };
  const refresh = () => {
    getProductsData();
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(() => +event.target.value);
    handleChangePage("");
  };
  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      reviewService.add(rowId, 2, values.description).then((res) => {
        toast.success("رد آگهی با موفقیت صورت گرفت");
        setOpen(false);
        getProductsData();
        resetForm();
      });
    },
  });
  return (
    <>
      <Box sx={{ width: "90%", mr: "auto", ml: "auto" }}>
        {ActionButtons({
          refreshFunction: refresh,
        })}
        <Paper sx={{ width: "100%", mb: 2 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <TableContainer>
                <Table sx={{ minWidth: "60%" }} size="medium">
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy as string}
                    onRequestSort={handleRequestSort}
                    rowCount={20}
                    headers={headers}
                  />
                  <TableBody>
                    {rowsData?.map((row) => {
                      return RowType({
                        rowData: row,
                        refreshFunction: refresh,
                        setOpen: setOpen,
                        setRowId: setRowId,
                      });
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                count={totalRows}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 8, 10]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelDisplayedRows={({ from, to, count, page }) => {
                  return `${persianNumber(from.toString())}–${persianNumber(
                    to.toString()
                  )} از ${
                    count !== -1
                      ? `${persianNumber(count.toString())} آیتم`
                      : `more than ${to}`
                  }`;
                }}
                sx={{ div: { margin: 0 } }}
              />
            </>
          )}
        </Paper>
      </Box>

      <Dialog open={open} onClose={handleClose} dir="rtl" fullWidth>
        <DialogTitle sx={{ pt: 2 }}></DialogTitle>
        <DialogContent sx={{ textAlign: "center", p: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <TextField
                fullWidth
                id="description"
                name="description"
                label="توضیحات"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Box>

            <DialogActions sx={{ mt: 3, pb: 1, justifyContent: "center" }}>
              <Button
                variant={"contained"}
                onClick={handleClose}
                color="error"
                sx={{ ml: 3 }}
              >
                انصراف
              </Button>
              <Button variant={"contained"} color="success" type="submit">
                تایید
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EnhancedTableAdmin;
