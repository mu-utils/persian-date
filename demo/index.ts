import PersianDate from "persian-date";

const date = new PersianDate();

const a = date.toLocaleString("fa-IR-u-nu-latn");
//   .split("/")
//   .map((d) =>
//     d.replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - "۰".charCodeAt(0)))
//   )
//   .join("-");

console.log(new Date(a), a);
