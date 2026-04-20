import { formatSignedAmount } from "../utils/format.js";
import { saveExpenses } from "../core/storage.js";
import { applyFilters } from "./filters.js";

export function setupExpenseTable(state) {
  const sortSelect = document.querySelector(".expense-table__sort-select");
  const tableBody = document.querySelector(".expense-table__body");
  const selectAllCheckbox = document.querySelector("#expense-select-all");
  const totalValue = document.querySelector(".expense-table__total-value");
  const deleteButton = document.querySelector('[data-action="선택-삭제"]');

  if ( !sortSelect || !tableBody || !selectAllCheckbox || !totalValue || !deleteButton) {
    return;
  }

  const renderTable = () => {
    const visibleExpenses = sortExpenses(state.filteredExpenses, state.sortOrder);
    const visibleIds = visibleExpenses.map((expense) => expense.id);

    state.selectedIds = new Set(
      [...state.selectedIds].filter((id) => visibleIds.includes(id))
    );

    if (visibleExpenses.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="expense-table__empty">
            검색 조건에 맞는 내역이 없습니다.
          </td>
        </tr>
      `;
      totalValue.textContent = "0";
      selectAllCheckbox.checked = false;
      selectAllCheckbox.indeterminate = false;
      selectAllCheckbox.disabled = true;
      deleteButton.disabled = true;
      return;
    }

    tableBody.innerHTML = visibleExpenses.map((expense) => {
        const isChecked = state.selectedIds.has(expense.id);
        const amountClass = expense.amount >= 0
            ? "expense-table__amount expense-table__amount--positive"
            : "expense-table__amount expense-table__amount--negative";

        return `
          <tr>
            <td class="expense-table__checkbox-cell">
              <input
                type="checkbox"
                class="expense-table__checkbox expense-table__row-checkbox"
                data-id="${expense.id}"
                aria-label="${expense.title} 선택"
                ${isChecked ? "checked" : ""}
              />
            </td>
            <td>
              <button
                type="button"
                class="expense-table__title-button"
                data-action="상세-열기"
                data-id="${expense.id}"
              >
                ${expense.title}
              </button>
            </td>
            <td>${expense.date}</td>
            <td>${expense.category}</td>
            <td>${expense.payment}</td>
            <td class="expense-table__amount-cell">
              <span class="${amountClass}">${formatSignedAmount(expense.amount)}</span>
            </td>
          </tr>
        `;
      })
      .join("");

    const totalAmount = visibleExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    totalValue.textContent = formatSignedAmount(totalAmount);
    totalValue.className = "expense-table__total-value";
    totalValue.innerHTML = `<span class="${getTotalValueClassName(totalAmount)}">${formatSignedAmount(totalAmount)}</span>`;

    const selectedCount = visibleExpenses.filter((expense) =>
      state.selectedIds.has(expense.id)
    ).length;
    const totalSelectedCount = state.selectedIds.size;

    selectAllCheckbox.disabled = false;
    selectAllCheckbox.checked =
      visibleExpenses.length > 0 && selectedCount === visibleExpenses.length;
    selectAllCheckbox.indeterminate =
      selectedCount > 0 && selectedCount < visibleExpenses.length;
    deleteButton.disabled = totalSelectedCount === 0;
  };

  sortSelect.addEventListener("change", () => {
    state.sortOrder = sortSelect.value;
    renderTable();
  });

  selectAllCheckbox.addEventListener("change", () => {
    const visibleExpenses = sortExpenses(state.filteredExpenses, state.sortOrder);

    if (selectAllCheckbox.checked) {
      visibleExpenses.forEach((expense) => state.selectedIds.add(expense.id));
    } else {
      visibleExpenses.forEach((expense) => state.selectedIds.delete(expense.id));
    }

    renderTable();
  });

  tableBody.addEventListener("change", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    if (!target.classList.contains("expense-table__row-checkbox")) {
      return;
    }

    const id = Number(target.dataset.id);

    if (target.checked) {
      state.selectedIds.add(id);
    } else {
      state.selectedIds.delete(id);
    }

    renderTable();
  });

  deleteButton.addEventListener("click", () => {
    if (state.selectedIds.size === 0) {
      return;
    }

    state.expenses = state.expenses.filter(
      (expense) => !state.selectedIds.has(expense.id)
    );
    state.selectedIds.clear();
    saveExpenses(state.expenses);
    applyFilters(state);
  });

  document.addEventListener("expenses:filter", (event) => {
    const { expenses } = event.detail;
    state.filteredExpenses = expenses;
    renderTable();
  });

  renderTable();
}

function sortExpenses(expenses, sortOrder) {
  const copiedExpenses = [...expenses];

  copiedExpenses.sort((left, right) => {
    const leftDate = new Date(left.date).getTime();
    const rightDate = new Date(right.date).getTime();

    if (sortOrder === "oldest") {
      return leftDate - rightDate;
    }

    return rightDate - leftDate;
  });

  return copiedExpenses;
}

function getTotalValueClassName(totalAmount) {
  if (totalAmount > 0) {
    return "expense-table__total-value expense-table__total-value--positive";
  }

  if (totalAmount < 0) {
    return "expense-table__total-value expense-table__total-value--negative";
  }

  return "expense-table__total-value";
}
