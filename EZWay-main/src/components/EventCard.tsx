import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';

interface Event {
  id: string;
  title: string;
  time: string;
  location: string;
  type: 'academic' | 'cultural' | 'sports';
}

const events: Event[] = [
  {
    id: '1',
    title: 'Tech Symposium 2024',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Auditorium',
    type: 'academic',
  },
  {
    id: '2',
    title: 'Cultural Fest',
    time: '2:00 PM - 6:00 PM',
    location: 'Open Air Theater',
    type: 'cultural',
  },
];

export const EventCard: React.FC = () => {
  const router = useRouter();

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={1000}
      style={styles.container}
    >
      <LinearGradient
        colors={[colors.background.card, colors.background.elevated]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>What's Happening Today?</Text>
          <TouchableOpacity
            style={styles.viewAllButton}
            activeOpacity={0.8}
            onPress={() => router.push('/events')}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.brand.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventsContainer}
        >
          {events.map((event, index) => (
            <Animatable.View
              key={event.id}
              animation="fadeInRight"
              duration={500}
              delay={index * 200}
              style={styles.eventCard}
            >
              <View style={styles.eventHeader}>
                <View style={[styles.eventType, { backgroundColor: getEventTypeColor(event.type) }]}>
                  <Text style={styles.eventTypeText}>{event.type}</Text>
                </View>
                <Ionicons name="time-outline" size={16} color={colors.text.secondary} />
              </View>

              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventTime}>{event.time}</Text>
              <View style={styles.eventLocation}>
                <Ionicons name="location-outline" size={16} color={colors.text.secondary} />
                <Text style={styles.eventLocationText}>{event.location}</Text>
              </View>
            </Animatable.View>
          ))}
        </ScrollView>
      </LinearGradient>
    </Animatable.View>
  );
};

const getEventTypeColor = (type: Event['type']): string => {
  switch (type) {
    case 'academic':
      return colors.accentGradient[0];
    case 'cultural':
      return colors.accentGradient[1];
    case 'sports':
      return colors.brand.primary;
    default:
      return colors.text.secondary;
  }
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.brand.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  gradient: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: colors.brand.primary,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  eventsContainer: {
    paddingVertical: 8,
  },
  eventCard: {
    backgroundColor: colors.background.elevated,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 280,
    ...Platform.select({
      ios: {
        shadowColor: colors.brand.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  eventTypeText: {
    color: colors.text.light,
    fontSize: 12,
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  eventTime: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventLocationText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 4,
  },
}); 