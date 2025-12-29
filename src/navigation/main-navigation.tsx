import React from 'react';
import { PublicNavigation } from './public/public-navigation';
import { PrivateNavigation } from './private/private-navigation';
import { useIsAuthenticated } from '@hooks/useAuth';

export const MainNavigation = () => {
  const { isAuthenticated } = useIsAuthenticated();

  if (!isAuthenticated) {
    return <PublicNavigation />;
  }

  return <PrivateNavigation />;
};
