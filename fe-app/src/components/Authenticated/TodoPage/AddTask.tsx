import { Button, Stack, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTodoContext } from "../../../context/todo";

export default function AddTask() {
  const { onCreateTodo } = useTodoContext();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<{ newTodoTitle: string }>({
    defaultValues: {
      newTodoTitle: "",
    },
  });

  const handleCreateNewTodo = useCallback(
    async ({ newTodoTitle }: { newTodoTitle: string }) => {
      setLoading(true);
      await onCreateTodo(newTodoTitle);
      setLoading(false);
      setValue("newTodoTitle", "");
    },
    [onCreateTodo, setValue]
  );

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <TextField
        id="new-todo"
        label="New todo"
        variant="standard"
        {...register("newTodoTitle")}
        error={!!errors.newTodoTitle}
        helperText={errors.newTodoTitle?.message}
      />
      <Button
        variant="contained"
        onClick={handleSubmit(handleCreateNewTodo)}
        disabled={loading}
      >
        Add
      </Button>
    </Stack>
  );
}
