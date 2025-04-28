import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { MapCard } from '@/components/MapCard';
import { EventCard } from '@/components/EventCard';
import { DepartmentCard } from '@/components/DepartmentCard';
import { EmergencyCard } from '@/components/EmergencyCard';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const userName = 'John Doe'; // Replace with actual user name

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[colors.brand.primary, colors.primaryGradient[0]]}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <Animatable.View
        animation="fadeInDown"
        duration={1000}
        style={styles.header}
      >
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.userName}>{userName}</Text>
        <View style={styles.headerDivider} />
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        delay={300}
        style={styles.mapCardContainer}
      >
        <MapCard />
      </Animatable.View>

      <View style={styles.cardsSection}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <Animatable.View
          animation="fadeInUp"
          duration={1000}
          delay={600}
          style={styles.cardContainer}
        >
          <EventCard />
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          duration={1000}
          delay={900}
          style={styles.cardContainer}
        >
          <DepartmentCard />
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          duration={1000}
          delay={1200}
          style={styles.cardContainer}
        >
          <EmergencyCard />
        </Animatable.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    opacity: 0.9,
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.text.light,
    opacity: 0.9,
  },
  userName: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text.light,
    marginTop: 4,
  },
  headerDivider: {
    width: 40,
    height: 4,
    backgroundColor: colors.brand.accent,
    borderRadius: 2,
    marginTop: 16,
  },
  mapCardContainer: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.brand.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardsSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  cardContainer: {
    marginBottom: 16,
    borderRadius: 16,
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
}); 