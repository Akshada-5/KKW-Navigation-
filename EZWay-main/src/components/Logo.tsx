import React from 'react';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'medium',
  showText = true 
}) => {
  const { width } = useWindowDimensions();
  
  const getSize = () => {
    switch (size) {
      case 'small':
        return width * 0.2; // 20% of screen width
      case 'large':
        return width * 0.5; // 50% of screen width
      case 'medium':
      default:
        return width * 0.35; // 35% of screen width
    }
  };

  const logoSize = getSize();

  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeIn.duration(1000)}
        style={[styles.logoContainer, { width: logoSize, height: logoSize * 1.25 }]}
      >
        <Image
          source={require('../assets/images/logo.svg')}
          style={[styles.logo, { width: logoSize, height: logoSize * 1.25 }]}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
}); 