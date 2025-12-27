import React from 'react';
import { View, Image } from 'react-native';
import { styles } from '../styles/onboarding.styles';

interface OnboardingPage {
  backgroundColor: string;
  image: React.ReactElement;
  title: string;
  subtitle: string;
  titleStyles: object;
  subTitleStyles: object;
}

const IMAGE_URL =
  'https://res.cloudinary.com/dpqbn1gqb/image/upload/v1766448615/mobile_qbuino.png';

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.iconWrapper}>{children}</View>
);

export const ONBOARDING_PAGES: OnboardingPage[] = [
  {
    backgroundColor: 'transparent',
    image: (
      <IconWrapper>
        <Image source={{ uri: IMAGE_URL }} style={styles.image} />
      </IconWrapper>
    ),
    title: 'All Your Transactions in One Place',
    subtitle:
      'Visualize every movement of your money in real time. Track income, expenses, and transfers clearly and securely.',
    titleStyles: styles.title,
    subTitleStyles: styles.subtitle,
  },
  {
    backgroundColor: 'transparent',
    image: (
      <IconWrapper>
        <Image source={{ uri: IMAGE_URL }} style={styles.image} />
      </IconWrapper>
    ),
    title: 'Smart Savings & Expense Control',
    subtitle:
      'Understand where your money goes. Analyze spending patterns, manage budgets, and grow your savings with clarity.',
    titleStyles: styles.title,
    subTitleStyles: styles.subtitle,
  },
  {
    backgroundColor: 'transparent',
    image: (
      <IconWrapper>
        <Image source={{ uri: IMAGE_URL }} style={styles.image} />
      </IconWrapper>
    ),
    title: 'Full Financial Overview',
    subtitle:
      'Get a complete financial snapshot. Balance, transactions, savings, and insights designed to help you make better decisions.',
    titleStyles: styles.title,
    subTitleStyles: styles.subtitle,
  },
];
