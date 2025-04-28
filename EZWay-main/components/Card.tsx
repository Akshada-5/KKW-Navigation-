import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

interface CardProps {
  title: string;
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
  animation?: string;
  delay?: number;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  onPress,
  style,
  animation = 'fadeInUp',
  delay = 0,
}) => {
  const CardContent = (
    <Animatable.View
      animation={animation}
      duration={500}
      delay={delay}
      style={[styles.card, style]}
    >
      <LinearGradient
        colors={['#FFFFFF', '#F8FAFC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.title}>{title}</Text>
        <View style={styles.content}>{children}</View>
      </LinearGradient>
    </Animatable.View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  gradient: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  content: {
    flex: 1,
  },
});

export default Card; 