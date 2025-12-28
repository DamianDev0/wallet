import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PublicNavigationRoutes } from '../../types/public-routes.type';
import Onboarding from '@screens/public/Onboarding';
import Welcome from '@screens/public/Welcome';
import SignUp from '@screens/public/SignUp';
import Login from '@screens/public/Login';

const Stack = createNativeStackNavigator<PublicNavigationRoutes>();

export const PublicNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
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
    </Stack.Navigator>
  );
};
