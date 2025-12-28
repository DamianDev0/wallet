"use client"

import type React from "react"
import { View, StyleSheet, type ViewStyle, type StyleProp } from "react-native"
import { ThemeToggle } from "./ThemeToggle"

interface ScreenHeaderProps {
  style?: StyleProp<ViewStyle>
  size?: "small" | "medium" | "large"
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ style, size = "small" }) => {
  return (
    <View style={[styles.container, style]}>
      <ThemeToggle size={size} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1000,
  },
})
