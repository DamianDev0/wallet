import React from "react";
import { PublicNavigation } from "./public/public-navigation";

export const MainNavigation = () => {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <PublicNavigation />;
  }

  return null;
};
