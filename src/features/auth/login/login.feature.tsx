import React from 'react';
import { View } from 'react-native';
import { Container, Text, Input, Button, Link } from '@components/index';
import useNavigationHook from '@hooks/use-navigation';
import { loginStyles } from './styles/login.styles';

const LoginFeature = () => {
  const navigation = useNavigationHook();

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password
    console.log('Forgot password');
  };

  return (
    <Container>
      <View style={loginStyles.container}>
        <View style={loginStyles.content}>
          <View style={loginStyles.header}>
            <Text variant="title-lg" weight="semiBold" style={loginStyles.title}>
              Hey, Welcome Back
            </Text>
          </View>

          <View style={loginStyles.form}>
            <Input
              placeholder="Email Id"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input placeholder="Password" secureTextEntry />

            <Link
              onPress={handleForgotPassword}
              style={loginStyles.forgotPassword}>
              Forgot password?
            </Link>

            <Button title="Login" variant="primary" fullWidth size="lg" />

            <Text variant="body-md" style={loginStyles.divider}>
              or continue with
            </Text>

            <Button
              title="Google"
              variant="outline"
              fullWidth
              size="lg"
              icon={
                <Text variant="body-md" style={loginStyles.googleIcon}>
                  G
                </Text>
              }
            />
          </View>
        </View>

        <View style={loginStyles.footer}>
          <Text variant="body-md" style={loginStyles.footerText}>
            Don't have an account?{' '}
            <Link onPress={handleSignUp}>Sign up</Link>
          </Text>
        </View>
      </View>
    </Container>
  );
};

export default LoginFeature;
