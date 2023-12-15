import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { log } from "console";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setMessage } from "redux/apiMessage";
import { setUser } from "redux/user";
import { AuthService } from "services/AuthService";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string().required("نام کاربری وارد نمایید"),
  mobile_number: yup.string().required("شماره موبایل وارد نمایید"),
  password: yup
    .string()
    .min(8, "حداقل طول رمزعبور 8 می‌باشد")
    .required("رمزعبور وارد نمایید"),
});
export default function SignUp() {
  const authService = new AuthService();
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      mobile_number: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      authService
        .signUp(values.username, values.password, values.mobile_number)
        .then((res) => {
          if (typeof window !== "undefined") {
            localStorage.setItem("token", res.token);
          }
          dispatch(setUser(res));
          router.push("/");
          console.log(res.headers["set-cookie"]);

          toast.success("ورود با موفقیت صورت گرفت");
        })
        .catch((e) => {
          toast.error(e);
        });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ثبت نام
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            sx={{ marginTop: "1rem" }}
            fullWidth
            id="username"
            name="username"
            label="نام کاربری"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            sx={{ marginTop: "1rem" }}
            fullWidth
            id="mobile_number"
            name="mobile_number"
            label="شماره همراه"
            type="tel"
            value={formik.values.mobile_number}
            onChange={formik.handleChange}
            error={
              formik.touched.mobile_number &&
              Boolean(formik.errors.mobile_number)
            }
            helperText={
              formik.touched.mobile_number && formik.errors.mobile_number
            }
          />
          <TextField
            sx={{ marginTop: "1rem" }}
            fullWidth
            id="password"
            name="password"
            label="رمزعبور"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "success.dark",
              "&:hover": {
                bgcolor: "success.main",
              },
            }}
          >
            ثبت نام
          </Button>
          <Grid container>
            <Grid item>
              <Link href="login" variant="body2">
                {"ورود به حساب کاربری"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
