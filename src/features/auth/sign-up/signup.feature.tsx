import React from 'react';
import { View, Image } from 'react-native';
import { Container, Text, Input, Button, Link } from '@components/index';
import { ScreenHeader } from '@components/organisms';
import useNavigationHook from '@hooks/use-navigation';
import { signupStyles } from './styles/signup.styles';

const SignUpFeature = () => {
  const navigation = useNavigationHook();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

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
              <Input
                placeholder="Full Name"
                autoCapitalize="words"
                height={48}
              />
              <Input
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                height={48}
              />
              <Input
                placeholder="Password"
                secureTextEntry
                height={48}
              />

              <Button title="Sign Up" variant="primary" fullWidth size="lg" />

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
