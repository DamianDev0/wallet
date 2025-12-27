import React, { useState } from 'react';
import { View, Pressable } from 'react-native';

import useNavigationHook from '@hooks/use-navigation';
import { styles } from '../styles/auth-switch.styles';
import { Text } from '@components/index';

const AuthSwitch = () => {
  const navigation = useNavigationHook();
  const [active, setActive] = useState<'login' | 'signup'>('login');

  const onLogin = () => {
    setActive('login');
    navigation.navigate('Login');
  };

  const onSignup = () => {
    setActive('signup');
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.item, active === 'login' && styles.active]}
        onPress={onLogin}
      >
        <Text
          style={[
            active === 'login' && styles.activeText,
          ]}
          variant='body-md'
        >
          Login
        </Text>
      </Pressable>

      <Pressable
        style={[styles.item, active === 'signup' && styles.active]}
        onPress={onSignup}
      >
        <Text
          style={[
            active === 'signup' && styles.activeText,
          ]}
        >
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default AuthSwitch;
