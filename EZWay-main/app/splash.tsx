import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Logo } from '@/components/Logo';
import { colors } from '@/theme/colors';
import { useColorScheme } from '../hooks/useColorScheme';

export default function SplashScreen() {
  const theme = useColorScheme() ?? 'light';

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme === 'dark' ? colors.background.dark.primary : colors.background.primary }
    ]}>
      <LinearGradient
        colors={theme === 'dark' 
          ? [colors.background.dark.secondary, colors.background.dark.primary]
          : [colors.primaryGradient[0], colors.primaryGradient[1]]}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <Animatable.View
        animation="fadeIn"
        duration={1500}
        style={styles.content}
      >
        <Logo size="large" />
        
        <Animatable.View
          animation="fadeInUp"
          duration={1000}
          delay={500}
        >
          <Text style={[
            styles.appName,
            { color: theme === 'dark' ? colors.text.dark.light : colors.text.light }
          ]}>EZWay</Text>
          <Text style={[
            styles.tagline,
            { color: theme === 'dark' ? colors.text.dark.secondary : colors.text.light }
          ]}>Your Campus Navigation Companion</Text>
        </Animatable.View>

        <Animatable.View
          animation="fadeIn"
          duration={1000}
          delay={1000}
          style={styles.loaderContainer}
        >
          <ActivityIndicator
            size="large"
            color={theme === 'dark' ? colors.text.dark.light : colors.text.light}
            style={styles.loader}
          />
        </Animatable.View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  loader: {
    width: 50,
    height: 50,
  },
}); 