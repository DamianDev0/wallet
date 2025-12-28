import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button } from './Button';

interface GoogleButtonProps {
  title: string;
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
  textWeight?: 'regular' | 'medium' | 'semibold' | 'bold';
  fullWidth?: boolean;
}

export const GoogleButton: React.FC<GoogleButtonProps> = ({
  title,
  onPress,
  size = 'md',
  textWeight,
  fullWidth = true,
}) => {
  return (
    <Button
      title={title}
      variant="ghost"
      fullWidth={fullWidth}
      size={size}
      textWeight={textWeight}
      onPress={onPress}
      icon={
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dpqbn1gqb/image/upload/v1766887200/google_vfekze.png',
          }}
          style={styles.googleLogo}
          resizeMode="contain"
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  googleLogo: {
    width: 20,
    height: 20,
  },
});
