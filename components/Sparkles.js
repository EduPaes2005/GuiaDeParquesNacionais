import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, View, StyleSheet } from 'react-native';
import { COLORS } from '../theme/styles';

const { width, height } = Dimensions.get('window');

const SparkleParticle = () => {
  const positionY = useRef(new Animated.Value(Math.random() * height)).current;
  const positionX = useRef(new Animated.Value(Math.random() * width)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Efeito de brilho (piscar)
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: Math.random() * 0.6 + 0.2, duration: Math.random() * 2000 + 1000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: Math.random() * 2000 + 1000, useNativeDriver: true })
      ])
    ).start();

    // Efeito de flutuar para cima lentamente
    Animated.loop(
      Animated.timing(positionY, {
        toValue: -50,
        duration: Math.random() * 15000 + 8000,
        useNativeDriver: true
      })
    ).start();
  }, []);

  return (
    <Animated.View style={[
      styles.sparkle,
      { opacity, transform: [{ translateY: positionY }, { translateX: positionX }] }
    ]} />
  );
};

export default function SparklesBackground() {
  // Gera 20 partículas flutuantes
  const particles = Array.from({ length: 20 }).map((_, i) => <SparkleParticle key={i} />);
  
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles}
    </View>
  );
}

const styles = StyleSheet.create({
  sparkle: {
    position: 'absolute',
    width: 4, height: 4,
    backgroundColor: COLORS.emerald500,
    borderRadius: 2,
    shadowColor: COLORS.emerald500,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1, shadowRadius: 6, elevation: 5
  }
});