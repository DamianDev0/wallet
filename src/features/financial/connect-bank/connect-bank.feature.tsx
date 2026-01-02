import React from 'react';
import { View, Image } from 'react-native';
import { Container, Text, Button, BelvoWidget } from '@components/index';
import { ScreenHeader } from '@components/organisms';
import { connectBankStyles } from './styles/connect-bank.styles';
import { useBankConnection } from './hooks/useBankConnection';

const ConnectBankFeature = () => {
  const {
    widgetToken,
    showWidget,
    isGettingToken,
    isLinking,
    handleGetWidgetToken,
    handleWidgetSuccess,
    handleWidgetExit,
    handleWidgetError,
  } = useBankConnection();

  if (showWidget && widgetToken) {
    return (
      <View style={connectBankStyles.widgetContainer}>
        <View style={connectBankStyles.widgetHeader}>
          <Text variant="title-lg">Connect Your Bank</Text>
        </View>
        <View style={connectBankStyles.widgetContent}>
          <BelvoWidget
            accessToken={widgetToken}
            redirectUrl="myapp://belvo"
            payload={{
              locale: 'es',
            }}
            onSuccess={(link, institution) =>
              handleWidgetSuccess(link, institution)
            }
            onExit={handleWidgetExit}
            onError={(error, message) => handleWidgetError(error, message)}
          />
        </View>
      </View>
    );
  }

  return (
    <Container>
      <ScreenHeader />
      <View style={connectBankStyles.container}>
        <View style={connectBankStyles.content}>
          <View style={connectBankStyles.welcomeSection}>
            <Text variant="title-xxl" style={connectBankStyles.title}>
              Connect{'\n'}Your Bank
            </Text>
            <Text variant="body-lg" style={connectBankStyles.description}>
              Link your bank account securely to manage your finances in one
              place
            </Text>
          </View>

          <View style={connectBankStyles.imageContainer}>
            <Image
              source={{
                uri: 'https://res.cloudinary.com/dpqbn1gqb/image/upload/v1766859935/Saly-35_tesw8e.png',
              }}
              style={connectBankStyles.image}
              resizeMode="contain"
            />
          </View>

          <View style={connectBankStyles.benefitsContainer}>
            <BenefitItem text="View all your accounts in one place" />
            <BenefitItem text="Track your spending automatically" />
            <BenefitItem text="Secure bank-level encryption" />
          </View>
        </View>

        <View style={connectBankStyles.buttonContainer}>
          <Button
            title={
              isGettingToken || isLinking
                ? 'Connecting...'
                : 'Connect Bank Account'
            }
            variant="primary"
            fullWidth
            size="lg"
            onPress={handleGetWidgetToken}
            disabled={isGettingToken || isLinking}
          />
        </View>
      </View>
    </Container>
  );
};

const BenefitItem = ({ text }: { text: string }) => (
  <View style={connectBankStyles.benefitItem}>
    <View style={connectBankStyles.benefitIcon}>
      <Text variant="body-sm">✓</Text>
    </View>
    <Text variant="body-md" style={connectBankStyles.benefitText}>
      {text}
    </Text>
  </View>
);

export default ConnectBankFeature;
