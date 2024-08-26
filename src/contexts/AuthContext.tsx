import { UserDTO } from '@dtos/UserDTO';
import { createContext, ReactNode, useState } from 'react';

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => void;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({
    id: '1',
    name: 'Jonathan',
    email: 'jonathan@email.com',
    avatar: 'jonathan.png',
  });

  function signIn(email: string, password: string) {
    setUser({
      id: '',
      name: '',
      email,
      avatar: '',
    });
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
