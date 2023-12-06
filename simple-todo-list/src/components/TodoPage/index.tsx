import { Container } from "@mui/material";
import AddTask from "./AddTask";
import FilterTask from "./FilterTask";
import TaskList from "./TaskList";

export default function TodoPage() {
  return (
    <Container>
      <FilterTask />
      <TaskList />
      <AddTask />
    </Container>
  );
}
