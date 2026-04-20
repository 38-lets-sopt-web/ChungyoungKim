export function createInitialState() {
  return {
    expenses: [],
    filteredExpenses: [],
    selectedIds: new Set(),
    sortOrder: "latest",
    filters: {
      keyword: "",
      type: "",
      category: "",
      payment: "",
    },
  };
}
