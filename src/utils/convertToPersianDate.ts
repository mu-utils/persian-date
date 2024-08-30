const convertToPersianDate = (value: Date | string | number): Date =>
  new Date(new Date(value).toLocaleString("fa-IR-u-nu-latn"));

export default convertToPersianDate;
