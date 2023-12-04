export const initialData = {
  todos: JSON.parse(localStorage.getItem("todos")) ?? [],
  filterTodo: "",
};
