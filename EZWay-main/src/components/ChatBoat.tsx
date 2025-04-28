import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Linking, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { LinearGradient } from 'expo-linear-gradient';

interface ChatMessage {
  role: string;
  content: string;
  action?: string;
  location?: string;
}

const ChatBoat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const genAI = new GoogleGenerativeAI('AIzaSyB_Dvl_NDoGYd0biBhE2OziZKQ0_pcSA-I');

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chatHistory]);

  const handleLocationQuery = (query: string) => {
    // Check if the query is about a location
    const locationKeywords = ['where is', 'location of', 'find', 'show me', 'how to get to'];
    const isLocationQuery = locationKeywords.some(keyword => 
      query.toLowerCase().includes(keyword)
    );

    if (isLocationQuery) {
      // Extract the location from the query
      const locationMatch = query.match(/(?:where is|location of|find|show me|how to get to)\s+(.+)/i);
      if (locationMatch) {
        const location = locationMatch[1].trim();
        return {
          response: `Sure! Highlighting ${location} on the map for you.`,
          action: 'highlight_location',
          location
        };
      }
    }
    return null;
  };

  const handleMapAction = (location: string) => {
    // Open the map with the location highlighted
    const mapUrl = `https://app.mappedin.com/map/67ab5dbf4bb292000bb76a5a/directions?location=${encodeURIComponent(location)}`;
    Linking.openURL(mapUrl);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      // Check for location query first
      const locationResponse = handleLocationQuery(message);
      if (locationResponse) {
        const botMessage = { 
          role: 'bot', 
          content: locationResponse.response,
          action: locationResponse.action,
          location: locationResponse.location
        };
        setChatHistory(prev => [...prev, botMessage]);
        if (locationResponse.action === 'highlight_location') {
          handleMapAction(locationResponse.location!);
        }
      } else {
        // If not a location query, use AI
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        const botMessage = { role: 'bot', content: text };
        setChatHistory(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'bot', content: 'Sorry, I encountered an error. Please try again.' };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 7
        }),
        Animated.spring(scaleAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 7
        })
      ]).start();
    }
  };

  return (
    <View style={styles.container}>
      {isOpen && (
        <Animated.View 
          style={[
            styles.chatWindow,
            {
              transform: [
                { translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [500, 0]
                })},
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <LinearGradient
            colors={['#0F172A', '#1E293B']}
            style={styles.chatHeader}
          >
            <View style={styles.headerContent}>
              <View style={styles.botAvatar}>
                <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
              </View>
              <Text style={styles.headerText}>EZWay Assistant</Text>
            </View>
            <TouchableOpacity onPress={toggleChat} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
          <ScrollView 
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
          >
            {chatHistory.map((msg, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.messageBubble,
                  msg.role === 'user' ? styles.userMessage : styles.botMessage,
                  {
                    opacity: slideAnim,
                    transform: [
                      {
                        translateX: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [msg.role === 'user' ? 100 : -100, 0]
                        })
                      }
                    ]
                  }
                ]}
              >
                <Text style={[
                  msg.role === 'user' ? styles.userMessageText : styles.botMessageText
                ]}>
                  {msg.content}
                </Text>
                {msg.action === 'highlight_location' && (
                  <TouchableOpacity
                    style={styles.mapButton}
                    onPress={() => handleMapAction(msg.location!)}
                  >
                    <Ionicons name="map-outline" size={16} color="#fff" />
                    <Text style={styles.mapButtonText}>Show on Map</Text>
                  </TouchableOpacity>
                )}
              </Animated.View>
            ))}
            {isTyping && (
              <View style={styles.typingIndicator}>
                <Text style={styles.typingText}>Assistant is typing</Text>
                <View style={styles.typingDots}>
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                </View>
              </View>
            )}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message..."
              placeholderTextColor="#666"
            />
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleSendMessage}
            >
              <LinearGradient
                colors={['#0F172A', '#1E293B']}
                style={styles.sendButtonGradient}
              >
                <Ionicons name="send" size={24} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
      <TouchableOpacity
        style={styles.chatButton}
        onPress={toggleChat}
      >
        <LinearGradient
          colors={['#0F172A', '#1E293B']}
          style={styles.chatButtonGradient}
        >
          <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  chatButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  chatButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatWindow: {
    width: 350,
    height: 500,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 80,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  messagesContent: {
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0F172A',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  userMessageText: {
    color: '#fff',
    fontSize: 16,
  },
  botMessageText: {
    color: '#0F172A',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#f8f9fa',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignSelf: 'flex-start',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  typingText: {
    color: '#666',
    fontSize: 14,
    marginRight: 5,
  },
  typingDots: {
    flexDirection: 'row',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#666',
    marginHorizontal: 2,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    padding: 8,
    borderRadius: 12,
    marginTop: 8,
    alignSelf: 'flex-start',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 4,
  },
});

export default ChatBoat; 