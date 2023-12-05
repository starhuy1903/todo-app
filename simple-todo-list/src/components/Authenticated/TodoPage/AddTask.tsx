import { Box, Button, TextField } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTodoContext } from "context/todo";

export default function AddTask () {
  const { onCreateTodo } = useTodoContext();
  const { register, handleSubmit, formState: { errors } } = useForm<{ newTodoTitle: string }>({
    defaultValues: {
      newTodoTitle: "",
    }
  });

  const handleCreateNewTodo = useCallback(async ({ newTodoTitle }: { newTodoTitle: string }) => {
    await onCreateTodo(newTodoTitle);
  }, [onCreateTodo]);

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      <TextField
        id="new-todo"
        label="New todo"
        variant="standard"
        {...register('newTodoTitle')}
        error={!!errors.newTodoTitle}
        helperText={errors.newTodoTitle?.message}
      />
      <Button
        variant="contained"
        onClick={handleSubmit(handleCreateNewTodo)}
      >
        Submit
      </Button>
    </Box>
  );
};
