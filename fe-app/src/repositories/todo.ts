import { Todo, TodoStatus } from "../types/todo";
import requestUtils from "../utils/request";

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  requestUtils.post<{ accessToken: string }>("auth/login", { email, password });

export const createTodo = async ({ title }: { title: string }) =>
  requestUtils.post<Todo>("todos", { title });

export const getTodos = async () => requestUtils.get<Todo[]>("todos");

export const updateTodo = async ({
  id,
  status,
}: {
  id: number;
  status: TodoStatus;
}) => requestUtils.put<Todo>(`todos/${id}`, { status });
