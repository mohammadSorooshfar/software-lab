//base functions
import moment from "jalali-moment";
import { useRouter } from "next/router";

export const numberWithCommas = (itemVal: number) => {
  if (null == itemVal || undefined == itemVal) {
    return "";
  }
  return itemVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
// export const faToEnNumbers = (str: string) => {
//   if (str === undefined || str == null || str === "") {
//     return "";
//   }
//   return str.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
// };
export const enToFaNumbers = (str: string) => {
  if (str === undefined || str == null || str === "") {
    return "";
  }
  return str.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
};
export const faToEnNumbers = (str: string) => {
  if (str === undefined || str == null || str === "") {
    return "";
  }
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const element = str[i];
    switch (element) {
      case "۰":
        result += "0";
        break;
      case "۱":
        result += "1";
        break;
      case "۲":
        result += "2";
        break;
      case "۳":
        result += "3";
        break;
      case "۴":
        result += "4";
        break;
      case "۵":
        result += "5";
        break;
      case "۶":
        result += "6";
        break;
      case "۷":
        result += "7";
        break;
      case "۸":
        result += "8";
        break;
      case "۹":
        result += "9";
        break;
      default:
        result += element;
        break;
    }
  }
  return result;
};
export const persianMonth = (monthNumber: number) => {
  switch (monthNumber) {
    case 1:
      return "فروردین";
    case 2:
      return "اردیبهشت";
    case 3:
      return "خرداد";
    case 4:
      return "تیر";
    case 5:
      return "مرداد";
    case 6:
      return "شهریور";
    case 7:
      return "مهر";
    case 8:
      return "آبان";
    case 9:
      return "آذر";
    case 10:
      return "دی";
    case 11:
      return "بهمن";
    case 12:
      return "اسفند";
  }
};

export const persianDate = (thed: any, digit?: boolean) => {
  if (thed === undefined || thed === null) {
    return "";
  }
  console.log(thed);

  const m = moment(thed).locale("fa");

  if (digit) {
    return m.format("jYYYY/jMM/jDD");
  }
  return m.format("ddd jD jMMMM jYYYY");
};
export const convertSecondsToDate = (seconds: number) => {
  var date = new Date(0); // Start with the Unix epoch (January 1, 1970 00:00:00 UTC)
  date.setSeconds(seconds); // Set the number of seconds since the epoch

  return date;
};

export const getTemplateType = (id: number) => {
  switch (id) {
    case 1:
      return "پیمانکار(طرف دوم) انتخابی";
    case 2:
      return "طرف اول و دوم انتخابی";
    default:
      return "-";
  }
};

export const GetConfirmCartable = (id: number) => {
  switch (id) {
    case 1:
      return "حقوقی";
    case 2:
      return "بودجه";
    case 3:
      return "حقوقی و بودجه";
    default:
      return "-";
  }
};
export const getLabel = (selected: string) => {
  if (selected == "add") {
    return ["افزودن", "background-color: var(--blue-100)"];
  } else if (selected == "edit") {
    return ["ویرایش", "background-color: var(--orange-100)"];
  } else {
    return ["حذف", "background-color: var(--red-100)"];
  }
};

export const navigateToSib = () => {
  window.location.href = "http://sib.irmasir.ir/dashboard";
};

import { useLayoutEffect } from "react";

export const parseJwt = (token: string) => {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};
export const CheckUserExpired = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) return;
    const { exp } = parseJwt(token);
    console.log(exp * 1000, Date.now());

    if (exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  }
};

