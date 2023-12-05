import TodoContextProvider from "context/todo.tsx";
import AddTask from "./AddTask";
import FilterTask from "./FilterTask.tsx";
import TaskList from "./TaskList.tsx";
import { Container } from "@mui/material";

export default function TodoPage() {
  return (
    <TodoContextProvider>
      <Container maxWidth="sm">
        <FilterTask />
        <TaskList />
        <AddTask />
      </Container>
    </TodoContextProvider>
  );
}
