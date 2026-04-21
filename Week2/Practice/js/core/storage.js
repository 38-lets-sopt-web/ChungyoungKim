import { expenses } from "../data/expenses.js";

const STORAGE_KEY = "expenseData";

export function ensureExpenseStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }
}

export function getExpenses() {
  const storedExpenses = localStorage.getItem(STORAGE_KEY);

  if (!storedExpenses) {
    return [];
  }

  // 저장된 데이터가 유효한 JSON이 아닐 경우를 대비해 예외 처리하는 방식
  try {
    return JSON.parse(storedExpenses);
  } catch {
    return [];
  }
}

export function saveExpenses(expenses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}
