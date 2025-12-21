import React from 'react';
import { Wallet, Shield, TrendingUp } from 'lucide-react-native';
import { styles } from '../styles/onboarding.style';

export const onboardingPages = [
  {
    backgroundColor: '#fff',
    image: <Wallet size={100} color="#0A84FF" />,
    title: 'Welcome to Your Wallet',
    subtitle: 'Manage your finances securely and efficiently in one place.',
    titleStyles: styles.title,
    subTitleStyles: styles.subtitle,
  },
  {
    backgroundColor: '#fff',
    image: <Shield size={100} color="#0A84FF" />,
    title: 'Secure & Private',
    subtitle: 'Your financial data is encrypted and protected with industry-leading security.',
    titleStyles: styles.title,
    subTitleStyles: styles.subtitle,
  },
  {
    backgroundColor: '#fff',
    image: <TrendingUp size={100} color="#0A84FF" />,
    title: 'Track Your Growth',
    subtitle: 'Monitor your spending, savings, and financial goals in real-time.',
    titleStyles: styles.title,
    subTitleStyles: styles.subtitle,
  },
];
