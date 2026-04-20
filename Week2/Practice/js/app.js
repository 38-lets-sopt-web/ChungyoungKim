import { createInitialState } from "./core/state.js";
import { ensureExpenseStorage, getExpenses } from "./core/storage.js";
import { setupExpenseDetailModal } from "./features/expense-detail-modal.js";
import { setupExpenseFormModal } from "./features/expense-form-modal.js";
import { setupExpenseTable } from "./features/expense-table.js";
import { setupFilters } from "./features/filters.js";

document.addEventListener("DOMContentLoaded", () => {
  const reloadButton = document.querySelector('[data-action="페이지-새로고침"]');

  if (reloadButton) {
    reloadButton.addEventListener("click", () => {
      window.location.reload();
    });
  }

  ensureExpenseStorage();

  const state = createInitialState();

  state.expenses = getExpenses();
  state.filteredExpenses = [...state.expenses];

  setupFilters(state);
  setupExpenseTable(state);
  setupExpenseFormModal(state);
  setupExpenseDetailModal(state);
});
