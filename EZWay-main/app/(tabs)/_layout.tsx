import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { StyleSheet, Animated, TouchableOpacity, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatBoat from '@/components/ChatBoat';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = React.useState('home');
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            ...styles.tabBar,
            paddingBottom: insets.bottom,
            paddingTop: 10,
          },
          tabBarActiveTintColor: colors.brand.primary,
          tabBarInactiveTintColor: colors.text.secondary,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Animated.View
                style={[
                  styles.tabIconContainer,
                  focused && styles.activeTab,
                  { transform: [{ scale: activeTab === 'home' ? scaleAnim : 1 }] },
                ]}
              >
                <Ionicons name="home" size={24} color={color} />
              </Animated.View>
            ),
          }}
          listeners={{
            tabPress: () => handleTabPress('home'),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: 'Map',
            tabBarIcon: ({ color, focused }) => (
              <Animated.View
                style={[
                  styles.tabIconContainer,
                  focused && styles.activeTab,
                  { transform: [{ scale: activeTab === 'map' ? scaleAnim : 1 }] },
                ]}
              >
                <Ionicons name="map" size={24} color={color} />
              </Animated.View>
            ),
          }}
          listeners={{
            tabPress: () => handleTabPress('map'),
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            title: 'Events',
            tabBarIcon: ({ color, focused }) => (
              <Animated.View
                style={[
                  styles.tabIconContainer,
                  focused && styles.activeTab,
                  { transform: [{ scale: activeTab === 'events' ? scaleAnim : 1 }] },
                ]}
              >
                <Ionicons name="calendar" size={24} color={color} />
              </Animated.View>
            ),
          }}
          listeners={{
            tabPress: () => handleTabPress('events'),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <Animated.View
                style={[
                  styles.tabIconContainer,
                  focused && styles.activeTab,
                  { transform: [{ scale: activeTab === 'profile' ? scaleAnim : 1 }] },
                ]}
              >
                <Ionicons name="person" size={24} color={color} />
              </Animated.View>
            ),
          }}
          listeners={{
            tabPress: () => handleTabPress('profile'),
          }}
        />
      </Tabs>
      <ChatBoat />
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background.card,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: colors.brand.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    height: 60,
  },
  tabIconContainer: {
    padding: 8,
    borderRadius: 12,
    marginBottom: 4,
  },
  activeTab: {
    backgroundColor: colors.background.elevated,
    ...Platform.select({
      ios: {
        shadowColor: colors.brand.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
