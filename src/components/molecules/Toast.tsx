"use client"

import { useRef } from "react"
import { View, StyleSheet, Pressable, Animated, PanResponder } from "react-native"
import { Text } from "../atoms/Text"
import { Icon, IconName } from "@components/atoms/Icon"
import { width } from "@utils/dimensios"
import { ProgressBar } from "@components/atoms/ProgressBar"
import { useTheme } from "@contexts/ThemeContext"


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
  const { theme } = useTheme()
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
        iconColor: theme.colors.toastSuccess,
        backgroundColor: theme.colors.toastSuccessBg,
        borderColor: theme.colors.toastSuccessBorder,
        glowColor: theme.colors.toastSuccess,
      },
      error: {
        icon: "error" as IconName,
        iconColor: theme.colors.toastError,
        backgroundColor: theme.colors.toastErrorBg,
        borderColor: theme.colors.toastErrorBorder,
        glowColor: theme.colors.toastError,
      },
      warning: {
        icon: "warning" as IconName,
        iconColor: theme.colors.toastWarning,
        backgroundColor: theme.colors.toastWarningBg,
        borderColor: theme.colors.toastWarningBorder,
        glowColor: theme.colors.toastWarning,
      },
      info: {
        icon: "info" as IconName,
        iconColor: theme.colors.toastInfo,
        backgroundColor: theme.colors.toastInfoBg,
        borderColor: theme.colors.toastInfoBorder,
        glowColor: theme.colors.toastInfo,
      },
      loading: {
        icon: "download" as IconName,
        iconColor: theme.colors.toastLoading,
        backgroundColor: theme.colors.surfaceSecondary,
        borderColor: theme.colors.border,
        glowColor: theme.colors.toastLoading,
      },
      default: {
        icon: "info" as IconName,
        iconColor: theme.colors.toastDefault,
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        glowColor: theme.colors.toastDefault,
      },
    }

    return configs[type]
  }

  const config = getToastConfig()
  const finalIcon = icon || config.icon
  const finalIconColor = iconColor || config.iconColor
  const finalBackgroundColor = customBackgroundColor || config.backgroundColor
  const finalBorderColor = customBorderColor || config.borderColor
  const finalTextColor = customTextColor || theme.colors.text
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
                  <Icon name={finalIcon} size={16} color={finalIconColor} />
                </View>
              </View>
            )}

            <View style={styles.textContainer}>
              <Text variant="body-sm" weight="semiBold" color={finalTextColor}>
                {title}
              </Text>
              {messageText && (
                <Text variant="body-xs" weight="regular" color={theme.colors.toastTextSecondary} style={styles.message}>
                  {messageText}
                </Text>
              )}
            </View>

            {dismissible && onClose && (
              <Pressable onPress={onClose} style={styles.closeButton} hitSlop={8}>
                <Icon name="close" size={14} color={theme.colors.toastTextSecondary} />
              </Pressable>
            )}
          </View>

          {type === "loading" && progress !== undefined && (
            <View style={styles.progressContainer}>
              <ProgressBar progress={progress} color={finalIconColor} />
              <Text variant="body-sm" weight="medium" color={theme.colors.toastTextSecondary} style={styles.progressText}>
                {progress}%
              </Text>
            </View>
          )}

          {(primaryAction || secondaryAction) && (
            <View style={styles.actions}>
              {secondaryAction && (
                <Pressable onPress={secondaryAction.onPress} style={[styles.actionButton, styles.secondaryButton]}>
                  <Text variant="body-sm" weight="medium" color={theme.colors.toastTextSecondary}>
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
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  wrapper: {
    width: "100%",
    alignItems: "center",
  },
  container: {
    width: "90%",
    borderRadius: 10,
    borderWidth: 1,
    padding: 8,
  },
  content: {
    gap: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 8,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    gap: 1,
  },
  message: {
    marginTop: 1,
  },
  closeButton: {
    padding: 2,
  },
  progressContainer: {
    gap: 4,
  },
  progressText: {
    textAlign: "right",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    minWidth: 60,
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
