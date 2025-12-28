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

// Hook para login
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authController.login(credentials),
    onSuccess: (data) => {
      // Verificar si es un error
      if ('code' in data && data.code >= 400) {
        return;
      }

      // Guardar usuario en cache de TanStack Query
      if ('data' in data) {
        queryClient.setQueryData(QUERY_KEYS.AUTH.ME, data.data.user);

        // Guardar token y usuario en Zustand store
        setAuth(data.data.accessToken, data.data.user);
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
      if ('code' in data && data.code >= 400) {
        return;
      }

      // Verificar que sea un User válido
      if ('id' in data && 'email' in data) {
        // Guardar usuario en cache de TanStack Query
        queryClient.setQueryData(QUERY_KEYS.AUTH.ME, data);

        // Guardar usuario en Zustand store
        setUser(data);
      }
    },
    onError: (error: ErrorResponse) => {
      console.error('Signup error:', error.message);
    },
  });
};

// Hook para logout
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { clearAuth } = useAuthStore();

  return useMutation({
    mutationFn: () => authController.logout(),
    onSuccess: () => {
      // Limpiar cache de TanStack Query
      queryClient.clear();

      // Limpiar Zustand store
      clearAuth();
    },
    onError: (error: ErrorResponse) => {
      console.error('Logout error:', error.message);
    },
  });
};

// Hook para obtener el usuario actual
export const useCurrentUser = (enabled: boolean = true) => {
  const { setUser } = useAuthStore();

  return useQuery({
    queryKey: QUERY_KEYS.AUTH.ME,
    queryFn: async () => {
      const result = await authController.getCurrentUser();

      // Si es un error, lanzarlo
      if ('code' in result && result.code >= 400) {
        throw result;
      }

      // Verificar que sea un User válido antes de guardar
      if ('id' in result && 'email' in result) {
        // Actualizar usuario en Zustand store
        setUser(result);
      }

      return result;
    },
    enabled,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
};

// Hook para verificar si está autenticado desde el store
export const useIsAuthenticated = () => {
  const { isAuthenticated, user } = useAuthStore();

  return {
    isAuthenticated,
    user,
  };
};
