import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { colors } from '../../src/theme/colors';

interface CategoryProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  onPress: () => void;
  delay: number;
}

const Category: React.FC<CategoryProps> = ({ title, isSelected, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={isSelected ? colors.secondaryGradient : colors.cardGradient1}
      style={[styles.category, isSelected && styles.categorySelected]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
        {title}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);

const EventCard: React.FC<EventCardProps> = ({ title, date, time, location, image, onPress, delay }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity 
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      style={[
        styles.cardWrapper,
        isPressed && styles.cardPressed
      ]}
    >
      <Animatable.View
        animation="fadeInUp"
        duration={800}
        delay={delay}
        style={[styles.eventCard, isPressed && styles.cardPressed]}
      >
        <LinearGradient
          colors={colors.secondaryGradient}
          style={styles.eventCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {image && (
            <Image source={{ uri: image }} style={styles.eventImage} />
          )}
          <View style={styles.eventContent}>
            <Text style={styles.eventTitle}>{title}</Text>
            <View style={styles.eventDetails}>
              <View style={styles.eventDetailItem}>
                <Ionicons name="calendar-outline" size={16} color={colors.brand.primary} />
                <Text style={styles.eventDetailText}>{date}</Text>
              </View>
              <View style={styles.eventDetailItem}>
                <Ionicons name="time-outline" size={16} color={colors.brand.primary} />
                <Text style={styles.eventDetailText}>{time}</Text>
              </View>
              <View style={styles.eventDetailItem}>
                <Ionicons name="location-outline" size={16} color={colors.brand.primary} />
                <Text style={styles.eventDetailText}>{location}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function EventsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Academic', 'Cultural', 'Sports', 'Workshops'];

  const events = [
    {
      title: 'Annual Tech Fest',
      date: 'Mar 15, 2024',
      time: '10:00 AM',
      location: 'Main Auditorium',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b8?q=80&w=1000',
      category: 'Academic'
    },
    {
      title: 'Cultural Night',
      date: 'Mar 20, 2024',
      time: '6:00 PM',
      location: 'Open Air Theatre',
      image: 'https://images.unsplash.com/photo-1511795409834-432f31197ce3?q=80&w=1000',
      category: 'Cultural'
    },
    {
      title: 'Cricket Tournament',
      date: 'Mar 25, 2024',
      time: '9:00 AM',
      location: 'Sports Complex',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000',
      category: 'Sports'
    },
    {
      title: 'AI Workshop',
      date: 'Mar 28, 2024',
      time: '2:00 PM',
      location: 'Computer Lab',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000',
      category: 'Workshops'
    },
    {
      title: 'Science Exhibition',
      date: 'Apr 2, 2024',
      time: '11:00 AM',
      location: 'Science Block',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000',
      category: 'Academic'
    },
    {
      title: 'Dance Competition',
      date: 'Apr 5, 2024',
      time: '4:00 PM',
      location: 'Cultural Hall',
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1000',
      category: 'Cultural'
    },
    {
      title: 'Basketball Championship',
      date: 'Apr 10, 2024',
      time: '3:00 PM',
      location: 'Sports Complex',
      image: 'https://images.unsplash.com/photo-1546519638-68e109dbb01d?q=80&w=1000',
      category: 'Sports'
    },
    {
      title: 'Web Development Bootcamp',
      date: 'Apr 15, 2024',
      time: '10:00 AM',
      location: 'IT Center',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4dfa38?q=80&w=1000',
      category: 'Workshops'
    }
  ];

  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Animatable.View
          animation="fadeIn"
          duration={1000}
        >
          <LinearGradient
            colors={[colors.primaryGradient[0], colors.primaryGradient[1]]}
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.headerContent}>
              <Animatable.Text 
                animation="fadeInDown"
                duration={1000}
                style={styles.title}
              >
                Events & Updates
              </Animatable.Text>
              <Animatable.Text 
                animation="fadeInDown"
                delay={200}
                style={styles.subtitle}
              >
                Stay informed about campus activities
              </Animatable.Text>
            </View>
          </LinearGradient>
        </Animatable.View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categories}
        >
          {categories.map((category) => (
            <Category
              key={category}
              title={category}
              isSelected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>

        <View style={styles.eventsContainer}>
          {filteredEvents.map((event, index) => (
            <EventCard
              key={index}
              {...event}
              onPress={() => {}}
              delay={200 + (index * 200)}
            />
          ))}
          {filteredEvents.length === 0 && (
            <Animatable.View
              animation="fadeIn"
              duration={1000}
              style={styles.noEventsContainer}
            >
              <Text style={styles.noEventsText}>
                No events found for {selectedCategory}
              </Text>
            </Animatable.View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderRadius: 20,
    margin: 16,
    marginTop: 20,
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
  headerContent: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.primary,
    opacity: 0.8,
  },
  categoriesContainer: {
    marginVertical: 16,
  },
  categories: {
    paddingHorizontal: 16,
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categorySelected: {
    ...Platform.select({
      ios: {
        shadowColor: colors.brand.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  categoryText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextSelected: {
    fontWeight: 'bold',
  },
  eventsContainer: {
    padding: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  eventCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.background.card,
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
    transform: [{ scale: 1 }],
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  eventCardGradient: {
    borderRadius: 16,
  },
  eventImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  eventDetails: {
    gap: 8,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventDetailText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  noEventsText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
}); 