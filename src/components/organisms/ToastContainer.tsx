/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Toast } from "@components/molecules/Toast"
import { useToast } from "@contexts/ToastContext"
import { height } from "@utils/dimensios"
import { useEffect, useRef } from "react"
import { View, StyleSheet, Animated } from "react-native"


export const ToastContainer = () => {
  const { toasts, hideToast } = useToast()

  return (
    <>
      {/* Top Toasts */}
      <View style={styles.topContainer} pointerEvents="box-none">
        {toasts
          .filter((t) => !t.position || t.position === "top")
          .map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={() => hideToast(toast.id)} position="top" />
          ))}
      </View>

      {/* Center Toasts */}
      <View style={styles.centerContainer} pointerEvents="box-none">
        {toasts
          .filter((t) => t.position === "center")
          .map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={() => hideToast(toast.id)} position="center" />
          ))}
      </View>

      {/* Bottom Toasts */}
      <View style={styles.bottomContainer} pointerEvents="box-none">
        {toasts
          .filter((t) => t.position === "bottom")
          .map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={() => hideToast(toast.id)} position="bottom" />
          ))}
      </View>
    </>
  )
}

interface ToastItemProps {
  toast: any
  onDismiss: () => void
  position: "top" | "bottom" | "center"
}

const ToastItem = ({ toast, onDismiss, position }: ToastItemProps) => {
  const translateY = useRef(new Animated.Value(position === "bottom" ? 100 : -100)).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()

    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, toast.duration)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === "bottom" ? 100 : -100,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss())
  }

  return (
    <Animated.View
      style={[
        styles.toastWrapper,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Toast {...toast} onClose={toast.dismissible !== false ? handleDismiss : undefined} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    gap: 12,
    zIndex: 9999,
    pointerEvents: "box-none",
  },
  centerContainer: {
    position: "absolute",
    top:  height / 2 - 100,
    left: 0,
    right: 0,
    alignItems: "center",
    gap: 12,
    zIndex: 9999,
    pointerEvents: "box-none",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    gap: 12,
    zIndex: 9999,
    pointerEvents: "box-none",
  },
  toastWrapper: {
    width: "100%",
    alignItems: "center",
  },
})
