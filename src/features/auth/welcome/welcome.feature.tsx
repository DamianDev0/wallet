import React from 'react';
import { View, Image } from 'react-native';
import { Container, Text } from '@components/index';
import { welcomeStyles } from './styles/welcome.styles';
import AuthSwitch from './components/AuthSwitch';

const WelcomeFeature = () => {
  return (
    <Container>
      <View style={welcomeStyles.container}>
        <View style={welcomeStyles.welcomeTextContainer}>
          <Text variant="title-xxl">
            Hey!{'\n'}Let’s get{'\n'}started
          </Text>
        </View>

        <View style={welcomeStyles.content}>
          <View style={welcomeStyles.imageContainer}>
            <Image
              source={{
                uri: 'https://res.cloudinary.com/dpqbn1gqb/image/upload/v1766859934/Saly-37_b91jjr.png',
              }}
              style={welcomeStyles.image}
              resizeMode="contain"
            />
          </View>

          <View style={welcomeStyles.textContainer}>
            <Text variant="body-lg" weight="semiBold" style={welcomeStyles.title}>
              Your wallet, made simple
            </Text>
            <Text variant="body-md" style={welcomeStyles.subtitle}>
              Send, receive, and manage your money easily — all in one friendly
              place.
            </Text>
          </View>
        </View>

        <View style={welcomeStyles.bottomActions}>
          <AuthSwitch />
        </View>
      </View>
    </Container>
  );
};

export default WelcomeFeature;
