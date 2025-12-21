import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PublicNavigationRoutes } from '../../types/public-routes.type';
import Onboarding from '@screens/public/Onboarding';
import SignUp from '@screens/public/SignUp';
import Login from '@screens/public/Login';

const Stack = createNativeStackNavigator<PublicNavigationRoutes>();

export const PublicNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
