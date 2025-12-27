"use client"

import { useRef } from "react"
import { View, StyleSheet, Pressable, Animated, PanResponder } from "react-native"
import { Text } from "../atoms/Text"
import { Icon, IconName } from "@components/atoms/Icon"
import { width } from "@utils/dimensios"
import { ProgressBar } from "@components/atoms/ProgressBar"


export type ToastType = "success" | "error" | "warning" | "info" | "loading" | "default"
export type ToastPosition = "top" | "bottom" | "center"

interface ToastAction {
  label: string
  onPress: () => void
}

export interface ToastConfig {
  id: string
  type?: ToastType
  title: string
  message?: string
  description?: string
  icon?: IconName
  iconColor?: string
  duration?: number
  progress?: number
  primaryAction?: ToastAction
  secondaryAction?: ToastAction
  onClose?: () => void
  dismissible?: boolean
  swipeable?: boolean
  glowEffect?: boolean
  customBackgroundColor?: string
  customBorderColor?: string
  customTextColor?: string
  position?: ToastPosition
}

export const Toast = ({
  type = "default",
  title,
  message,
  description,
  icon,
  iconColor,
  progress,
  primaryAction,
  secondaryAction,
  onClose,
  dismissible = true,
  swipeable = true,
  glowEffect = true,
  customBackgroundColor,
  customBorderColor,
  customTextColor,
}: ToastConfig) => {
  const translateX = useRef(new Animated.Value(0)).current
  const opacity = useRef(new Animated.Value(1)).current

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => swipeable,
      onMoveShouldSetPanResponder: (_, gestureState) => swipeable && Math.abs(gestureState.dx) > 5,
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx)
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > width * 0.3) {
          Animated.parallel([
            Animated.timing(translateX, {
              toValue: gestureState.dx > 0 ? width : -width,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start(() => onClose?.())
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 7,
          }).start()
        }
      },
    }),
  ).current

  const getToastConfig = () => {
    const configs = {
      success: {
        icon: "check" as IconName,
        iconColor: "#10B981",
        backgroundColor: "#1E3A32",
        borderColor: "#2D5245",
        glowColor: "#10B981",
      },
      error: {
        icon: "error" as IconName,
        iconColor: "#EF4444",
        backgroundColor: "#3A1E1E",
        borderColor: "#52262D",
        glowColor: "#EF4444",
      },
      warning: {
        icon: "warning" as IconName,
        iconColor: "#F59E0B",
        backgroundColor: "#3A2E1E",
        borderColor: "#524529",
        glowColor: "#F59E0B",
      },
      info: {
        icon: "info" as IconName,
        iconColor: "#3B82F6",
        backgroundColor: "#1E2A3A",
        borderColor: "#2D3F52",
        glowColor: "#3B82F6",
      },
      loading: {
        icon: "download" as IconName,
        iconColor: "#8B5CF6",
        backgroundColor: "#2E1E3A",
        borderColor: "#3F2952",
        glowColor: "#8B5CF6",
      },
      default: {
        icon: "info" as IconName,
        iconColor: "#64748B",
        backgroundColor: "#1E293B",
        borderColor: "#334155",
        glowColor: "#64748B",
      },
    }

    return configs[type]
  }

  const config = getToastConfig()
  const finalIcon = icon || config.icon
  const finalIconColor = iconColor || config.iconColor
  const finalBackgroundColor = customBackgroundColor || config.backgroundColor
  const finalBorderColor = customBorderColor || config.borderColor
  const finalTextColor = customTextColor || "#FFFFFF"
  const messageText = message || description

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [{ translateX }],
          opacity,
        },
      ]}
      {...(swipeable ? panResponder.panHandlers : {})}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: finalBackgroundColor,
            borderColor: finalBorderColor,
          },
          glowEffect && [
            styles.glowEffect,
            {
              shadowColor: config.glowColor,
            },
          ],
        ]}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            {finalIcon && (
              <View style={styles.iconContainer}>
                <View style={[styles.iconCircle, { backgroundColor: `${finalIconColor}20` }]}>
                  <Icon name={finalIcon} size={20} color={finalIconColor} />
                </View>
              </View>
            )}

            <View style={styles.textContainer}>
              <Text variant="body-lg" weight="semiBold" color={finalTextColor}>
                {title}
              </Text>
              {messageText && (
                <Text variant="body-sm" weight="regular" color="#94A3B8" style={styles.message}>
                  {messageText}
                </Text>
              )}
            </View>

            {dismissible && onClose && (
              <Pressable onPress={onClose} style={styles.closeButton} hitSlop={8}>
                <Icon name="close" size={18} color="#64748B" />
              </Pressable>
            )}
          </View>

          {type === "loading" && progress !== undefined && (
            <View style={styles.progressContainer}>
              <ProgressBar progress={progress} color={finalIconColor} />
              <Text variant="body-sm" weight="medium" color="#94A3B8" style={styles.progressText}>
                {progress}%
              </Text>
            </View>
          )}

          {(primaryAction || secondaryAction) && (
            <View style={styles.actions}>
              {secondaryAction && (
                <Pressable onPress={secondaryAction.onPress} style={[styles.actionButton, styles.secondaryButton]}>
                  <Text variant="body-sm" weight="medium" color="#94A3B8">
                    {secondaryAction.label}
                  </Text>
                </Pressable>
              )}
              {primaryAction && (
                <Pressable
                  onPress={primaryAction.onPress}
                  style={[styles.actionButton, styles.primaryButton, { backgroundColor: `${finalIconColor}20` }]}
                >
                  <Text variant="body-sm" weight="medium" color={finalIconColor}>
                    {primaryAction.label}
                  </Text>
                </Pressable>
              )}
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  glowEffect: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 25,
    elevation: 15,
  },
  wrapper: {
    width: "100%",
    alignItems: "center",
  },
  container: {
    width: "90%",
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  content: {
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  message: {
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
  },
  progressContainer: {
    gap: 6,
  },
  progressText: {
    textAlign: "right",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  actionButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    minWidth: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  secondaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
})
