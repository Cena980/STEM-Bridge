import { createContext, useContext, useState, useEffect } from 'react';
import { signIn as authSignIn, signUp as authSignUp, signOut as authSignOut, getCurrentUser } from '../lib/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load current user on mount
  useEffect(() => {
    const currentUser = getCurrentUser(); // or fetch from backend/token
    if (currentUser) setUser(currentUser);
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    const { user: loggedInUser, error } = await authSignIn(email, password);
    if (loggedInUser) setUser(loggedInUser);
    return { error };
  };

  const signUp = async (email, password, fullName, role) => {
    const { user: newUser, error } = await authSignUp(email, password, fullName, role);
    if (newUser) setUser(newUser);
    return { error };
  };

  const signOut = () => {
    authSignOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