export function convertMiladiToShamsi(gy: number, gm: number, gd: number) {
  var g_d_m, jy, jm, jd, gy2, days;
  g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  gy2 = gm > 2 ? gy + 1 : gy;
  days =
    355666 +
    365 * gy +
    ~~((gy2 + 3) / 4) -
    ~~((gy2 + 99) / 100) +
    ~~((gy2 + 399) / 400) +
    gd +
    g_d_m[gm - 1];
  jy = -1595 + 33 * ~~(days / 12053);
  days %= 12053;
  jy += 4 * ~~(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += ~~((days - 1) / 365);
    days = (days - 1) % 365;
  }
  if (days < 186) {
    jm = 1 + ~~(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + ~~((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }
  return [jy + "/" + jm + "/" + jd];
}

export function isAnProductManagement(obj: any): obj is any {
  return obj.category;
}
export function isAnPriceManagement(obj: any): obj is any {
  return obj.price;
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
export function createOrderDataForManagementTable(data: any[]) {
  const orders: any[] = data.map((order) => ({
    id: order.id,
    name: order.userDescription.name + " " + order.userDescription.family,
    orderSubmitDate: order.orderSubmitDate,
    totalPrice: order.totalPrice,
  }));
  return orders;
}
export function createProductDataForManagementTable(data: any[]) {
  const products: any[] = data.map((product) => ({
    id: product.id,
    category: product.category,
    name: product.name,
    gender: product.gender,
    colors: product.colors,
    images: product.images,
  }));
  return products;
}

export function createPriceDataForManagementTable(data: any[]) {
  const products: any[] = data.map((product) => ({
    id: product.id,
    inventory: product.inventory,
    name: product.name,
    price: product.price,
  }));
  return products;
}

export const checkAuth = () => {
  if (typeof window !== "undefined") {
    if (localStorage?.hasOwnProperty("token")) {
      return true;
    } else {
      if (sessionStorage?.getItem("token")) {
        return true;
      }
      return false;
    }
  }
  return false;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    const router = useRouter();
    router.push("/");
  }
};

export const genderEnglish = (gender: string) => {
  switch (gender) {
    case "مردانه":
      return { en: "men", fa: "مردانه" };
    case "زنانه":
      return { en: "women", fa: "زنانه" };
    case "بچگانه":
      return { en: "kid", fa: "بچگانه" };

    default:
      break;
  }
};
export const categoryEnglish = (category: string) => {
  switch (category) {
    case "کتانی":
      return { en: "sneaker", fa: "کتانی" };
    case "رسمی":
      return { en: "oxford", fa: "رسمی" };
    case "ورزشی":
      return { en: "sport", fa: "ورزشی" };

    default:
      break;
  }
};
export const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};
export const colorGenerator = (color: string) => {
  switch (color) {
    case "قرمز":
      return "red";
    case "نارنجی":
      return "orange";
    case "مشکی":
      return "black";
    case "بنفش":
      return "purple";
    case "سفید":
      return "white";
    case "زرد":
      return "yellow";
    case "آبی":
      return "blue";
    case "نقره ای":
      return "silver";
    case "صورتی":
      return "pink";
    case "سبز":
      return "green";
    case "قهوه ای":
      return "brown";
    case "کرم":
      return "#E5C9B3";

    default:
      break;
  }
};
function addComma(num: string) {
  var str = num;
  str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str;
}
export const persianNumber = (number: string) => {
  number = addComma(number);
  let output = "";
  for (let index = 0; index < number.length; index++) {
    const num = number[index];

    switch (num) {
      case "1":
        output += "۱";
        break;
      case "2":
        output += "۲";
        break;
      case "3":
        output += "۳";
        break;
      case "4":
        output += "۴";
        break;
      case "5":
        output += "۵";
        break;
      case "6":
        output += "۶";
        break;
      case "7":
        output += "۷";
        break;
      case "8":
        output += "۸";
        break;
      case "9":
        output += "۹";
        break;
      case "0":
        output += "۰";
        break;
      case ",":
        output += ",";
        break;
      default:
        break;
    }
  }

  return output;
};
export const persianNumberWithoutComma = (number: string) => {
  let output = "";
  for (let index = 0; index < number.length; index++) {
    const num = number[index];

    switch (num) {
      case "1":
        output += "۱";
        break;
      case "2":
        output += "۲";
        break;
      case "3":
        output += "۳";
        break;
      case "4":
        output += "۴";
        break;
      case "5":
        output += "۵";
        break;
      case "6":
        output += "۶";
        break;
      case "7":
        output += "۷";
        break;
      case "8":
        output += "۸";
        break;
      case "9":
        output += "۹";
        break;
      case "0":
        output += "۰";
        break;
      default:
        output += num;
        break;
    }
  }

  return output;
};

export const disablePastDate = () => {
  let dtToday = new Date();

  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate();
  let year = dtToday.getFullYear();
  let monthString, dayString;
  if (month < 10) monthString = "0" + month.toString();
  if (day < 10) dayString = "0" + day.toString();

  return year + "-" + monthString + "-" + dayString;
};

export const ScrollToTop = ({ children }: any) => {
  const location = useRouter();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};
