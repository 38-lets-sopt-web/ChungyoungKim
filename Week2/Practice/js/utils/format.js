export function formatAmount(amount) {
  return amount.toLocaleString("ko-KR");
}

export function formatSignedAmount(amount) {
  const prefix = amount > 0 ? "+" : "";
  return `${prefix}${formatAmount(amount)}`;
}
