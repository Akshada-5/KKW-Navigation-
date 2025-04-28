import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleResetPassword = () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }
    // TODO: Implement actual password reset logic
    setIsSubmitted(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
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
          <Text style={styles.headerText}>Reset Password</Text>
          <Text style={styles.subHeaderText}>
            {isSubmitted
              ? 'Check your email for reset instructions'
              : 'Enter your email to receive reset instructions'}
          </Text>
        </Animatable.View>
      </LinearGradient>

      <View style={styles.formContainer}>
        <Animatable.View
          animation="fadeInUp"
          duration={1000}
          style={styles.form}
        >
          {!isSubmitted ? (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {error ? (
                <Animatable.View animation="shake" duration={500}>
                  <Text style={styles.errorText}>{error}</Text>
                </Animatable.View>
              ) : null}

              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleResetPassword}
              >
                <Text style={styles.resetButtonText}>Send Reset Link</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Animatable.View
              animation="fadeIn"
              duration={1000}
              style={styles.successContainer}
            >
              <Text style={styles.successText}>
                We've sent password reset instructions to your email address.
              </Text>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push('/login')}
              >
                <Text style={styles.backButtonText}>Back to Login</Text>
              </TouchableOpacity>
            </Animatable.View>
          )}
        </Animatable.View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    padding: 20,
  },
  successText: {
    fontSize: 16,
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen; 