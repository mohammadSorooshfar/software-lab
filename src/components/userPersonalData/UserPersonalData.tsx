import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UserService } from "services/UserService";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string().required("نام کاربری وارد نمایید"),
  mobile_number: yup.string(),
  email: yup.string(),
  city: yup.string(),
});
export default function UserPersonalData() {
  const userService = new UserService();
  const router = useRouter();
  const dispatch = useDispatch();

  const userData = useSelector((state: any) => state.user.userData);

  const formik = useFormik({
    initialValues: {
      username: "",
      mobile_number: "",
      email: "",
      city: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      userService
        .update(
          values.username,
          values.email,
          values.mobile_number,
          values.city
        )
        .then((res) => {
          toast.success("ویرایش اطلاعات با موفقیت انجام شد");
        })
        .catch((e) => {
          toast.error(e);
        });
    },
  });

  React.useEffect(() => {
    userService.get(userData.user_id).then((res) => {
      const { username, mobile_number, email, city } = res;
      formik.setValues({
        username: username || "",
        mobile_number: mobile_number || "",
        email: email || "",
        city: city || "",
      });
    });
  }, []);
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
        }}
      >
        <form
          style={{
            width: "100%",
          }}
          onSubmit={formik.handleSubmit}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <TextField
              sx={{ marginTop: "1rem", marginRight: "1rem" }}
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
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <TextField
              sx={{ marginTop: "1rem", marginRight: "1rem" }}
              fullWidth
              id="city"
              name="city"
              label="شهر"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
            <TextField
              sx={{ marginTop: "1rem" }}
              fullWidth
              id="email"
              name="email"
              label="ایمیل"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <Button
              type="submit"
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
              ویرایش
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
