import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Slider,
  styled,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import debounce from "lodash.debounce";
import React, { useEffect, useMemo, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";

import { persianNumber } from "utilities";
const drawerWidth = 240;

const genders = {
  men: "مردانه",
  women: "زنانه",
  kid: "بچگانه",
};
const categories = {
  sport: "ورزشی",
  sneaker: "کتانی",
  oxford: "رسمی",
};
const colors = [
  "قرمز",
  "نارنجی",
  "مشکی",
  "بنفش",
  "سفید",
  "زرد",
  "آبی",
  "نقره ای",
  "صورتی",
  "سبز",
  "قهوه ای",
  "کرم",
];

interface priceProps {
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  setPriceDeal: React.Dispatch<React.SetStateAction<boolean>>;
}
const PriceSelect: React.FC<priceProps> = ({
  setMaxPrice,
  setMinPrice,
  setPriceDeal,
}) => {
  const [multiValue, setMultiValue] = useState([0, 10000000]);
  const [deal, setDeal] = useState(false);

  const changeMultiValue = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    if (Array.isArray(value)) setMultiValue(value);
  };
  const changeDeal = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setDeal(checked);
  };
  const BootstrapInput = styled(TextField)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: 14,
      width: "70px",
      padding: "5px 6px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
    },
  }));
  const handleClick = () => {
    setMaxPrice(multiValue[1].toString());
    setMinPrice(multiValue[0].toString());
    setPriceDeal(deal);
  };
  const debouncedChangeMultiValue = useMemo(
    () => debounce(changeMultiValue, 200),
    []
  );
  useEffect(() => {
    return () => {
      debouncedChangeMultiValue.cancel();
    };
  }, []);
  return (
    <Accordion
      elevation={0}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1e1e1e" : "white",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography gutterBottom={false}>محدوده قیمت </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingRight: 2,
          width: `${drawerWidth - 55}px`,
        }}
      >
        <Slider
          min={0}
          max={10000000}
          value={multiValue}
          onChange={changeMultiValue}
          sx={{
            "& .MuiSlider-thumb": {
              right: "90%",
            },
          }}
          componentsProps={{
            thumb: { style: { transform: "translate(0,-50%)" } },
          }}
          disableSwap
        />
        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"space-between"}
          mt={1}
        >
          <FormControl>
            <InputLabel
              shrink
              htmlFor="min-input"
              sx={{
                left: "auto",
                fontSize: "12px",
                transform: "translate(0px, 0px)",
              }}
            >
              از
            </InputLabel>
            <BootstrapInput
              id={"min-input"}
              name={"min"}
              value={persianNumber(multiValue[0].toString())}
            />
          </FormControl>
          <FormControl>
            <InputLabel
              shrink
              htmlFor="max-input"
              sx={{
                left: "auto",
                fontSize: "12px",
                transform: "translate(0px, 0px)",
              }}
            >
              تا
            </InputLabel>
            <BootstrapInput
              id={"max-input"}
              name={"max"}
              value={persianNumber(multiValue[1].toString())}
            />
          </FormControl>
        </Box>
        <FormGroup sx={{ mt: "1rem" }}>
          <FormControlLabel
            control={
              <Checkbox
                id="price_deal"
                name="price_deal"
                value={deal}
                onChange={changeDeal}
              />
            }
            label="قیمت توافقی"
          />
        </FormGroup>
        <Button
          variant="contained"
          color="info"
          onClick={handleClick}
          sx={{ marginTop: 2 }}
        >
          اعمال فیلتر
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};
const DateSelect: React.FC<any> = ({ setFromDate, setToDate }) => {
  const [startDate, setStartDate] = useState(new DateObject());
  const [endDate, setEndDate] = useState(new DateObject());
  const fromDateTitle = "از تاریخ";
  const toDateTitle = "تا تاریخ";

  const handleClick = () => {
    setFromDate(startDate);
    setToDate(endDate);
  };

  const persianDatePicker = ({
    date,
    setDate,
    title,
  }: {
    date: any;
    setDate: React.Dispatch<React.SetStateAction<any>>;
    title: string;
  }) => {
    return (
      <FormControl
        style={{
          marginBottom: "30px",
        }}
      >
        <InputLabel
          shrink
          htmlFor="requestedDeliveryDate-input"
          sx={{
            left: "auto",
            fontSize: "15px",
            transform: "translate(-3px, -25.5px)",
          }}
        >
          {title}
        </InputLabel>

        <div style={{ direction: "rtl" }}>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            calendarPosition="top-center"
            value={date}
            onChange={(e: any) => {
              setDate(e.toDate().getTime());
            }}
            editable={false}
          />
        </div>
      </FormControl>
    );
  };

  return (
    <Accordion
      elevation={0}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1e1e1e" : "white",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography gutterBottom={false}> تاریخ آگهی </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingRight: 2,
          width: `${drawerWidth - 55}px`,
        }}
      >
        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDirection={"column"}
          mt={1}
        >
          {persianDatePicker({
            date: startDate,
            setDate: setStartDate,
            title: fromDateTitle,
          })}
          {persianDatePicker({
            date: endDate,
            setDate: setEndDate,
            title: toDateTitle,
          })}
        </Box>
        <Button variant="contained" color="info" onClick={handleClick}>
          اعمال فیلتر
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};
const ColorCheckbox = ({
  setColorCheckbox,
}: {
  setColorCheckbox: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setColorCheckbox((prev) => [...prev, e.target.name]);
    } else {
      setColorCheckbox((prev) => {
        const index = prev.indexOf(e.target.name);
        prev.splice(index, 1);
        return [...prev];
      });
    }
  };
  return (
    <Accordion
      elevation={0}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1e1e1e" : "white",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography gutterBottom={false}> انتخاب رنگ </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "right",
          paddingRight: 2,
          width: `${drawerWidth - 80}px`,
        }}
      >
        <FormGroup>
          {colors.map((color) => (
            <FormControlLabel
              control={<Checkbox onChange={handleChange} name={color} />}
              label={color}
            />
          ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};
interface filterProps {
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  filterListMobileOpen: boolean;
  setPriceDeal: React.Dispatch<React.SetStateAction<boolean>>;
  setFromDate: React.Dispatch<React.SetStateAction<Date>>;
  setToDate: React.Dispatch<React.SetStateAction<Date>>;
}
const FilterSide: React.FC<filterProps> = ({
  setMaxPrice,
  setMinPrice,
  filterListMobileOpen,
  setPriceDeal,
  setFromDate,
  setToDate,
}) => {
  const drawer = (
    <Box>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h5">فیلتر‌ها</Typography>
      </Toolbar>
      <PriceSelect
        {...{
          setMaxPrice,
          setMinPrice,
          setPriceDeal,
        }}
      />
      <DateSelect
        {...{
          setFromDate,
          setToDate,
        }}
      />
    </Box>
  );
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            right: 0,
            border: "1px solid #5661686d",
            borderRadius: "10px",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1e1e1e" : "white",
            position: "static",
            minHeight: "80vh",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        anchor="right"
        transitionDuration={0}
        open={filterListMobileOpen}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            right: 0,
            borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default FilterSide;
