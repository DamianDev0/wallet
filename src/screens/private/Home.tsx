import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Text } from '@components/index';

export default function Home() {
  return (
    <Container padding="none">
      <View style={styles.content}>
        <Text variant="title-xxl">Home</Text>
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
