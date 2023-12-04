export const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      if (state.todos.find((item) => action.payload.name === item.name)) return { ...state };
      return { ...state, todos: [...state.todos, action.payload] };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.name === action.payload.name ? { ...todo, checked: action.payload.checked } : todo)),
      };
    case "SET_FILTER":
      return {
        ...state,
        filterTodo: action.payload,
      };
    default:
      return state;
  }
};
