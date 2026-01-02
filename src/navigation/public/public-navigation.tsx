import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PublicNavigationRoutes } from '../../types/public-routes.type';
import Onboarding from '@screens/public/Onboarding';
import Welcome from '@screens/public/Welcome';
import SignUp from '@screens/public/SignUp';
import Login from '@screens/public/Login';
import ConnectBank from '@screens/public/ConnectBank';
import { useAuthStore } from '@core/shared/store/auth.store';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator<PublicNavigationRoutes>();

export const PublicNavigation = () => {
  const { tempUser } = useAuthStore();

  console.log('🔓 PublicNavigation - tempUser:', tempUser);

  // Si hay un tempUser, significa que el usuario se registró pero no conectó su banco
  // Debe ir directamente a ConnectBank
  const getInitialRouteName = (): keyof PublicNavigationRoutes => {
    if (tempUser) {
      console.log('👤 User has tempUser, redirecting to ConnectBank');
      return 'ConnectBank';
    }
    return 'Onboarding';
  };

  return (
    <Stack.Navigator
      initialRouteName={getInitialRouteName()}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 300,
      }}>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen name="SignUp" component={SignUp}  />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ConnectBank" component={ConnectBank} />
    </Stack.Navigator>
  );
};
