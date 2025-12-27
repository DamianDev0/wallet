"use client"

import { useEffect, useRef } from "react"
import { View, StyleSheet, Animated } from "react-native"

interface ProgressBarProps {
  progress: number
  color?: string
  backgroundColor?: string
  height?: number
  animated?: boolean
  glowEffect?: boolean
}

export const ProgressBar = ({
  progress,
  color = "#8B5CF6",
  backgroundColor = "rgba(255, 255, 255, 0.1)",
  height = 4,
  animated = true,
  glowEffect = true,
}: ProgressBarProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false,
      }).start()
    } else {
      animatedValue.setValue(progress)
    }
  }, [progress, animated, animatedValue])

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  })

  return (
    <View
      style={[
        styles.container,
        {
          height,
          backgroundColor,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.progress,
          {
            width,
            backgroundColor: color,
          },
          glowEffect && styles.glow,
          glowEffect && {
            shadowColor: color,
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 2,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    borderRadius: 2,
  },
  glow: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
})
