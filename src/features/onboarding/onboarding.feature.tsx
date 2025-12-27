import React from 'react';
import { View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import {
  SkipButton,
  NextButton,
  DoneButton,
} from './components/onboarding.buttons';

import { ONBOARDING_PAGES } from './constants/onboarding.constants';
import { onboardingStyles } from './styles/onboarding.styles';
import useNavigationHook from '@hooks/use-navigation';

const OnboardingFeature = () => {
  const navigation = useNavigationHook();

  const handleComplete = async () => {
    // await AsyncStorage.setItem('onboardingCompleted', 'true');
    navigation.navigate('Welcome');
  };

  return (
    <View style={onboardingStyles.container}>
      <Onboarding
        onDone={handleComplete}
        onSkip={handleComplete}
        bottomBarHighlight={false}
        containerStyles={onboardingStyles.onboardingContainer}
        imageContainerStyles={onboardingStyles.imageContainer}
        SkipButtonComponent={SkipButton}
        NextButtonComponent={NextButton}
        DoneButtonComponent={DoneButton}
        pages={ONBOARDING_PAGES}
      />
    </View>
  );
};

export default OnboardingFeature;
