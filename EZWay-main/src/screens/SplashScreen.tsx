import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { 
  FadeIn,
  FadeOut,
  SlideInDown
} from 'react-native-reanimated';
import { Logo } from '../components/Logo';
import { colors } from '../theme/colors';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(500)}
        style={styles.content}
      >
        <Logo size="large" />
        <Animated.Text 
          entering={SlideInDown.delay(500).duration(1000)}
          style={styles.tagline}
        >
          Your Smart Saathi on Campus
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagline: {
    fontSize: 18,
    color: colors.text.secondary,
    marginTop: 16,
    fontWeight: '500',
  },
}); 