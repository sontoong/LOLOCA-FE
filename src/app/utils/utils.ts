export const formatCurrency = (amount: number) => {
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const formatUnixToLocal = (
  unixTimestamp: number,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  },
  locale: string = "vi-VN"
) => {
  const milliseconds = unixTimestamp;
  const date = new Date(milliseconds);
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatDate = (isoString : string) => {
  const date = new Date(isoString);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "vi-VN"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatToTimeDifference = (
  timeDifference: number,
  locale: string = "vi-VN"
) => {
  const options: Intl.RelativeTimeFormatOptions = {
    numeric: "auto",
  };
  const formatter = new Intl.RelativeTimeFormat(locale, options);

  if (timeDifference < 60000) {
    return formatter.format(-Math.floor(timeDifference / 1000), "second");
  } else if (timeDifference < 3600) {
    return formatter.format(-Math.floor(timeDifference / 60000), "minute");
  } else if (timeDifference < 86400) {
    return formatter.format(-Math.floor(timeDifference / 3600000), "hour");
  } else {
    return formatter.format(-Math.floor(timeDifference / 86400000), "day");
  }
};

export const calculateDateToNow = (
  time: string | number,
  locale: string = "vi-VN"
) => {
  if (typeof time === "string") {
    time = Date.parse(time);
  }
  //exclude the milisecond from Date
  const today = Math.floor(Date.now());

  const timeDifference = today - time;
  return formatToTimeDifference(timeDifference, locale);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const isEmptyObject = (obj: object) => {
  return Object.keys(obj).length === 0;
};
