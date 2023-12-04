import "./App.css";
import { useState, useEffect, createContext, useReducer, useContext } from "react";
import { AddTask } from "./components/AddTask";
import { FilterTask } from "./components/FilterTask";
import { TaskList } from "./components/TaskList";
import { todoReducer } from "./context/reducer";
import { initialData } from "./context/store";

const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

function App() {
  const [state, dispatch] = useReducer(todoReducer, initialData);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <div style={{ padding: 30 }}>
        <AddTask />
        <FilterTask />
        <TaskList />
      </div>
    </TodoContext.Provider>
  );
}

export default App;
