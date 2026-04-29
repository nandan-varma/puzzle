import { FirebaseApp } from '@firebase/app';

declare module '@firebase/auth' {
  interface Auth {
    createUserWithEmailAndPassword(
      email: string,
      password: string
    ): Promise<{ user: import('@firebase/auth').User | null }>;
    signInWithEmailAndPassword(
      email: string,
      password: string
    ): Promise<import('@firebase/auth').UserCredential>;
    signOut(): Promise<void>;
  }
}
