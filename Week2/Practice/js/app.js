import { createInitialState } from "./core/state.js";
import {
  ensureExpenseStorage,
  getExpenses,
  saveExpenses,
} from "./core/storage.js";
import { setupExpenseDetailModal } from "./features/expense-detail-modal.js";
import { setupExpenseFormModal } from "./features/expense-form-modal.js";
import { setupExpenseTable } from "./features/expense-table.js";
import { applyFilters, setupFilters } from "./features/filters.js";

document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp() {
  setupReloadButton();
  ensureExpenseStorage();

  const state = createInitialState();
  state.expenses = getExpenses();

  const expenseTable = setupExpenseTable(state, {
    onDelete: () => {
      saveExpenses(state.expenses);
      refreshTable(state, expenseTable.render);
    },
  });

  setupFilters(state, () => {
    refreshTable(state, expenseTable.render);
  });

  setupExpenseFormModal(state, {
    onAdd: () => {
      saveExpenses(state.expenses);
      refreshTable(state, expenseTable.render);
    },
  });

  setupExpenseDetailModal(state);

  // 초기 데이터 기준으로 필터와 테이블 화면을 한 번 맞춰두는 용도
  refreshTable(state, expenseTable.render);
}

function setupReloadButton() {
  const reloadButton = document.querySelector('[data-action="페이지-새로고침"]');

  if (!reloadButton) {
    return;
  }

  reloadButton.addEventListener("click", () => {
    window.location.reload();
  });
}

function refreshTable(state, renderTable) {
  // 현재 필터 조건으로 보여줄 목록을 다시 계산하는 흐름임
  applyFilters(state);
  renderTable();
}
