export const dateFormat = {
  formatDate: (date: Date) => {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  },
  today: () => {
    return dateFormat.calculateDate(0);
  },
  yesterday: () => {
    return dateFormat.calculateDate(-1);
  },
  calculateDate: (day: number) => {
    const date = new Date();
    date.setDate(date.getDate() + day);
    return dateFormat.formatDate(date);
  },
  getNumberOfDays: (start: string, end: string) => {
    const date1 = new Date(start);
    const date2 = new Date(end);

    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);
    return diffInDays;
  }
}

export const formUrlEncoded = x =>
Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');