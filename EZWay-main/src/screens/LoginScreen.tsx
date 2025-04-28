import React from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';
import { router } from 'expo-router';
import Animated, { 
  FadeInDown, 
  FadeInUp 
} from 'react-native-reanimated';
import { Logo } from '../components/Logo';
import { colors } from '../theme/colors';

export const LoginScreen = () => {
  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Animated.View 
            entering={FadeInDown.duration(1000)}
            style={styles.logoContainer}
          >
            <Logo size="medium" />
          </Animated.View>

          <Animated.View 
            entering={FadeInUp.delay(500).duration(1000)}
            style={styles.formContainer}
          >
            <TextInput
              style={styles.input}
              placeholder="Email or Username"
              placeholderTextColor={colors.text.secondary}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.text.secondary}
              secureTextEntry
            />
            <TouchableOpacity 
              style={styles.button}
              onPress={() => router.replace('/(tabs)')}
            >
              <Animated.Text style={styles.buttonText}>
                Login
              </Animated.Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => router.push('/forgot-password')}
            >
              <Animated.Text style={styles.forgotPasswordText}>
                Forgot Password?
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 48,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.background.secondary,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 16,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.brand.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
}); 