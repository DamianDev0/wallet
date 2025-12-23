import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import {
  SkipButton,
  NextButton,
  DoneButton,
} from './components/onboarding.buttons';

import { ONBOARDING_PAGES } from './constants/onboarding.constants';
import useNavigationHook from '@hooks/use-navigation';

const OnboardingFeature = () => {
  const navigation = useNavigationHook();

  const handleComplete = async () => {
    // await AsyncStorage.setItem('onboardingCompleted', 'true');
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../../assets/img/mesh-purple.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <Onboarding
        onDone={handleComplete}
        onSkip={handleComplete}
        bottomBarHighlight={false}
        containerStyles={styles.onboardingContainer}
        imageContainerStyles={styles.imageContainer}
        SkipButtonComponent={SkipButton}
        NextButtonComponent={NextButton}
        DoneButtonComponent={DoneButton}
        pages={ONBOARDING_PAGES}
      />
    </ImageBackground>
  );
};

export default OnboardingFeature;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  onboardingContainer: {
    flex: 1,
  },
  imageContainer: {
    paddingBottom: 0,
  },
});
