import useLocalStorage from "hooks/useLocalStorage";
import createContext from "utils/createContext";

interface AppContextValue {
  setToken: (token: string) => void;
  isSignedIn: boolean;
}

export const [useAppContext, AppContext] = createContext<AppContextValue>();

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useLocalStorage("access_token", "");

  const isSignedIn = !!token;

  return (
    <AppContext.Provider
      value={{
        setToken,
        isSignedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
