import "./App.css";
import TodoPage from "components/TodoPage";
import TodoContextProvider from "context/todo";

function App() {
  return (
    <TodoContextProvider>
      <TodoPage />
    </TodoContextProvider>
  );
}

export default App;
