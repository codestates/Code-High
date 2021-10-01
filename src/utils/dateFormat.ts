
export const daySet = {
  formatDate: (date: Date) => {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  },
  today: () => {
    return daySet.calculateDate(0);
  },
  yesterday: () => {
    return daySet.calculateDate(-1);
  },
  calculateDate: (day: number) => {
    const date = new Date();
    date.setDate(date.getDate() + day);
    return daySet.formatDate(date);
  }
}