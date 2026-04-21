export function setupFilters(state, onFilterChange) {
  const form = document.querySelector(".search-filter__form");
  const resetButton = document.querySelector('[data-action="필터-초기화"]');

  if (!form || !resetButton) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    state.filters = getFiltersFromForm(form);
    onFilterChange?.();
  });

  resetButton.addEventListener("click", () => {
    form.reset();
    state.filters = createEmptyFilters();
    onFilterChange?.();
  });
}

export function applyFilters(state) {
  // 폼 입력값과 맞는 항목만 남기도록 상태를 갱신하는 로직
  state.filteredExpenses = filterExpenses(state.expenses, state.filters);
  return state.filteredExpenses;
}

function getExpenseType(expense) {
  return expense.amount >= 0 ? "수입" : "지출";
}

function createEmptyFilters() {
  return {
    keyword: "",
    type: "",
    category: "",
    payment: "",
  };
}

function getFiltersFromForm(form) {
  const formData = new FormData(form);

  return {
    keyword: String(formData.get("keyword") ?? "").trim(),
    type: String(formData.get("type") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    payment: String(formData.get("payment") ?? "").trim(),
  };
}

function filterExpenses(expenses, filters) {
  return expenses.filter((expense) => {
    const type = getExpenseType(expense);
    const keyword = filters.keyword.toLowerCase();

    // 한 번의 검색어로 여러 속성을 같이 확인할 수 있게 묶어두는 방식
    const searchableValues = [
      expense.id,
      expense.title,
      expense.date,
      expense.category,
      expense.payment,
      expense.amount,
      Math.abs(expense.amount),
      type,
    ].join(" ").toLowerCase();

    const matchesKeyword = !keyword || searchableValues.includes(keyword);
    const matchesType = !filters.type || type === filters.type;
    const matchesCategory =
      !filters.category || expense.category === filters.category;
    const matchesPayment =
      !filters.payment || expense.payment === filters.payment;

    return (
      matchesKeyword && matchesType && matchesCategory && matchesPayment
    );
  });
}
