import { EXPENSE_TYPE } from "../constants/expense-type.js";

export function setupExpenseFormModal(state, { onAdd } = {}) {
  const openButton = document.querySelector('[data-action="항목-추가"]');
  const modal = document.querySelector('[data-modal="내역-추가"]');
  const form = document.querySelector(".expense-form-modal__form");
  const titleInput = document.getElementById("expense-title");

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

    const expense = readExpenseForm(form);
    const validationMessage = validateExpenseForm(expense);

    if (validationMessage) {
      window.alert(validationMessage);
      return;
    }

    const nextExpense = createExpense(state.expenses, expense);

    state.expenses = [...state.expenses, nextExpense];
    onAdd?.();
    closeModal();
  });
}

function readExpenseForm(form) {
  const formData = new FormData(form);

  return {
    title: String(formData.get("title") ?? "").trim(),
    type: String(formData.get("type") ?? "").trim(),
    date: String(formData.get("date") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    payment: String(formData.get("payment") ?? "").trim(),
    amount: String(formData.get("amount") ?? "").trim(),
  };
}

function validateExpenseForm(expense) {
  if (!expense.title) {
    return "제목을 입력해주세요.";
  }

  if (!expense.type) {
    return "유형을 선택해주세요.";
  }

  if (!expense.amount) {
    return "금액을 입력해주세요.";
  }

  if (!isValidAmount(expense.amount)) {
    return "금액은 0보다 큰 숫자로 입력해주세요.";
  }

  if (!expense.date) {
    return "날짜를 입력해주세요.";
  }

  if (!isValidDate(expense.date)) {
    return "올바른 날짜를 입력해주세요.";
  }

  if (!expense.category) {
    return "카테고리를 선택해주세요.";
  }

  if (!expense.payment) {
    return "결제수단을 선택해주세요.";
  }

  return "";
}

function createExpense(expenses, expense) {
  return {
    id: getNextExpenseId(expenses),
    title: expense.title,
    date: expense.date,
    category: expense.category,
    payment: expense.payment,
    amount: createSignedAmount(expense.type, expense.amount),
  };
}

function isValidAmount(amount) {
  const parsedAmount = Number(amount);
  return Number.isFinite(parsedAmount) && parsedAmount > 0;
}

function isValidDate(date) {
  return !Number.isNaN(new Date(date).getTime());
}


function createSignedAmount(type, amount) {
  const parsedAmount = Number(amount);

  // 사용자가 고른 유형에 따라 저장 금액의 부호를 결정
  if (type === EXPENSE_TYPE.EXPENSE) {
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
