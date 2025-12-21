import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container, Text, Input, Button } from '@components/index';

const SignUp = () => {
  return (
    <Container>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text variant="title">Sign Up</Text>
            <Text variant="body" style={styles.subtitle}>
              Create your account
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              autoCapitalize="words"
            />
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
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              secureTextEntry
            />
            <Button title="Create Account" variant="primary" fullWidth />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
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

export default SignUp;