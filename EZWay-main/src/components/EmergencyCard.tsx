import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import * as Animatable from 'react-native-animatable';

interface EmergencyTip {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const emergencyTips: EmergencyTip[] = [
  {
    id: '1',
    title: 'Fire Emergency',
    description: 'Pull the nearest fire alarm and evacuate immediately',
    icon: 'flame-outline',
  },
  {
    id: '2',
    title: 'Medical Emergency',
    description: 'Call campus security at 911',
    icon: 'medical-outline',
  },
  {
    id: '3',
    title: 'Injury',
    description: 'Visit the campus health center',
    icon: 'bandage-outline',
  },
];

export const EmergencyCard: React.FC = () => {
  const handleEmergencyCall = () => {
    Linking.openURL('tel:911');
  };

  const handleOpenMap = () => {
    const helpDeskLocation = 'Main Building, Room 101';
    const encodedLocation = encodeURIComponent(helpDeskLocation);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    Linking.openURL(googleMapsUrl);
  };

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
          <Text style={styles.title}>Need Help?</Text>
          <TouchableOpacity
            style={styles.emergencyButton}
            activeOpacity={0.8}
            onPress={handleEmergencyCall}
          >
            <Ionicons name="call" size={20} color={colors.text.light} />
            <Text style={styles.emergencyButtonText}>Emergency</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.helpDeskInfo}>
          <View style={styles.helpDeskHeader}>
            <Ionicons name="help-circle-outline" size={24} color={colors.brand.primary} />
            <Text style={styles.helpDeskTitle}>Help Desk</Text>
          </View>
          <View style={styles.helpDeskDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={16} color={colors.text.secondary} />
              <Text style={styles.detailText}>Main Building, Room 101</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={16} color={colors.text.secondary} />
              <Text style={styles.detailText}>8:00 AM - 8:00 PM</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={16} color={colors.text.secondary} />
              <Text style={styles.detailText}>+1 (123) 456-7890</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.mapButton}
            activeOpacity={0.8}
            onPress={handleOpenMap}
          >
            <Ionicons name="map-outline" size={20} color={colors.text.light} />
            <Text style={styles.mapButtonText}>Show on Map</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Emergency Tips</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tipsList}
          >
            {emergencyTips.map((tip, index) => (
              <Animatable.View
                key={tip.id}
                animation="fadeInRight"
                duration={500}
                delay={index * 200}
                style={styles.tipCard}
              >
                <Ionicons name={tip.icon} size={24} color={colors.brand.primary} />
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDescription}>{tip.description}</Text>
              </Animatable.View>
            ))}
          </ScrollView>
        </View>
      </LinearGradient>
    </Animatable.View>
  );
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
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: colors.error,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  emergencyButtonText: {
    color: colors.text.light,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  helpDeskInfo: {
    backgroundColor: colors.background.elevated,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  helpDeskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  helpDeskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginLeft: 8,
  },
  helpDeskDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 8,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand.primary,
    paddingVertical: 12,
    borderRadius: 12,
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
  mapButtonText: {
    color: colors.text.light,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  tipsContainer: {
    marginBottom: 8,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  tipsList: {
    paddingVertical: 8,
  },
  tipCard: {
    backgroundColor: colors.background.elevated,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 200,
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
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: 12,
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
}); 