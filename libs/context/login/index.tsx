import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface ILoginContext {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

export const LoggedInContext = createContext<ILoginContext>({
  isLoggedIn: false,
  logIn: () => undefined,
  logOut: () => undefined,
});

export const useLoggedIn = () => useContext<ILoginContext>(LoggedInContext);

export const LoggedInWrapper = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const logIn = useCallback(() => setIsLoggedIn(true), []);
  const logOut = useCallback(() => setIsLoggedIn(false), []);

  const contextValues = useMemo(
    () => ({
      isLoggedIn,
      logIn,
      logOut,
    }),
    [isLoggedIn, logIn, logOut]
  );

  return (
    <LoggedInContext.Provider value={contextValues}>
      {children}
    </LoggedInContext.Provider>
  );
};
