import useLocalStorage from "hooks/useLocalStorage";
import { useCallback, useEffect, useState } from "react";
import { createTodo, getTodos, updateTodo } from "repositories/todo";
import { Todo, TodoStatus } from "types/todo";
import createContext from "utilts/createContext"

interface TodoContextValue {
  loading: boolean,
  todos: Todo[],
  onCreateTodo: (title: string) => Promise<void>,
  onChangeTodoStatus: (id: number, status: TodoStatus) => Promise<void>,
  filter: string;
  onChangeFilter: (filter: string) => void,
}

export const [useTodoContext, TodoContext] = createContext<TodoContextValue>();

export default function TodoContextProvider ({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useLocalStorage<string>('filter', '');

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getTodos();
      setTodos(result.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  console.log(todos)

  const onCreateTodo = useCallback(async (title: string) => {
    try {
      const result = await createTodo({ title });
      setTodos((todos) => [...todos, result.data])
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onChangeTodoStatus = useCallback(async (id: number, status: TodoStatus) => {
    try {
      const result = await updateTodo({ id, status });
      setTodos((todos) => todos.map((todo) => todo.id === id ? result.data : todo));
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onChangeFilter = useCallback((filter: string) => {
    setFilter(filter);
  }, [setFilter]);


  return (
    <TodoContext.Provider
      value={{
        loading,
        filter,
        todos,
        onCreateTodo,
        onChangeTodoStatus,
        onChangeFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
