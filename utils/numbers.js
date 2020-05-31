export function numberWithCommas(x) {
  if (x.toString().indexOf(".") > 0) {
    return x
      .toString()
      .substring(0, x.toString().indexOf("."))
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
    return x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}
