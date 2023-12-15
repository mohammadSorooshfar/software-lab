import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  InputBase,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FilterSide from "components/filterSide/FilterSide";
import ProductCard from "components/productCard/ProductCard";
import UserLayout from "layouts/User.Layout";
import debounce from "lodash.debounce";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BookService } from "services/BookService";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<any>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState<any>("");
  const [minPrice, setMinPrice] = useState<any>("");
  const [searchText, setSearchText] = useState<any>("");
  const [priceDeal, setPriceDeal] = useState(false);
  const [fromDate, setFromDate] = useState<any>("");
  const [toDate, setToDate] = useState<any>("");
  const [filterListMobileOpen, setFilterListMobileOpen] = useState(false);
  const [page, setPage] = useState(1);
  const bookService = new BookService();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [filters, setFilters] = useState<{ name: string; value: string }[]>([
    // { name: "gender.en", value: gender === "all" ? "" : gender },
    // { name: "category.en", value: category === "all" ? "" : category },
    // { name: "_sort", value: sortBy },
    // { name: "_order", value: order },
    // { name: "name_like", value: searchedName },
  ]);
  const handleChangePage = (event: unknown, newPage: number) => {
    setLoading(true);
    getProductsData();
    setPage(newPage);
    document.documentElement.scrollTo(0, 0);
  };
  const getProductsData = () => {
    console.log(priceDeal);

    bookService
      .search(fromDate, toDate, +minPrice, +maxPrice, searchText)
      .then((res) => {
        setProducts(res.offers);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProductsData();
  }, [
    fromDate,
    toDate,
    sortBy,
    order,
    maxPrice,
    minPrice,
    priceDeal,
    searchText,
  ]);

  const changeSort = (sort: string, order: string) => {
    setSortBy(sort);
    setOrder(order);
  };
  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setSearchedName(e.target.value);
  };
  const debouncedSearchChangeHandler = useMemo(
    () => debounce(searchChangeHandler, 500),
    []
  );
  useEffect(() => {
    return () => {
      debouncedSearchChangeHandler.cancel();
    };
  }, []);
  return (
    <UserLayout setSearchText={setSearchText}>
      <Paper>
        <Container maxWidth={"xl"} sx={{ paddingTop: 3, paddingBottom: 10 }}>
          <Box display={"flex"} width={"100%"} minHeight={"60vh"}>
            <FilterSide
              {...{
                setMaxPrice,
                setMinPrice,
                filterListMobileOpen,
                setPriceDeal,
                setFromDate,
                setToDate,
              }}
            />
            <Box width={"90%"} minHeight={"100%"}>
              <Grid
                container
                spacing={matches ? 2 : 3}
                padding={2}
                justifyContent={matches ? "center" : "flex-start"}
              >
                {loading ? (
                  <CircularProgress
                    sx={{ margin: "auto", marginTop: "100px" }}
                  />
                ) : products?.length ? (
                  products.map((product: any) => (
                    <Grid item xs={10} md={6} lg={4}>
                      <ProductCard product={product} height={"350"} />
                    </Grid>
                  ))
                ) : (
                  <Typography variant="h4" margin={"auto"} marginTop={"10%"}>
                    محصولی یافت نشد!!
                  </Typography>
                )}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Paper>
    </UserLayout>
  );
};

export default Products;
