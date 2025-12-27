import React from 'react';
import { View, ScrollView } from 'react-native';
import { Container, Text, Input, Button, Link } from '@components/index';
import useNavigationHook from '@hooks/use-navigation';
import { signupStyles } from './styles/signup.styles';

const SignUpFeature = () => {
  const navigation = useNavigationHook();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <ScrollView
        style={signupStyles.scrollView}
        contentContainerStyle={signupStyles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={signupStyles.content}>
          <View style={signupStyles.header}>
            <Text variant="title-lg" weight="semiBold" style={signupStyles.title}>
              Let's get started
            </Text>
          </View>

          <View style={signupStyles.form}>
            <Input placeholder="Full Name" autoCapitalize="words" />
            <Input
              placeholder="Email Id"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input placeholder="Password" secureTextEntry />
            <Input placeholder="Confirm Password" secureTextEntry />

            <Button title="Sign up" variant="primary" fullWidth size="lg" />

            <Text variant="body-md" style={signupStyles.divider}>
              or continue with
            </Text>

            <Button
              title="Google"
              variant="outline"
              fullWidth
              size="lg"
              icon={
                <Text variant="body-md" style={signupStyles.googleIcon}>
                  G
                </Text>
              }
            />
          </View>
        </View>

        <View style={signupStyles.footer}>
          <Text variant="body-md" style={signupStyles.footerText}>
            Already have an account? <Link onPress={handleLogin}>Login</Link>
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
};

export default SignUpFeature;
