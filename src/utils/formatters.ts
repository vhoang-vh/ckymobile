export const formatCurrency = (amount: number): string =>
  `${new Intl.NumberFormat("vi-VN").format(amount)} đ`;

export const formatDate = (date: string): string => {
  const parsed = new Date(`${date}T00:00:00`);
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsed);
};

export const todayISO = (): string => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};
