import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as React from "react";
import { toast } from "react-toastify";
import { OfferService } from "services/OfferService";
import * as yup from "yup";

const validationSchema = yup.object({});
interface props {
  open: any;
  setOpen: any;
  handleSubmit: any;
  initProduct?: any;
  edit: boolean;
  refresh: any;
}
const AddModal: React.FC<props> = ({
  open,
  setOpen,
  initProduct,
  edit,
  refresh,
}) => {
  const offerSerivce = new OfferService();
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      price_deal: false,
      image_urls: "",
      isbn: 0,
      publisher: "",
      edition: 0,
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      offerSerivce
        .add(
          values.name,
          +values.price,
          values.price_deal,
          [values.image_urls],
          values.isbn,
          values.publisher,
          +values.edition,
          values.description
        )
        .then((res) => {
          handleClose();
          refresh();
          toast.success("آگهی با موفقیت ثبت شد");
        })
        .catch((e) => {
          toast.error(e);
        });
    },
  });

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <Dialog open={open} onClose={handleClose} dir="rtl" fullWidth>
      <DialogTitle sx={{ pt: 2 }}>
        {initProduct ? "ویرایش" : "افزودن"} آگهی
      </DialogTitle>
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
              sx={{ width: "45%" }}
              fullWidth
              id="name"
              name="name"
              label="نام کتاب"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              sx={{ width: "45%" }}
              fullWidth
              id="price"
              name="price"
              label="قیمت"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              disabled={formik.values.price_deal}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <TextField
              sx={{ width: "45%" }}
              fullWidth
              id="isbn"
              name="isbn"
              label="isbn"
              value={formik.values.isbn}
              onChange={formik.handleChange}
              error={formik.touched.isbn && Boolean(formik.errors.isbn)}
              helperText={formik.touched.isbn && formik.errors.isbn}
            />
            <TextField
              sx={{ width: "45%" }}
              fullWidth
              id="publisher"
              name="publisher"
              label="نویسنده"
              value={formik.values.publisher}
              onChange={formik.handleChange}
              error={
                formik.touched.publisher && Boolean(formik.errors.publisher)
              }
              helperText={formik.touched.publisher && formik.errors.publisher}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <TextField
              sx={{ width: "45%" }}
              fullWidth
              id="edition"
              name="edition"
              label="نسخه"
              value={formik.values.edition}
              onChange={formik.handleChange}
              error={formik.touched.edition && Boolean(formik.errors.edition)}
              helperText={formik.touched.edition && formik.errors.edition}
            />
            <TextField
              sx={{ width: "45%" }}
              fullWidth
              id="description"
              name="description"
              label="توضیحات"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <TextField
              sx={{ width: "45%" }}
              fullWidth
              id="image_urls"
              name="image_urls"
              label="لینک تصویر"
              value={formik.values.image_urls}
              onChange={formik.handleChange}
              error={
                formik.touched.image_urls && Boolean(formik.errors.image_urls)
              }
              helperText={formik.touched.image_urls && formik.errors.image_urls}
            />
            <FormGroup sx={{ width: "45%" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="price_deal"
                    name="price_deal"
                    value={formik.values.price_deal}
                    onChange={formik.handleChange}
                    disabled={!!formik.values.price}
                  />
                }
                label="قیمت توافقی"
              />
            </FormGroup>
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
              {initProduct ? "ویرایش" : "افزودن"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddModal;
