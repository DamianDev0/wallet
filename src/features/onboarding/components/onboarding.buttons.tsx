import React from 'react';
import { View } from 'react-native';
import { Check, ChevronRight, X } from 'lucide-react-native';
import { Button } from '@components/molecules/Button';
import { useTheme } from '@contexts/ThemeContext';
import { onboardingStyles } from '../styles/onboarding.styles';

export const DoneButton = (props: any) => {
  return (
    <View style={onboardingStyles.doneButtonContainer}>
      <Button
        title="Done"
        variant="primary"
        icon={<Check size={20} color="#FFFFFF" />}
        style={onboardingStyles.doneButton}
        {...props}
      />
    </View>
  );
};

export const SkipButton = (props: any) => {
  const { theme } = useTheme();

  return (
    <Button
      title="Skip"
      variant="ghost"
      icon={<X size={18} color={theme.colors.primary} />}
      {...props}
    />
  );
};

export const NextButton = (props: any) => {
  const { theme } = useTheme();

  return (
    <Button
      title="Next"
      variant="ghost"
      icon={<ChevronRight size={18} color={theme.colors.primary} />}
      {...props}
    />
  );
};
