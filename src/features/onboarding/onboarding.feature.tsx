import React from 'react';
import { View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import {
  SkipButton,
  NextButton,
  DoneButton,
} from './components/onboarding.buttons';

import { getOnboardingPages } from './constants/onboarding.constants';
import { createOnboardingStyles } from './styles/onboarding.styles';
import useNavigationHook from '@hooks/use-navigation';
import { useTheme } from '@contexts/ThemeContext';

const OnboardingFeature = () => {
  const navigation = useNavigationHook();
  const { theme } = useTheme();
  const onboardingStyles = createOnboardingStyles(theme);
  const onboardingPages = getOnboardingPages(theme);

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
        pages={onboardingPages}
      />
    </View>
  );
};

export default OnboardingFeature;
