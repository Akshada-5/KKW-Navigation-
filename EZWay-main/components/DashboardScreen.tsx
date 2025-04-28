import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Card from './Card';

const { width } = Dimensions.get('window');

const DashboardScreen: React.FC = () => {
  // Dummy data for demonstration
  const events = [
    {
      id: 1,
      title: 'Tech Symposium',
      time: '10:00 AM - 4:00 PM',
      location: 'Main Auditorium',
    },
    {
      id: 2,
      title: 'Career Fair',
      time: '2:00 PM - 6:00 PM',
      location: 'Sports Complex',
    },
  ];

  const departments = [
    {
      id: 1,
      name: 'Computer Science',
      hours: '9:00 AM - 5:00 PM',
    },
    {
      id: 2,
      name: 'Electrical Engineering',
      hours: '9:00 AM - 5:00 PM',
    },
  ];

  const emergencyInfo = {
    helpDesk: {
      location: 'Administration Building, Room 101',
      hours: '24/7',
      contact: '123-456-7890',
    },
    tips: [
      'In case of fire, use nearest exit',
      'For medical emergency, call campus security',
      'Report any suspicious activity immediately',
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#3B82F6', '#8B5CF6']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animatable.View
          animation="fadeInDown"
          duration={1000}
          style={styles.headerContent}
        >
          <Text style={styles.greeting}>Welcome, User</Text>
          <Text style={styles.subGreeting}>Explore your campus</Text>
        </Animatable.View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Map Card */}
        <Card
          title="Explore the Campus Map"
          style={styles.mapCard}
          animation="fadeInUp"
          delay={200}
        >
          <WebView
            source={{ uri: 'https://mappedin.com/your-campus-map' }}
            style={styles.map}
          />
        </Card>

        {/* Events Card */}
        <Card
          title="What's Happening Today?"
          animation="fadeInUp"
          delay={400}
        >
          {events.map((event) => (
            <View key={event.id} style={styles.eventItem}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDetails}>
                {event.time} • {event.location}
              </Text>
            </View>
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Events</Text>
          </TouchableOpacity>
        </Card>

        {/* Departments Card */}
        <Card
          title="Departments & Faculty"
          animation="fadeInUp"
          delay={600}
        >
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search departments..."
              placeholderTextColor="#94A3B8"
            />
          </View>
          {departments.map((dept) => (
            <View key={dept.id} style={styles.departmentItem}>
              <Text style={styles.departmentName}>{dept.name}</Text>
              <Text style={styles.departmentHours}>{dept.hours}</Text>
            </View>
          ))}
        </Card>

        {/* Emergency Card */}
        <Card
          title="Need Help?"
          animation="fadeInUp"
          delay={800}
        >
          <View style={styles.helpDeskInfo}>
            <Text style={styles.helpDeskTitle}>Help Desk</Text>
            <Text style={styles.helpDeskDetails}>
              Location: {emergencyInfo.helpDesk.location}
            </Text>
            <Text style={styles.helpDeskDetails}>
              Hours: {emergencyInfo.helpDesk.hours}
            </Text>
            <Text style={styles.helpDeskDetails}>
              Contact: {emergencyInfo.helpDesk.contact}
            </Text>
          </View>
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapButtonText}>Highlight Help Desk on Map</Text>
          </TouchableOpacity>
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Emergency Tips</Text>
            {emergencyInfo.tips.map((tip, index) => (
              <Text key={index} style={styles.tipText}>
                • {tip}
              </Text>
            ))}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: 180,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subGreeting: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    padding: 16,
  },
  mapCard: {
    height: 250,
    marginBottom: 16,
  },
  map: {
    flex: 1,
    borderRadius: 12,
  },
  eventItem: {
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  eventDetails: {
    fontSize: 14,
    color: '#64748B',
  },
  viewAllButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  viewAllText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  departmentItem: {
    marginBottom: 12,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  departmentHours: {
    fontSize: 14,
    color: '#64748B',
  },
  helpDeskInfo: {
    marginBottom: 16,
  },
  helpDeskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  helpDeskDetails: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  mapButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  tipsContainer: {
    marginTop: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
});

export default DashboardScreen; 