import { expenses } from "../data/expenses.js";

const STORAGE_KEY = "expenseData";

export function ensureExpenseStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }
}

export function getExpenses() {
  const storedExpenses = localStorage.getItem(STORAGE_KEY);
  return storedExpenses ? JSON.parse(storedExpenses) : [];
}

export function saveExpenses(expenses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}
