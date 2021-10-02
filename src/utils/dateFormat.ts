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
  }
}