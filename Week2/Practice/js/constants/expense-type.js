export const EXPENSE_TYPE = {
  INCOME: "income",
  EXPENSE: "expense",
};

const EXPENSE_TYPE_LABEL = {
  [EXPENSE_TYPE.INCOME]: "수입",
  [EXPENSE_TYPE.EXPENSE]: "지출",
};

export function getExpenseTypeKey(expense) {
  return expense.amount >= 0 ? EXPENSE_TYPE.INCOME : EXPENSE_TYPE.EXPENSE;
}

export function getExpenseTypeLabel(type) {
  return EXPENSE_TYPE_LABEL[type] ?? "";
}
