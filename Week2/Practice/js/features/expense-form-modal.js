import { saveExpenses } from "../core/storage.js";
import { applyFilters } from "./filters.js";

export function setupExpenseFormModal(state) {
  const openButton = document.querySelector('[data-action="항목-추가"]');
  const modal = document.querySelector('[data-modal="내역-추가"]');
  const form = document.querySelector(".expense-form-modal__form");
  const titleInput = document.querySelector("#expense-title");

  if (!openButton || !modal || !form || !titleInput) {
    return;
  }

  const closeButtons = modal.querySelectorAll('[data-action="모달-닫기"]');

  const openModal = () => {
    modal.hidden = false;
    titleInput.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    form.reset();
  };

  openButton.addEventListener("click", () => {
    openModal();
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal();
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const expense = {
      title: String(formData.get("title") ?? "").trim(),
      type: String(formData.get("type") ?? "").trim(),
      date: String(formData.get("date") ?? "").trim(),
      category: String(formData.get("category") ?? "").trim(),
      payment: String(formData.get("payment") ?? "").trim(),
      amount: String(formData.get("amount") ?? "").trim(),
    };

    const hasEmptyField = Object.values(expense).some((value) => value === "");

    if (hasEmptyField) {
      window.alert("모든 항목을 입력해주세요.");
      return;
    }

    const nextExpense = {
      id: getNextExpenseId(state.expenses),
      title: expense.title,
      date: expense.date,
      category: expense.category,
      payment: expense.payment,
      amount: createSignedAmount(expense.type, expense.amount),
    };

    state.expenses = [...state.expenses, nextExpense];
    saveExpenses(state.expenses);
    applyFilters(state);
    closeModal();
  });
}

function createSignedAmount(type, amount) {
  const parsedAmount = Number(amount);

  if (type === "지출") {
    return parsedAmount * -1;
  }

  return parsedAmount;
}

function getNextExpenseId(expenses) {
  if (expenses.length === 0) {
    return 1;
  }

  return Math.max(...expenses.map((expense) => expense.id)) + 1;
}
