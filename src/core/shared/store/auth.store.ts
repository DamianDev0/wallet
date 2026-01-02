import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@core/domain/entities/user/user';

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  tempUser: User | null; 
}

interface AuthActions {
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  setAuth: (token: string) => void;
  setTempUser: (user: User) => void; 
  clearAuth: () => void;
  getToken: () => string | null;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      //inicial state
      accessToken: null,
      user: null,
      isAuthenticated: false,
      tempUser: null,

      // Actions
      setToken: (token: string) =>
        set({
          accessToken: token,
          isAuthenticated: true,
        }),

      setUser: (user: User) =>
        set({
          user,
          isAuthenticated: true,
        }),

      setAuth: (token: string) =>
        set({
          accessToken: token,

          isAuthenticated: true,
        }),

      setTempUser: (user: User) =>
        set({
          tempUser: user,
          isAuthenticated: false, 
        }),

      clearAuth: () =>
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
          tempUser: null,
        }),

      getToken: () => get().accessToken,
    }),
    {
      name: 'auth-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        tempUser: state.tempUser, 
      }),
    }
  )
);
