import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrderDataForManagementTable,
  createPriceDataForManagementTable,
  createProductDataForManagementTable,
  descendingComparator,
  persianNumber,
} from "utilities/index";
import EnhancedTableHead from "./TableHead";
import { useRouter } from "next/router";
import { BookService } from "services/BookService";
import { OfferService } from "services/OfferService";

function getComparator<Key extends keyof any>(
  order: any,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
interface ITableProps {
  headers: any[];
  RowType: any;
  ActionButtons: any;
}

const EnhancedTable: React.FC<ITableProps> = ({
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
  const offerService = new OfferService();
  const dispatch = useDispatch();
  const location = useRouter();
  const userData = useSelector((state: any) => state.user.userData);

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
    offerService
      .userOffer()
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
    handleChangePage("");
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(() => +event.target.value);
    handleChangePage("");
  };
  return (
    <Box sx={{ width: "90%", mr: "auto", ml: "auto" }}>
      {ActionButtons({
        path: location.pathname,
        setDelivered,
        rowsData: rowsData,
        refreshFunction: refresh,
        setLoading,
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
  );
};
export default EnhancedTable;
