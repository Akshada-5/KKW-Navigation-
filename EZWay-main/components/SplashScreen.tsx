import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import collegeLogo from '../assets/images/icon.png';

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <LinearGradient
      colors={['#3B82F6', '#8B5CF6']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Animatable.View
        animation="bounceIn"
        duration={1500}
        style={styles.logoContainer}
      >
        <Image
          source={collegeLogo}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animatable.View>

      <Animatable.View
        animation="fadeIn"
        duration={1000}
        delay={500}
        style={styles.textContainer}
      >
        <Text style={styles.appName}>EZWay</Text>
        <Text style={styles.tagline}>Your Smart Sathi On Campus</Text>
      </Animatable.View>

      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={1500}
        style={styles.loaderContainer}
      >
        <View style={styles.loader} />
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 50,
  },
  loader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderTopColor: 'transparent',
  },
});

export default SplashScreen; 