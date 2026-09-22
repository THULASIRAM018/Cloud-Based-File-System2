<<<<<<< HEAD
import { createContext, useState, ReactNode, useContext, useEffect } from "react";
=======
import { createContext, useState, ReactNode, useContext } from "react";
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e

// Define the shape of the context
interface UserContextType {
  userName: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Props type for the provider
interface UserProviderProps {
  children: ReactNode;
}

// The actual provider
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
<<<<<<< HEAD
  const [userName, setUserName] = useState<string | null>(() => {
    return localStorage.getItem("userName");
  });

  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    } else {
      localStorage.removeItem("userName");
    }
  }, [userName]);
=======
  const [userName, setUserName] = useState<string | null>(null);
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Custom hook for safe access
const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUserContext };
