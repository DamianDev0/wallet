import React from 'react';
import { View, Image } from 'react-native';
import { Container, Text, Button } from '@components/index';
import { ScreenHeader } from '@components/organisms';
import { useTheme } from '@contexts/ThemeContext';
import { BenefitItem } from '@features/financial/components/BenefitItem';
import { createStyles } from '@features/financial/styles/create.styles';

export const ConnectBankView = ({
  isGettingToken,
  isLinking,
  handleGetWidgetToken,
}: any) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Container>
      <ScreenHeader />

      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.welcomeSection}>
            <Text variant="title-xxl" style={styles.title}>
              Connect{'\n'}Your Bank
            </Text>
            <Text variant="body-md" style={styles.description}>
              Link your bank account securely to manage your finances in one
              place
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://res.cloudinary.com/dpqbn1gqb/image/upload/v1766859925/Saly-22_efbaff.png',
              }}
              style={styles.image}
            />
          </View>

          <View style={styles.benefitsContainer}>
            <BenefitItem text="Access all your bank accounts in one secure dashboard" />
            <BenefitItem text="Automatically track transactions and balances in real time" />
            <BenefitItem text="Your data is protected with bank-level security and encryption" />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={
              isGettingToken || isLinking
                ? 'Connecting...'
                : 'Connect Bank Account'
            }
            variant="primary"
            fullWidth
            size="md"
            onPress={handleGetWidgetToken}
            disabled={isGettingToken || isLinking}
          />
        </View>
      </View>
    </Container>
  );
};
