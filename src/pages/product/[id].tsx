import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import moment from "jalali-moment";
import UserLayout from "layouts/User.Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BookService } from "services/BookService";
import { UserService } from "services/UserService";
import {
  colorGenerator,
  convertSecondsToDate,
  enToFaNumbers,
  persianDate,
  persianNumber,
  persianNumberWithoutComma,
} from "utilities/index";

interface props {}

const ProductDetails: React.FC<props> = () => {
  const { id = 0 } = useRouter().query;
  const [product, setProduct] = useState<any>();
  const [ownerData, setOwnerData] = useState<any>();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const bookService = new BookService();
  const userService = new UserService();

  useEffect(() => {
    if (id != 0) {
      bookService
        .info(Array.isArray(id) ? +id[0] : +id)
        .then((res) => {
          setProduct(res);
          userService.get(res?.owner_id).then((response) => {
            setOwnerData(response);
          });
        })
        .catch((e) => console.log(e));
    }
  }, [id]);

  return (
    <UserLayout>
      <Container
        maxWidth={"md"}
        sx={{ padding: 3, "& .MuiPaper-root": { borderRadius: 0 } }}
      >
        <Grid container spacing={2} justifyContent={matches ? "center" : ""}>
          <Grid item xs={12} sm={10} md={6} padding={matches ? 1 : 4}>
            <Breadcrumbs separator={<NavigateBeforeIcon fontSize="small" />}>
              <Link href={`/`} style={{ textDecoration: "none" }}>
                <Typography color="text.primary">آگهی ها</Typography>{" "}
              </Link>
            </Breadcrumbs>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              flexDirection={"column"}
              alignItems={"center"}
              minHeight={matches ? "100%" : "70%"}
            >
              <Box display={"flex"} width={"100%"}>
                <Typography
                  sx={{ mt: "1rem" }}
                  variant={matches ? "h5" : "h4"}
                  textAlign={"right"}
                >
                  {product?.book_title}
                </Typography>
              </Box>
              <Box
                sx={{ mt: "1rem" }}
                display={"flex"}
                justifyContent={"space-between"}
                width={"100%"}
              >
                <Typography
                  sx={{ mt: "1rem" }}
                  variant={"h6"}
                  textAlign={"right"}
                >
                  تاریخ:
                </Typography>
                <Typography
                  sx={{ mt: "1rem" }}
                  variant={"h6"}
                  textAlign={"right"}
                >
                  {product
                    ? persianNumberWithoutComma(
                        persianDate(
                          // moment(product?.created_at.seconds).format("YYYY/M/D")
                          convertSecondsToDate(product?.created_at.seconds)
                        )
                      )
                    : ""}
                </Typography>
              </Box>

              <Divider sx={{ width: "100%" }} />
              <Box
                sx={{ mt: "1rem" }}
                display={"flex"}
                justifyContent={"space-between"}
                width={"100%"}
              >
                <Typography variant={"h6"}>قیمت:</Typography>
                <Typography variant={"h6"}>
                  {product ? persianNumber(product.price.toString()) : ""} تومان
                </Typography>
              </Box>

              <Divider sx={{ width: "100%" }} />
              <Box
                sx={{ mt: "1rem" }}
                display={"flex"}
                justifyContent={"space-between"}
                width={"100%"}
              >
                <Typography variant={"h6"}>شماره تماس:</Typography>
                <Typography variant={"h6"}>
                  {enToFaNumbers(ownerData?.mobile_number)}
                </Typography>
              </Box>
              <Divider sx={{ width: "100%" }} />
              <Box
                sx={{ mt: "1rem" }}
                display={"flex"}
                justifyContent={"space-between"}
                width={"100%"}
              >
                <Typography variant={"h6"}>ایمیل:</Typography>
                <Typography variant={"body1"}>
                  {ownerData?.email ? enToFaNumbers(ownerData?.email) : "ندارد"}
                </Typography>
              </Box>
              <Divider sx={{ width: "100%" }} />
              <Box
                sx={{ mt: "1rem" }}
                display={"flex"}
                flexDirection={"column"}
                width={"100%"}
              >
                <Typography sx={{ my: "1rem" }} variant="h5">
                  توضیحات:{" "}
                </Typography>
                <Typography variant="body1">{product?.description}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              width={500}
              height={500}
              src={product?.image_urls[0]}
              alt="photo"
            />
          </Grid>
        </Grid>
      </Container>
    </UserLayout>
  );
};

export default ProductDetails;
