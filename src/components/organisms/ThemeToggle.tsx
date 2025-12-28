"use client"

import React from "react"
import { TouchableOpacity, Animated, StyleSheet } from "react-native"
import { Sun, Moon } from "lucide-react-native"
import { useTheme } from "@contexts/ThemeContext"

type ThemeToggleSize = "small" | "medium" | "large"

interface ThemeToggleProps {
  size?: ThemeToggleSize
}

const SIZE_CONFIG = {
  small: { container: 40, icon: 18 },
  medium: { container: 56, icon: 24 },
  large: { container: 72, icon: 32 },
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = "medium" }) => {
  const { isDark, toggleTheme, theme } = useTheme()
  const rotateAnim = React.useRef(new Animated.Value(isDark ? 1 : 0)).current

  React.useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isDark ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [isDark, rotateAnim])

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const { container, icon } = SIZE_CONFIG[size]

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          width: container,
          height: container,
        }
      ]}
      activeOpacity={0.7}
      accessibilityLabel={`Cambiar a tema ${isDark ? "claro" : "oscuro"}`}
      accessibilityRole="button"
    >
      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        {isDark ? (
          <Moon size={icon} color="#fbbf24" strokeWidth={2} />
        ) : (
          <Sun size={icon} color="#f59e0b" strokeWidth={2} />
        )}
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
})
