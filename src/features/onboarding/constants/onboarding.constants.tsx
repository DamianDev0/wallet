import React from 'react';
import { View } from 'react-native';
import { Activity, Heart, Sparkles } from 'lucide-react-native';
import { styles } from '../styles/onboarding.styles';

interface OnboardingPage {
  backgroundColor: string;
  image: React.ReactElement;
  title: string;
  subtitle: string;
  titleStyles: object;
  subTitleStyles: object;
}

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.iconWrapper}>{children}</View>
);

export const ONBOARDING_PAGES: OnboardingPage[] = [
  {
    backgroundColor: 'transparent',
    image: (
      <IconWrapper>
        <Sparkles size={120} color="#fff" />
      </IconWrapper>
    ),
    title: 'Welcome',
    subtitle:
      'Build healthy habits and improve your daily routine with simple actions.',
    titleStyles: styles.title,
    subTitleStyles: styles.subtitle,
  },
  {
    backgroundColor: 'transparent',
    image: (
      <IconWrapper>
        <Heart size={120} color="#fff" />
      </IconWrapper>
    ),
    title: 'Mind & Balance',
    subtitle: 'Track your progress and take care of your mental well-being.',
    titleStyles: styles.title,
    subTitleStyles: styles.subtitle,
  },
  {
    backgroundColor: 'transparent',
    image: (
      <IconWrapper>
        <Activity size={120} color="#fff" />
      </IconWrapper>
    ),
    title: 'Stay Active',
    subtitle: 'Monitor your activity and stay motivated every single day.',
    titleStyles: styles.title,
    subTitleStyles: styles.subtitle,
  },
];
