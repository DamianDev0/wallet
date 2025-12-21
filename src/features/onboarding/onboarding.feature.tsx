import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNavigationHook from '@hooks/use-navigation';
import {
  DoneButton,
  SkipButton,
  NextButton,
} from './components/onboarding.buttons';
import { onboardingPages } from './constants/onboarding.pages';

const OnboardingFeature = () => {
  const navigation = useNavigationHook();

  const handleComplete = async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    navigation.navigate('Login');
  };

  return (
    <Onboarding
      onSkip={handleComplete}
      onDone={handleComplete}
      bottomBarHighlight={false}
      SkipButtonComponent={SkipButton}
      NextButtonComponent={NextButton}
      DoneButtonComponent={DoneButton}
      pages={onboardingPages}
    />
  );
};

export default OnboardingFeature;
