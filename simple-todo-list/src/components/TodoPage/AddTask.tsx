import { Button, Stack, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useTodoContext } from "context/todo";

export default function AddTask() {
  const { onCreateTodo } = useTodoContext();
  const [newTodo, setNewTodo] = useState("");

  const handleCreateNewTodo = useCallback(() => {
    if (!newTodo) {
      return;
    }
    onCreateTodo(newTodo);
    setNewTodo("");
  }, [newTodo, onCreateTodo]);

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <TextField
        id="new-todo"
        label="New todo"
        variant="standard"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <Button variant="contained" onClick={handleCreateNewTodo}>
        Add
      </Button>
    </Stack>
  );
}
