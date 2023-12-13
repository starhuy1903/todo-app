import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import { useCallback } from "react";
import { Todo, TodoStatus } from "../../../types/todo";
import { useTodoContext } from "../../../context/todo";

export default function TaskList() {
  const { todos, filter: todoFilter, onChangeTodoStatus } = useTodoContext();

  const handleChangeTodoStatus = useCallback(
    async (item: Todo) => {
      await onChangeTodoStatus(item.id, item.status);
    },
    [onChangeTodoStatus]
  );

  const filteredTodos = todos.filter((item) => {
    return item.title.includes(todoFilter);
  });

  return (
    <Stack maxHeight={500}>
      {filteredTodos.map((item, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={item.status === TodoStatus.DONE}
              onChange={(e) =>
                handleChangeTodoStatus({
                  ...item,
                  status: e.target.checked
                    ? TodoStatus.DONE
                    : TodoStatus.UNDONE,
                })
              }
              name="gilad"
            />
          }
          checked={item.status === TodoStatus.DONE}
          label={item.title}
        />
      ))}
    </Stack>
  );
}
