import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider, useTheme, ToastProvider } from '@contexts/index';
import { ToastContainer } from '@components/organisms';
import { MainNavigation } from '@navigation/main-navigation';
import { queryClient } from '@core/config/query-client.config';

function AppContent() {
  const { isDark, theme } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
      
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
