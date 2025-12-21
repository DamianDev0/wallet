import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import Button from '@components/ui/button';

export const DoneButton = (props: any) => {
  const { theme } = useTheme();
  return (
    <Button
      text="Finish"
      backgroundColor={theme.colors.primary}
      textColor="#fff"
      {...props}
    />
  );
};

export const SkipButton = (props: any) => {
  const { theme } = useTheme();
  return (
    <Button
      text="Skip"
      textColor={theme.colors.text}
      backgroundColor="transparent"
      {...props}
    />
  );
};

export const NextButton = (props: any) => {
  const { theme } = useTheme();
  return (
    <Button
      text="Next"
      textColor={theme.colors.text}
      backgroundColor="transparent"
      {...props}
    />
  );
};
