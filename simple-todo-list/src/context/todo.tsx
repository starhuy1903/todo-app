import useLocalStorage from "hooks/useLocalStorage";
import { useCallback } from "react";
import { Todo, TodoStatus } from "types/todo";
import createContext from "utils/createContext";

interface TodoContextValue {
  todos: Todo[];
  onCreateTodo: (title: string) => void;
  onChangeTodoStatus: (id: number, status: TodoStatus) => void;
  filter: string;
  onChangeFilter: (filter: string) => void;
}

// export const initialData = {
//   todos: JSON.parse(localStorage.getItem("todos")) ?? [],
//   filterTodo: "",
// };

export const [useTodoContext, TodoContext] = createContext<TodoContextValue>();

export default function TodoContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filter, setFilter] = useLocalStorage<string>("filter", "");
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const onCreateTodo = useCallback(
    (title: string) => {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          title,
          status: TodoStatus.UNDONE,
        },
      ]);
    },
    [setTodos, todos]
  );

  const onChangeTodoStatus = useCallback(
    (id: number, status: TodoStatus) => {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, status } : todo
      );
      setTodos(newTodos);
    },
    [setTodos, todos]
  );

  const onChangeFilter = useCallback(
    (filter: string) => {
      setFilter(filter);
    },
    [setFilter]
  );

  return (
    <TodoContext.Provider
      value={{
        filter,
        todos,
        onCreateTodo,
        onChangeTodoStatus,
        onChangeFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
