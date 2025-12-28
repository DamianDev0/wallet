import { QueryClient } from '@tanstack/react-query';


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 min
      gcTime: 1000 * 60 * 30, // Cache kept for 30 min
      retry: 1, 
      refetchOnWindowFocus: false, // Disable window focus refetch
      refetchOnReconnect: true, // Refetch on internet reconnect
      refetchOnMount: true, // Refetch when screen mounts
    },
    mutations: {
      retry: 0, // No retry for mutations
    },
  },
});
