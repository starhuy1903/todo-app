import { Todo, TodoStatus } from 'types/todo';
import requestUtils from 'utilts/request';

export const signIn = async ({ username, password }: { username: string, password: string }) => (
  requestUtils.post<{ token: string }>('auth/login', { username, password })
);
export const createTodo = async ({ title }: { title: string }) => (
  requestUtils.post<Todo>('todos', { title })
);
export const getTodos = async () => (
  requestUtils.get<Todo[]>('todos')
);
export const updateTodo = async ({ id, status }: { id :number, status: TodoStatus }) => (
  requestUtils.put<Todo>(`todos/${id}`, { status })
);
