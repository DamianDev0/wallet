  import React from 'react';
  import { View, Image } from 'react-native';
  import { Container, Text, Input, Button, Link, GoogleButton } from '@components/index';
  import { ScreenHeader } from '@components/organisms';
  import useNavigationHook from '@hooks/use-navigation';
  import { loginStyles } from './styles/login.styles';

  const LoginFeature = () => {
    const navigation = useNavigationHook();

    const handleSignUp = () => {
      navigation.navigate('SignUp');
    };

    return (
      <Container>
        <ScreenHeader />
        <View style={loginStyles.container}>
          <View style={loginStyles.welcomeTextContainer}>
            <Text variant="title-xxl">
              Hey{'\n'}Welcome{'\n'}Back!
            </Text>
          </View>

          <View style={loginStyles.content}>
            <View style={loginStyles.imageContainer}>
              <Image
                source={{
                  uri: 'https://res.cloudinary.com/dpqbn1gqb/image/upload/v1766859935/Saly-35_tesw8e.png',
                }}
                style={loginStyles.image}
                resizeMode="contain"
              />
            </View>

            <View style={loginStyles.formContainer}>
              <View style={loginStyles.form}>
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

                <Button title="Login" variant="primary" fullWidth size="lg" />

                <View style={loginStyles.dividerContainer}>
                  <View style={loginStyles.dividerLine} />
                  <Text variant="body-sm" style={loginStyles.dividerText}>
                    or continue with
                  </Text>
                  <View style={loginStyles.dividerLine} />
                </View>

                <GoogleButton
                  title="Login with Google"
                  size="lg"
                  textWeight="medium"
                />

                <View style={loginStyles.signUpTextContainer}>
                  <Text variant="body-md" style={loginStyles.signUpText}>
                    Don't have an account?{' '}
                    <Link onPress={handleSignUp}>Sign Up</Link>
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={loginStyles.footer}></View>
        </View>
      </Container>
    );
  };

  export default LoginFeature;
