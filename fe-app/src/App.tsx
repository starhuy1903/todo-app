import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import TodoPage from "./components/Authenticated/TodoPage";
import SignInPage from "./components/Unauthenticated/SignInPage";
import AppContextProvider from "./context/app";
import CustomToaster from "./components/Common/CustomToaster";

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
    <Provider store={store}>
      <AppContextProvider>
        <CustomToaster />
        <RouterProvider router={router} />
      </AppContextProvider>
    </Provider>
  );
}

export default App;
