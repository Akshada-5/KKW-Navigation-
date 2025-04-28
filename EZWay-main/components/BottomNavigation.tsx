import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

const BottomNavigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      name: 'Home',
      icon: 'home',
      path: '/',
    },
    {
      name: 'Map',
      icon: 'map',
      path: '/map',
    },
    {
      name: 'Events',
      icon: 'calendar',
      path: '/events',
    },
    {
      name: 'Profile',
      icon: 'person',
      path: '/profile',
    },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab}
          onPress={() => router.push(tab.path)}
        >
          <Animatable.View
            animation={isActive(tab.path) ? 'pulse' : undefined}
            duration={500}
            style={styles.tabContent}
          >
            <Ionicons
              name={tab.icon as any}
              size={24}
              color={isActive(tab.path) ? '#3B82F6' : '#64748B'}
            />
            <Animatable.Text
              animation={isActive(tab.path) ? 'fadeIn' : undefined}
              style={[
                styles.tabText,
                isActive(tab.path) && styles.activeTabText,
              ]}
            >
              {tab.name}
            </Animatable.Text>
          </Animatable.View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  activeTabText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
});

export default BottomNavigation; 