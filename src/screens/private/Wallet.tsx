import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Text } from '@components/index';

export default function Wallet() {
  return (
    <Container padding="none">
      <View style={styles.content}>
        <Text variant="title-xxl">Wallet</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
