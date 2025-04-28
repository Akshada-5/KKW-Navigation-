import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';

// Dummy data for events
const events = [
  {
    id: 1,
    title: 'Tech Symposium',
    date: 'March 15, 2024',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Auditorium',
    description: 'Annual technology symposium featuring industry experts and workshops.',
  },
  {
    id: 2,
    title: 'Career Fair',
    date: 'March 20, 2024',
    time: '2:00 PM - 6:00 PM',
    location: 'Sports Complex',
    description: 'Connect with top companies and explore career opportunities.',
  },
  {
    id: 3,
    title: 'Cultural Festival',
    date: 'March 25, 2024',
    time: '11:00 AM - 8:00 PM',
    location: 'Central Plaza',
    description: 'Celebrate diversity with food, music, and performances from around the world.',
  },
];

export default function Events() {
  const insets = useSafeAreaInsets();

  const renderEventItem = ({ item, index }: { item: any; index: number }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={500}
      delay={index * 100}
      style={styles.eventCard}
    >
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDate}>{item.date}</Text>
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventTime}>{item.time}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
      </View>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#3B82F6', '#8B5CF6']}
        style={[styles.header, { paddingTop: insets.top }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Campus Events</Text>
          <Text style={styles.subHeaderText}>Stay updated with what's happening</Text>
        </View>
      </LinearGradient>
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  listContent: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  eventDate: {
    fontSize: 14,
    color: '#64748B',
  },
  eventDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  eventTime: {
    fontSize: 14,
    color: '#64748B',
    marginRight: 16,
  },
  eventLocation: {
    fontSize: 14,
    color: '#64748B',
  },
  eventDescription: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
}); 