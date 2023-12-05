import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useTodoContext } from "context/todo";
import { useCallback } from "react";
import { Todo, TodoStatus } from "types/todo";

export default function TaskList () {
  const { todos, filter: todoFilter, onChangeTodoStatus } = useTodoContext();

  const handleChangeTodoStatus = useCallback(async (item: Todo) => {
    await onChangeTodoStatus(item.id, item.status);
  }, [onChangeTodoStatus]);

  const filteredTodos = todos.filter((item) => {
    return item.title.includes(todoFilter);
  });


  return (
    <FormGroup>
      {filteredTodos.map((item, index) => {
        return (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={item.status === TodoStatus.DONE}
                onChange={(e) => handleChangeTodoStatus({ ...item, status: e.target.checked ? TodoStatus.DONE : TodoStatus.UNDONE })}
                name="gilad"
              />
            }
            checked={item.status === TodoStatus.DONE}
            label={item.title}
          />
        );
      })}
    </FormGroup>
  );
};
