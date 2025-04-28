import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import * as Animatable from 'react-native-animatable';
import { WebView } from 'react-native-webview';

export const MapCard: React.FC = () => {
  const mapUrl = 'https://app.mappedin.com/map/67ab5dbf4bb292000bb76a5a/directions?location=s_33ed59567a9d5760&departure=s_df3c837939eb44e5+loc_d14b931cbc0ef30b&floor=m_60af83f354957bdc';

  const handleOpenMap = () => {
    Linking.openURL(mapUrl);
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
          <Text style={styles.title}>Explore the Campus Map</Text>
          <TouchableOpacity
            style={styles.expandButton}
            activeOpacity={0.8}
            onPress={handleOpenMap}
          >
            <Ionicons name="expand" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.mapPreview}>
          <WebView
            source={{ uri: mapUrl }}
            style={styles.mapImage}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
          />
          <View style={styles.overlay}>
            <TouchableOpacity
              style={styles.zoomButton}
              activeOpacity={0.8}
              onPress={handleOpenMap}
            >
              <Ionicons name="search" size={20} color={colors.text.light} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.8}
            onPress={handleOpenMap}
          >
            <Ionicons name="navigate" size={20} color={colors.text.light} />
            <Text style={styles.actionButtonText}>Get Directions</Text>
          </TouchableOpacity>
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
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  expandButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.background.elevated,
  },
  mapPreview: {
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 16,
  },
  zoomButton: {
    backgroundColor: colors.brand.primary,
    padding: 12,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
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
  actionButtonText: {
    color: colors.text.light,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
}); 