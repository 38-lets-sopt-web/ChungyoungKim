import { formatSignedAmount } from "../utils/format.js";

export function setupExpenseTable(state, { onDelete } = {}) {
  const elements = getTableElements();

  if (!elements) {
    return { render: () => {} };
  }

  const render = () => {
    const visibleExpenses = getVisibleExpenses(state);

    // 현재 화면에 없는 항목은 선택 상태에서도 같이 정리하는 방식
    syncSelectedIds(state, visibleExpenses);

    if (visibleExpenses.length === 0) {
      renderEmptyRow(elements.tableBody);
      renderTotal(elements.totalValue, 0);
      updateSelectionControls(elements, 0, 0, 0);
      return;
    }

    renderTableRows(elements.tableBody, visibleExpenses, state.selectedIds);
    renderTotal(elements.totalValue, getTotalAmount(visibleExpenses));
    updateSelectionControls(
      elements,
      visibleExpenses.length,
      getSelectedVisibleCount(visibleExpenses, state.selectedIds),
      state.selectedIds.size
    );
  };

  bindSortChange(state, elements.sortSelect, render);
  bindSelectAllChange(state, elements.selectAllCheckbox, render);
  bindRowCheckboxChange(state, elements.tableBody, render);
  bindDeleteAction(state, elements.deleteButton, onDelete, render);

  return { render };
}

function getTableElements() {
  const sortSelect = document.getElementById("expense-sort");
  const tableBody = document.querySelector(".expense-table__body");
  const selectAllCheckbox = document.getElementById("expense-select-all");
  const totalValue = document.querySelector(".expense-table__total-value");
  const deleteButton = document.querySelector('[data-action="선택-삭제"]');

  if (
    !sortSelect ||
    !tableBody ||
    !selectAllCheckbox ||
    !totalValue ||
    !deleteButton
  ) {
    return null;
  }

  return {
    sortSelect,
    tableBody,
    selectAllCheckbox,
    totalValue,
    deleteButton,
  };
}

function bindSortChange(state, sortSelect, render) {
  sortSelect.addEventListener("change", () => {
    state.sortOrder = sortSelect.value;
    render();
  });
}

function bindSelectAllChange(state, selectAllCheckbox, render) {
  selectAllCheckbox.addEventListener("change", () => {
    const visibleExpenses = getVisibleExpenses(state);

    if (selectAllCheckbox.checked) {
      visibleExpenses.forEach((expense) => state.selectedIds.add(expense.id));
    } else {
      visibleExpenses.forEach((expense) => state.selectedIds.delete(expense.id));
    }

    render();
  });
}

function bindRowCheckboxChange(state, tableBody, render) {
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

    render();
  });
}

function bindDeleteAction(state, deleteButton, onDelete, render) {
  deleteButton.addEventListener("click", () => {
    if (state.selectedIds.size === 0) {
      return;
    }

    state.expenses = state.expenses.filter(
      (expense) => !state.selectedIds.has(expense.id)
    );
    state.selectedIds.clear();

    if (onDelete) {
      onDelete();
      return;
    }

    render();
  });
}

function getVisibleExpenses(state) {
  return sortExpenses(state.filteredExpenses, state.sortOrder);
}

function syncSelectedIds(state, visibleExpenses) {
  const visibleIds = visibleExpenses.map((expense) => expense.id);

  state.selectedIds = new Set(
    [...state.selectedIds].filter((id) => visibleIds.includes(id))
  );
}

function renderEmptyRow(tableBody) {
  tableBody.innerHTML = `
    <tr>
      <td colspan="6" class="expense-table__empty">
        검색 조건에 맞는 내역이 없습니다.
      </td>
    </tr>
  `;
}

function renderTableRows(tableBody, expenses, selectedIds) {
  const fragment = document.createDocumentFragment();

  expenses.forEach((expense) => {
    fragment.append(createExpenseRow(expense, selectedIds.has(expense.id)));
  });

  tableBody.replaceChildren(fragment);
}

function createExpenseRow(expense, isChecked) {
  const row = document.createElement("tr");

  row.append(
    createCheckboxCell(expense, isChecked),
    createTitleCell(expense),
    createTextCell(expense.date),
    createTextCell(expense.category),
    createTextCell(expense.payment),
    createAmountCell(expense.amount)
  );

  return row;
}

function createCheckboxCell(expense, isChecked) {
  const cell = document.createElement("td");
  cell.className = "expense-table__checkbox-cell";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "expense-table__checkbox expense-table__row-checkbox";
  checkbox.dataset.id = String(expense.id);
  checkbox.setAttribute("aria-label", `${expense.title} 선택`);
  checkbox.checked = isChecked;

  cell.append(checkbox);
  return cell;
}

function createTitleCell(expense) {
  const cell = document.createElement("td");

  const button = document.createElement("button");
  button.type = "button";
  button.className = "expense-table__title-button";
  button.dataset.action = "상세-열기";
  button.dataset.id = String(expense.id);
  button.textContent = expense.title;

  cell.append(button);
  return cell;
}

function createTextCell(value) {
  const cell = document.createElement("td");
  cell.textContent = value;
  return cell;
}

function createAmountCell(amount) {
  const amountClass =
    amount >= 0
      ? "expense-table__amount expense-table__amount--positive"
      : "expense-table__amount expense-table__amount--negative";

  const cell = document.createElement("td");
  cell.className = "expense-table__amount-cell";

  const amountText = document.createElement("span");
  amountText.className = amountClass;
  amountText.textContent = formatSignedAmount(amount);

  cell.append(amountText);
  return cell;
}

function renderTotal(totalValue, totalAmount) {
  totalValue.innerHTML = `
    <span class="${getTotalValueClassName(totalAmount)}">
      ${formatSignedAmount(totalAmount)}
    </span>
  `;
}

function updateSelectionControls(
  elements,
  visibleCount,
  selectedVisibleCount,
  totalSelectedCount
) {
  elements.selectAllCheckbox.disabled = visibleCount === 0;
  elements.selectAllCheckbox.checked =
    visibleCount > 0 && selectedVisibleCount === visibleCount;
  elements.selectAllCheckbox.indeterminate =
    selectedVisibleCount > 0 && selectedVisibleCount < visibleCount;
  elements.deleteButton.disabled = totalSelectedCount === 0;
}

function getSelectedVisibleCount(expenses, selectedIds) {
  return expenses.filter((expense) => selectedIds.has(expense.id)).length;
}

function getTotalAmount(expenses) {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
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
    return "expense-table__total-value--positive";
  }

  if (totalAmount < 0) {
    return "expense-table__total-value--negative";
  }

  return "";
}
