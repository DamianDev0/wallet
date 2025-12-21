import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  text: string;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  textColor?: string;
  backgroundColor?: string;
  iconPosition?: 'left' | 'right';
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: ViewStyle;
};

const Button: React.FC<ButtonProps> = ({
  text,
  iconName,
  iconColor = '#fff',
  iconSize = 20,
  textColor = '#fff',
  backgroundColor = 'transparent',
  iconPosition = 'right',
  containerStyle,
  textStyle,
  iconStyle,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        containerStyle,
        style,
      ]}
      {...props}
    >
      <View style={styles.content}>
     
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {text}
        </Text>
      
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default Button;