import React from 'react';
import { View, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import {
  SkipButton,
  NextButton,
  DoneButton,
} from './components/onboarding.buttons';

import { ONBOARDING_PAGES } from './constants/onboarding.constants';
import useNavigationHook from '@hooks/use-navigation';
import { lightColors } from '@theme/colors/colors';

const OnboardingFeature = () => {
  const navigation = useNavigationHook();

  const handleComplete = async () => {
    // await AsyncStorage.setItem('onboardingCompleted', 'true');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default OnboardingFeature;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  onboardingContainer: {
    flex: 1,
  },
  imageContainer: {
    paddingBottom: 0,
  },
});
