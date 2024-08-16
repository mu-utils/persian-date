export default class PersianDate extends Date {
  private toPersianDigits(n: string): string {
    return n.replace(/[۰-۹]/g, (d) =>
      String(d.charCodeAt(0) - "۰".charCodeAt(0))
    );
  }
}
