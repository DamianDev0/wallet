import React from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { Home as HomeIcon, Wallet as WalletIcon, User } from 'lucide-react-native';
import type { PrivateNavigationRoutes } from '../../types/private-routes.type';

import Home from '@screens/private/Home';
import Wallet from '@screens/private/Wallet';
import Profile from '@screens/private/Profile';
import { useTheme } from '@contexts/index';

export const BottomTabNavigator = () => {
  const { theme } = useTheme();

  const renderIcon = (routeName: keyof PrivateNavigationRoutes, selectedTab: string) => {
    const isSelected = routeName === selectedTab;
    const iconColor = isSelected ? theme.colors.primary : theme.colors.textSecondary;
    const iconSize = 24;

    switch (routeName) {
      case 'Home':
        return <HomeIcon color={iconColor} size={iconSize} />;
      case 'Profile':
        return <User color={iconColor} size={iconSize} />;
      default:
        return null;
    }
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {renderIcon(routeName as keyof PrivateNavigationRoutes, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    // @ts-ignore - CurvedBottomBar type definitions are incomplete
    <CurvedBottomBar.Navigator
      type="UP"
      style={[styles.bottomBar, { backgroundColor: theme.colors.background }]}
      shadowStyle={styles.shadow}
      height={60}
      circleWidth={55}
      bgColor={theme.colors.surface}
      initialRouteName="Home"
      borderTopLeftRight={true}
      screenOptions={{
        headerShown: false,
      }}
      renderCircle={({ navigate }: { navigate: (routeName: string) => void }) => (
        <Animated.View style={[styles.btnCircleUp, { backgroundColor: theme.colors.primary }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('Wallet')}
          >
            <WalletIcon color={theme.colors.surface} size={28} />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBar.Screen
        name="Home"
        position="LEFT"
        component={Home}
        options={{ headerShown: false }}
      />
      <CurvedBottomBar.Screen
        name="Wallet"
        position="CIRCLE"
        component={Wallet}
        options={{ headerShown: false }}
      />
      <CurvedBottomBar.Screen
        name="Profile"
        component={Profile}
        position="RIGHT"
        options={{ headerShown: false }}
      />
    </CurvedBottomBar.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomBar: {},
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 22,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
