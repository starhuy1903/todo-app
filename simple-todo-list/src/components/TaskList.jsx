import { useEffect } from "react";
import { useTodoContext } from "../App";

export const TaskList = () => {
  const { state, dispatch } = useTodoContext();

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(state.todos));
  // }, [state.todos]);

  const handleChangeCheckBox = (item) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: {
        name: item.name,
        checked: !item.checked,
      },
    });
  };

  const shownTodos = state.todos.filter((item) => {
    return item.name.includes(state.filterTodo);
  });

  return (
    <>
      {shownTodos.map((item, index) => {
        return (
          <li key={index} style={{ display: "flex" }}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleChangeCheckBox(item)}
            />
            <p>{item.name}</p>
          </li>
        );
      })}
    </>
  );
};
