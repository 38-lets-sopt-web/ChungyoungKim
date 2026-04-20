import { formatSignedAmount } from "../utils/format.js";

export function setupExpenseDetailModal(state) {
  const tableBody = document.querySelector(".expense-table__body");
  const modal = document.querySelector('[data-modal="상세-보기"]');

  if (!tableBody || !modal) {
    return;
  }

  const closeButtons = modal.querySelectorAll('[data-action="상세-닫기"]');
  const detailElements = {
    title: modal.querySelector('[data-detail="title"]'),
    amount: modal.querySelector('[data-detail="amount"]'),
    date: modal.querySelector('[data-detail="date"]'),
    category: modal.querySelector('[data-detail="category"]'),
    payment: modal.querySelector('[data-detail="payment"]'),
  };

  if (Object.values(detailElements).some((element) => !element)) {
    return;
  }

  const openModal = (expense) => {
    detailElements.title.textContent = expense.title;
    detailElements.amount.textContent = formatSignedAmount(expense.amount);
    detailElements.date.textContent = expense.date;
    detailElements.category.textContent = expense.category;
    detailElements.payment.textContent = expense.payment;
    modal.hidden = false;
  };

  const closeModal = () => {
    modal.hidden = true;
  };

  tableBody.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const detailButton = target.closest('[data-action="상세-열기"]');

    if (!detailButton) {
      return;
    }

    const expenseId = Number(detailButton.dataset.id);
    const expense = state.expenses.find((item) => item.id === expenseId);

    if (!expense) {
      return;
    }

    openModal(expense);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal();
    });
  });
}
