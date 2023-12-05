import TodoContextProvider from "context/todo.tsx";
import AddTask from "./AddTask.tsx";
import FilterTask from "./FilterTask.tsx";
import TaskList from "./TaskList.tsx";

export default function TodoPage () {
  return (
    <TodoContextProvider>
      <AddTask />
      <FilterTask />
      <TaskList />
    </TodoContextProvider>
  );
};
