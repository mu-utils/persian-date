import toGregorianDate from "../utils/gregorian/toGregorianDate";
import { toPersianDate } from "../utils/persian/toPersianDate";
import isPersianLeapYear from "../utils/persian/isPersianLeapYear";
import {
  PERSIAN_MONTH_NAMES_FA,
  PERSIAN_MONTH_NAMES_EN,
} from "../constants/persianCalendar";
import { isPersianYear } from "../utils/persian/isValidPersian";

declare module "dayjs" {
  interface Dayjs {
    calendar(calendar: "jalali" | "gregory" | "gregorian" | "persian" | string): this;
    isJalali(): boolean;
  }
  function calendar(
    calendar: "jalali" | "gregory" | "gregorian" | "persian" | string
  ): typeof import("dayjs");
}

const REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})[-/]?(\d{0,2})(.*)?$/;
const REGEX_FORMAT =
  /\[.*?\]|jYYYY|jYY|jMMMM|jMMM|jMM|jM|jDD|jD|YYYY|YY|MMMM|MMM|MM|M|DD|D|dddd|ddd|HH|H|hh|h|mm|m|ss|s|SSS|a|A/g;

export const dayjsPlugin = (_option: unknown, Dayjs: any, dayjs: any) => {
  const proto = Dayjs.prototype;

  dayjs.$C = "gregory";

  dayjs.calendar = function (calendar: string) {
    dayjs.$C = calendar;
    return dayjs;
  };

  const oldClone = proto.clone;
  proto.clone = function () {
    const that = oldClone.bind(this)();
    that.$C = this.$C;
    if (that.isJalali()) {
      that.initJalali();
    }
    return that;
  };

  proto.calendar = function (calendar: string) {
    const that = this.clone();
    that.$C = calendar;
    if (that.isJalali()) {
      that.initJalali();
    }
    return that;
  };

  proto.isJalali = function () {
    return this.$C === "jalali" || this.$C === "persian";
  };

  proto.initJalali = function () {
    const date = this.toDate();
    if (!date || isNaN(date.getTime())) {
      this.$jy = NaN;
      this.$jM = NaN;
      this.$jD = NaN;
      return;
    }
    const p = toPersianDate(date.getTime(), {});
    this.$jy = p.year;
    this.$jM = p.month - 1; // 0-indexed in dayjs convention
    this.$jD = p.day;
  };

  const oldInit = proto.init;
  proto.init = function () {
    oldInit.bind(this)();
    if (this.isJalali()) {
      this.initJalali();
    }
  };

  const oldParse = proto.parse;
  proto.parse = function (cfg: any) {
    if (cfg.jalali) {
      this.$C = "jalali";
    } else {
      this.$C = cfg.calendar || this.$C || dayjs.$C;
    }

    if (
      (cfg.jalali || this.$C === "jalali" || this.$C === "persian") &&
      typeof cfg.date === "string"
    ) {
      const match = cfg.date.match(REGEX_PARSE);
      if (match) {
        const y = parseInt(match[1], 10);
        const m = parseInt(match[2], 10);
        const d = parseInt(match[3] || "1", 10);
        if (isPersianYear(y) || cfg.jalali) {
          const gDate = toGregorianDate(y, m, d);
          cfg.date = gDate;
        }
      }
    }
    const res = oldParse.bind(this)(cfg);
    if (this.isJalali()) {
      this.initJalali();
    }
    return res;
  };

  const oldFormat = proto.format;
  proto.format = function (formatStr?: string) {
    const isJ = this.isJalali();
    if (!formatStr && !isJ) {
      return oldFormat.bind(this)(formatStr);
    }
    if (isJ && (!this.$jy || isNaN(this.$jy))) {
      this.initJalali();
    }
    const template = formatStr || "YYYY-MM-DDTHH:mm:ssZ";
    return template.replace(REGEX_FORMAT, (match: string) => {
      if (match.startsWith("[") && match.endsWith("]")) {
        return match.slice(1, -1);
      }
      if (!isJ && !match.startsWith("j")) {
        return oldFormat.bind(this)(match);
      }
      if (!isJ && match.startsWith("j") && (!this.$jy || isNaN(this.$jy))) {
        this.initJalali();
      }
      const jy = this.$jy;
      const jm = this.$jM + 1; // 1-12
      const jd = this.$jD;
      switch (match) {
        case "jYYYY":
        case "YYYY":
          return String(jy);
        case "jYY":
        case "YY":
          return String(jy).slice(-2);
        case "jMMMM":
        case "MMMM":
          return PERSIAN_MONTH_NAMES_FA[this.$jM];
        case "jMMM":
        case "MMM":
          return PERSIAN_MONTH_NAMES_EN[this.$jM];
        case "jMM":
        case "MM":
          return String(jm).padStart(2, "0");
        case "jM":
        case "M":
          return String(jm);
        case "jDD":
        case "DD":
          return String(jd).padStart(2, "0");
        case "jD":
        case "D":
          return String(jd);
        default:
          return oldFormat.bind(this)(match);
      }
    });
  };

  const oldDaysInMonth = proto.daysInMonth;
  proto.daysInMonth = function () {
    if (!this.isJalali()) {
      return oldDaysInMonth.bind(this)();
    }
    const m = this.$jM + 1;
    if (m <= 6) return 31;
    if (m <= 11) return 30;
    return isPersianLeapYear(this.$jy) ? 30 : 29;
  };

  const oldYear = proto.year;
  proto.year = function (year?: number) {
    if (!this.isJalali()) {
      return oldYear.bind(this)(year);
    }
    if (year === undefined) {
      return this.$jy;
    }
    const gDate = toGregorianDate(year, this.$jM + 1, this.$jD);
    gDate.setHours(
      this.$d.getHours(),
      this.$d.getMinutes(),
      this.$d.getSeconds(),
      this.$d.getMilliseconds()
    );
    const inst = this.clone();
    inst.$d = gDate;
    inst.init();
    return inst;
  };

  const oldMonth = proto.month;
  proto.month = function (month?: number) {
    if (!this.isJalali()) {
      return oldMonth.bind(this)(month);
    }
    if (month === undefined) {
      return this.$jM;
    }
    const gDate = toGregorianDate(this.$jy, month + 1, this.$jD);
    gDate.setHours(
      this.$d.getHours(),
      this.$d.getMinutes(),
      this.$d.getSeconds(),
      this.$d.getMilliseconds()
    );
    const inst = this.clone();
    inst.$d = gDate;
    inst.init();
    return inst;
  };

  const oldDate = proto.date;
  proto.date = function (date?: number) {
    if (!this.isJalali()) {
      return oldDate.bind(this)(date);
    }
    if (date === undefined) {
      return this.$jD;
    }
    const gDate = toGregorianDate(this.$jy, this.$jM + 1, date);
    gDate.setHours(
      this.$d.getHours(),
      this.$d.getMinutes(),
      this.$d.getSeconds(),
      this.$d.getMilliseconds()
    );
    const inst = this.clone();
    inst.$d = gDate;
    inst.init();
    return inst;
  };

  const oldStartOf = proto.startOf;
  proto.startOf = function (units: string, startOf?: boolean) {
    if (!this.isJalali()) {
      return oldStartOf.bind(this)(units, startOf);
    }
    const isStart = startOf !== undefined ? startOf : true;
    const u = units.endsWith("s") ? units.slice(0, -1) : units;
    if (u === "year") {
      const gDate = toGregorianDate(this.$jy, 1, 1);
      gDate.setHours(0, 0, 0, 0);
      const inst = this.clone();
      inst.$d = gDate;
      inst.init();
      return isStart ? inst : inst.endOf("year");
    }
    if (u === "month") {
      const gDate = toGregorianDate(this.$jy, this.$jM + 1, 1);
      gDate.setHours(0, 0, 0, 0);
      const inst = this.clone();
      inst.$d = gDate;
      inst.init();
      return isStart ? inst : inst.endOf("month");
    }
    const res = oldStartOf.bind(this)(units, startOf);
    res.$C = this.$C;
    if (res.isJalali()) res.initJalali();
    return res;
  };

  const oldEndOf = proto.endOf;
  proto.endOf = function (units: string) {
    if (!this.isJalali()) {
      return oldEndOf.bind(this)(units);
    }
    const u = units.endsWith("s") ? units.slice(0, -1) : units;
    if (u === "year") {
      const days = isPersianLeapYear(this.$jy) ? 30 : 29;
      const gDate = toGregorianDate(this.$jy, 12, days);
      gDate.setHours(23, 59, 59, 999);
      const inst = this.clone();
      inst.$d = gDate;
      inst.init();
      return inst;
    }
    if (u === "month") {
      const days = this.daysInMonth();
      const gDate = toGregorianDate(this.$jy, this.$jM + 1, days);
      gDate.setHours(23, 59, 59, 999);
      const inst = this.clone();
      inst.$d = gDate;
      inst.init();
      return inst;
    }
    const res = oldEndOf.bind(this)(units);
    res.$C = this.$C;
    if (res.isJalali()) res.initJalali();
    return res;
  };

  const oldAdd = proto.add;
  proto.add = function (value: number, unit: string) {
    if (!this.isJalali()) {
      return oldAdd.bind(this)(value, unit);
    }
    const u = unit.endsWith("s") ? unit.slice(0, -1) : unit;
    if (u === "year") {
      return this.year(this.year() + value);
    }
    if (u === "month") {
      const totalMonths = (this.$jy * 12) + this.$jM + value;
      const newYear = Math.floor(totalMonths / 12);
      const newMonth = ((totalMonths % 12) + 12) % 12;
      const maxDays = newMonth < 6 ? 31 : newMonth < 11 ? 30 : isPersianLeapYear(newYear) ? 30 : 29;
      const newDay = Math.min(this.$jD, maxDays);
      const gDate = toGregorianDate(newYear, newMonth + 1, newDay);
      gDate.setHours(
        this.$d.getHours(),
        this.$d.getMinutes(),
        this.$d.getSeconds(),
        this.$d.getMilliseconds()
      );
      const inst = this.clone();
      inst.$d = gDate;
      inst.init();
      return inst;
    }
    const res = oldAdd.bind(this)(value, unit);
    res.$C = this.$C;
    if (res.isJalali()) res.initJalali();
    return res;
  };

  proto.subtract = function (value: number, unit: string) {
    return this.add(-value, unit);
  };
};

export const jalaliday = dayjsPlugin;
export default dayjsPlugin;
