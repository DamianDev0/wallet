import React, { useMemo } from 'react';
import { View, Image } from 'react-native';
import { Container, Text, Link, Form } from '@components/index';
import { ScreenHeader } from '@components/organisms';
import useNavigationHook from '@hooks/use-navigation';
import { signupStyles } from './styles/signup.styles';
import { createSignUpFormConfig } from '../config/form-signup.config';
import { useSignUpHandler } from './hooks/useSignUpHandler';

const SignUpFeature = () => {
  const navigation = useNavigationHook();
  const { handleSignUp } = useSignUpHandler();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const signupFormConfig = useMemo(
    () => createSignUpFormConfig(handleSignUp),
    [handleSignUp]
  );

  return (
    <Container>
      <ScreenHeader />
      <View style={signupStyles.container}>
        <View style={signupStyles.welcomeTextContainer}>
          <Text variant="title-xxl">
            Create{'\n'}Account
          </Text>
        </View>

        <View style={signupStyles.content}>
          <View style={signupStyles.imageContainer}>
            <Image
              source={{
                uri: 'https://res.cloudinary.com/dpqbn1gqb/image/upload/v1766859933/Saly-34_gl7elo.png',
              }}
              style={signupStyles.image}
              resizeMode="contain"
            />
          </View>

          <View style={signupStyles.formContainer}>
            <View style={signupStyles.form}>
              <Form config={signupFormConfig} spacing={16} />

              <View style={signupStyles.dividerContainer}>
                <View style={signupStyles.dividerLine} />
                {/* <Text variant="body-sm" style={signupStyles.dividerText}>
                  or continue with
                </Text> */}
                <View style={signupStyles.dividerLine} />
              </View>

              {/* <GoogleButton
                title="Sign Up with Google"
                size="md"
              /> */}

              <View style={signupStyles.loginTextContainer}>
                <Text variant="body-md" style={signupStyles.loginText}>
                  Already have an account?{' '}
                  <Link onPress={handleLogin} variant='body-md' >Login</Link>
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={signupStyles.footer} />
      </View>
    </Container>
  );
};

export default SignUpFeature;
