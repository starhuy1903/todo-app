import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "components/Unauthenticated/SignInPage";
import TodoPage from "components/Authenticated/TodoPage";
import ProtectedRoute from "common/ProtectedRoute.tsx";
import AppContextProvider from "context/app.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/signin",
      element: <SignInPage />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <TodoPage />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}

export default App;
