import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Text, Input, Button } from '@components/index';

const Login = () => {
  return (
    <Container>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="title">Login</Text>
          <Text variant="body" style={styles.subtitle}>
            Access your account
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
          />
          <Button title="Sign In" variant="primary" fullWidth />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.7,
  },
  form: {
    gap: 16,
  },
});

export default Login;