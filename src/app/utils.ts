import dayjs from "dayjs";

export function kFormatter(num: number) {
  return Math.abs(num) > 999
    ? Math.sign(num) * +(Math.abs(num) / 1000).toFixed(1) + "K"
    : Math.sign(num) * Math.abs(num);
}

export function hundredFormatter(num: number) {
  return num > 100 ? "99+" : num;
}

export function convertDate(date: string) {
  const newDate = new Date(date);
  if (newDate.getFullYear() === new Date().getFullYear()) {
    return dayjs(newDate).format("DD MMM");
  } else {
    return dayjs(newDate).format("DD MMM YYYY");
  }
}
