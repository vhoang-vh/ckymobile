import React, { createContext, useContext, useMemo, useState } from "react";
import { currentUser } from "../assets/mockData";
import { User } from "../types";

interface AuthContextValue {
  user: User;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState(currentUser);
  const value = useMemo(
    () => ({ user, updateUser: (updates: Partial<User>) => setUser((previous) => ({ ...previous, ...updates })) }),
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth phải được dùng bên trong AuthProvider");
  return context;
}
