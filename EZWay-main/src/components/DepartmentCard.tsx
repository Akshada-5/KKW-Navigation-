import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import * as Animatable from 'react-native-animatable';

interface Department {
  id: string;
  name: string;
  location: string;
  hours: string;
  contact: string;
}

const departments: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    location: 'Block A, Room 101',
    hours: '9:00 AM - 5:00 PM',
    contact: 'cs@college.edu',
  },
  {
    id: '2',
    name: 'Electrical Engineering',
    location: 'Block B, Room 205',
    hours: '9:00 AM - 5:00 PM',
    contact: 'ee@college.edu',
  },
  {
    id: '3',
    name: 'Mechanical Engineering',
    location: 'Block C, Room 301',
    hours: '9:00 AM - 5:00 PM',
    contact: 'me@college.edu',
  },
];

export const DepartmentCard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState(departments);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = departments.filter(dept =>
      dept.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDepartments(filtered);
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
          <Text style={styles.title}>Departments & Faculty</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.text.secondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search departments..."
            placeholderTextColor={colors.text.secondary}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        <ScrollView
          style={styles.departmentsList}
          showsVerticalScrollIndicator={false}
        >
          {filteredDepartments.map((dept, index) => (
            <Animatable.View
              key={dept.id}
              animation="fadeInRight"
              duration={500}
              delay={index * 200}
              style={styles.departmentCard}
            >
              <View style={styles.departmentHeader}>
                <Text style={styles.departmentName}>{dept.name}</Text>
                <TouchableOpacity
                  style={styles.locationButton}
                  activeOpacity={0.8}
                >
                  <Ionicons name="location-outline" size={20} color={colors.brand.primary} />
                </TouchableOpacity>
              </View>

              <View style={styles.departmentInfo}>
                <View style={styles.infoRow}>
                  <Ionicons name="time-outline" size={16} color={colors.text.secondary} />
                  <Text style={styles.infoText}>{dept.hours}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="mail-outline" size={16} color={colors.text.secondary} />
                  <Text style={styles.infoText}>{dept.contact}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="business-outline" size={16} color={colors.text.secondary} />
                  <Text style={styles.infoText}>{dept.location}</Text>
                </View>
              </View>
            </Animatable.View>
          ))}
        </ScrollView>
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
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.elevated,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 50,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 16,
  },
  departmentsList: {
    maxHeight: 300,
  },
  departmentCard: {
    backgroundColor: colors.background.elevated,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
  departmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  locationButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.background.elevated,
  },
  departmentInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 8,
  },
}); 