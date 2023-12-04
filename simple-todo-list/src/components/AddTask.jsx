import { useState } from "react";
import { useTodoContext } from "../App";

export const AddTask = () => {
  const { dispatch } = useTodoContext();

  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TODO",
      payload: {
        checked: false,
        name: newTodo,
      },
    });
    setNewTodo("");
  };

  const handleChangeFieldNewInput = (e) => {
    setNewTodo(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ marginRight: 6 }}>Add new todo:</label>
      <input onChange={handleChangeFieldNewInput} value={newTodo} />
      <button>Submit</button>
    </form>
  );
};
