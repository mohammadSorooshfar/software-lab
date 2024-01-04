import { Box, styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  convertSecondsToDate,
  persianDate,
  persianNumber,
  persianNumberWithoutComma,
} from "utilities";

export default function ProductCard({
  product,
  height,
}: {
  product: any;
  height: string;
}) {
  return (
    <Card elevation={1} sx={{ width: "100%" }}>
      <Box
        sx={{
          minHeight: height,
          pt: 2,
        }}
        width={"100%"}
      >
        <Link
          href={`/product/${product.id}`}
          style={{
            textDecoration: "none",
          }}
        >
          <CardMedia
            component="img"
            height={`${+height - +height / 3}px`}
            width={"100%"}
            image={product.image_urls[0]}
            alt={product.title}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
              // objectFit: "contain",
            }}
          />
        </Link>
        <CardContent>
          <Link
            href={`/product/${product.id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
                color: (theme) =>
                  theme.palette.mode === "light" ? "primary.main" : "white",
              }}
            >
              {product.book_title}
            </Typography>
          </Link>
          <Box
            sx={{ mt: "1rem" }}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="subtitle1" textAlign={"left"}>
              قیمت: {persianNumber(product.price.toString()) + " تومان"}
            </Typography>
          </Box>
          <Box
            sx={{ mt: "1rem" }}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Typography variant={"h6"} textAlign={"right"}>
              تاریخ:
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
        </CardContent>
      </Box>
    </Card>
  );
}
