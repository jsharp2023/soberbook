"use client"

import { useEffect, useRef, useState } from "react"
import { View, Animated, Dimensions, PanResponder, StyleSheet, useColorScheme } from "react-native"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

export function ParallaxBackground() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const [mounted, setMounted] = useState(false)
  const mouseX = useRef(new Animated.Value(0)).current
  const mouseY = useRef(new Animated.Value(0)).current
  const scrollY = useRef(new Animated.Value(0)).current

  const bubbleAnimations = useRef(
    Array.from({ length: 8 }, () => ({
      translateY: new Animated.Value(screenHeight),
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0.5),
    })),
  ).current

  useEffect(() => {
    setMounted(true)
    startBubbleAnimations()
  }, [])

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt) => {
      const { locationX, locationY } = evt.nativeEvent
      const normalizedX = (locationX / screenWidth) * 2 - 1
      const normalizedY = (locationY / screenHeight) * 2 - 1

      Animated.parallel([
        Animated.spring(mouseX, {
          toValue: normalizedX,
          useNativeDriver: false,
          tension: 100,
          friction: 8,
        }),
        Animated.spring(mouseY, {
          toValue: normalizedY,
          useNativeDriver: false,
          tension: 100,
          friction: 8,
        }),
      ]).start()
    },
  })

  const startBubbleAnimations = () => {
    bubbleAnimations.forEach((bubble, index) => {
      const animateBubble = () => {
        bubble.translateY.setValue(screenHeight + 50)
        bubble.opacity.setValue(0)
        bubble.scale.setValue(0.5)

        Animated.sequence([
          Animated.delay(index * 2000),
          Animated.parallel([
            Animated.timing(bubble.translateY, {
              toValue: -100,
              duration: 8000 + Math.random() * 4000,
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.timing(bubble.opacity, {
                toValue: 0.6,
                duration: 1000,
                useNativeDriver: true,
              }),
              Animated.timing(bubble.opacity, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
              }),
            ]),
            Animated.timing(bubble.scale, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
        ]).start(() => animateBubble())
      }
      animateBubble()
    })
  }

  const createWavePath = (amplitude: number, frequency: number, phase: number) => {
    const points = []
    for (let x = 0; x <= screenWidth; x += 10) {
      const y = amplitude * Math.sin((x * frequency) / 100 + phase)
      points.push(`${x},${y}`)
    }
    return `M0,${screenHeight} L${points.join(" L")} L${screenWidth},${screenHeight} Z`
  }

  const waveColors = {
    light: {
      wave1: "rgba(59, 130, 246, 0.1)",
      wave2: "rgba(16, 185, 129, 0.08)",
      wave3: "rgba(139, 92, 246, 0.06)",
      wave4: "rgba(236, 72, 153, 0.04)",
    },
    dark: {
      wave1: "rgba(59, 130, 246, 0.3)",
      wave2: "rgba(16, 185, 129, 0.25)",
      wave3: "rgba(139, 92, 246, 0.2)",
      wave4: "rgba(236, 72, 153, 0.15)",
    },
  }

  const currentColors = isDark ? waveColors.dark : waveColors.light

  if (!mounted) {
    return <View style={styles.container} />
  }

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View
        style={[
          styles.background,
          {
            backgroundColor: isDark ? "#111827" : "#F9FAFB",
          },
        ]}
      >
        {/* Floating Bubbles */}
        {bubbleAnimations.map((bubble, index) => (
          <Animated.View
            key={index}
            style={[
              styles.bubble,
              {
                left: (index * screenWidth) / 8 + Math.random() * 50,
                transform: [{ translateY: bubble.translateY }, { scale: bubble.scale }],
                opacity: bubble.opacity,
              },
            ]}
          >
            <View
              style={[
                styles.bubbleInner,
                {
                  backgroundColor: isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.2)",
                },
              ]}
            />
          </Animated.View>
        ))}

        {/* Wave Layers */}
        <Svg height={screenHeight} width={screenWidth} style={StyleSheet.absoluteFillObject}>
          <Defs>
            <LinearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={currentColors.wave1} stopOpacity="1" />
              <Stop offset="100%" stopColor={currentColors.wave1} stopOpacity="0.5" />
            </LinearGradient>
            <LinearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={currentColors.wave2} stopOpacity="1" />
              <Stop offset="100%" stopColor={currentColors.wave2} stopOpacity="0.5" />
            </LinearGradient>
            <LinearGradient id="waveGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={currentColors.wave3} stopOpacity="1" />
              <Stop offset="100%" stopColor={currentColors.wave3} stopOpacity="0.5" />
            </LinearGradient>
            <LinearGradient id="waveGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={currentColors.wave4} stopOpacity="1" />
              <Stop offset="100%" stopColor={currentColors.wave4} stopOpacity="0.5" />
            </LinearGradient>
          </Defs>

          {/* Bottom Waves */}
          <Animated.G
            transform={[
              {
                translateY: mouseY.interpolate({
                  inputRange: [-1, 1],
                  outputRange: [-20, 20],
                }),
              },
            ]}
          >
            <Path d={createWavePath(30, 0.02, 0)} fill="url(#waveGradient1)" />
          </Animated.G>

          <Animated.G
            transform={[
              {
                translateY: mouseY.interpolate({
                  inputRange: [-1, 1],
                  outputRange: [-15, 15],
                }),
              },
            ]}
          >
            <Path d={createWavePath(25, 0.025, Math.PI / 4)} fill="url(#waveGradient2)" />
          </Animated.G>

          <Animated.G
            transform={[
              {
                translateY: mouseY.interpolate({
                  inputRange: [-1, 1],
                  outputRange: [-10, 10],
                }),
              },
            ]}
          >
            <Path d={createWavePath(20, 0.03, Math.PI / 2)} fill="url(#waveGradient3)" />
          </Animated.G>

          <Animated.G
            transform={[
              {
                translateY: mouseY.interpolate({
                  inputRange: [-1, 1],
                  outputRange: [-5, 5],
                }),
              },
            ]}
          >
            <Path d={createWavePath(15, 0.035, (3 * Math.PI) / 4)} fill="url(#waveGradient4)" />
          </Animated.G>
        </Svg>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  background: {
    flex: 1,
  },
  bubble: {
    position: "absolute",
    width: 20,
    height: 20,
  },
  bubbleInner: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
})
