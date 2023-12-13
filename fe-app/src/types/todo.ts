export enum TodoStatus {
  DONE = 'done',
  UNDONE = 'undone'
}

export interface Todo {
  id: number
  title: string;
  status: TodoStatus;
}
