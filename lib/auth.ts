import { type User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './firebase';

interface AuthState {
  user: User | null;
  signUp: (email: string, password: string) => Promise<User | null>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return unsubscribe;
  }, []);

  const signUp = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      const { user: newUser } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return { user, signUp, login, logout };
};
