import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthController } from '@core/infrastructure/controllers/auth.controller';
import { LoginRequest } from '@core/domain/entities/auth/request/login.request';
import { SignUpRequest } from '@core/domain/entities/auth/request/signUp.request';
import { ErrorResponse } from '@core/shared/interfaces/error-response.interface';
import { useAuthStore } from '@core/shared/store/auth.store';

const authController = new AuthController();

// Query Keys
const QUERY_KEYS = {
  AUTH: {
    ME: ['auth', 'me'] as const,
    USER: (id: string) => ['auth', 'user', id] as const,
  },
} as const;

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authController.login(credentials),
    onSuccess: (data) => {
  
      if ('statusCode' in data && data.statusCode >= 400) {
        return;
      }


      if ('data' in data) {
        queryClient.setQueryData(QUERY_KEYS.AUTH.ME, data.data.accessToken);

        // save token in zustant store
        setAuth(data.data.accessToken);
      }
    },
    onError: (error: ErrorResponse) => {
      console.error('Login error:', error.message);
    },
  });
};

// Hook para signup
export const useSignUp = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: (credentials: SignUpRequest) => authController.signUp(credentials),
    onSuccess: (data) => {
      // Verificar si es un error
      if ('statusCode' in data && data.statusCode >= 400) {
        return;
      }

      // El backend devuelve ApiResponse<User> = { code, message, data: User, timestamp, path }
      if ('data' in data && data.data) {
        // Guardar usuario en cache de TanStack Query
        queryClient.setQueryData(QUERY_KEYS.AUTH.ME, data.data);

        // Guardar usuario en Zustand store
        setUser(data.data);
      }
    },
    onError: (error: ErrorResponse) => {
      console.error('Signup error:', error.message);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { clearAuth } = useAuthStore();

  return useMutation({
    mutationFn: () => authController.logout(),
    onSuccess: () => {
      queryClient.clear();

 
      clearAuth();
    },
    onError: (error: ErrorResponse) => {
      console.error('Logout error:', error.message);
    },
  });
};


export const useCurrentUser = (enabled: boolean = true) => {
  const { setUser } = useAuthStore();

  return useQuery({
    queryKey: QUERY_KEYS.AUTH.ME,
    queryFn: async () => {
      const result = await authController.getCurrentUser();

      if ('statusCode' in result && result.statusCode >= 400) {
        throw result;
      }

     
      if ('id' in result && 'email' in result) {
        setUser(result);
      }

      return result;
    },
    enabled,
    staleTime: 1000 * 60 * 10, 
  });
};

export const useIsAuthenticated = () => {
  const { isAuthenticated, user } = useAuthStore();

  return {
    isAuthenticated,
    user,
  };
};
