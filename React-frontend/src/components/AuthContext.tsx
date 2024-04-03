import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Get the authentication status from local storage and convert it to boolean
    const isAuth = localStorage.getItem("isAuthenticated");
    return isAuth === "true";
  });

  const login = () => {
    localStorage.setItem("isAuthenticated", "true"); // Store authentication status in local storage
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.setItem("isAuthenticated", "false"); // Update local storage when logging out
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
