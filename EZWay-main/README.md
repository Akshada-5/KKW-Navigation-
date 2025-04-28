# EZWay - College Navigation App

A modern, responsive, and animated React Native app for college campus navigation and information.

## Features

- 🎨 Modern UI with smooth animations and gradients
- 🗺️ Interactive campus map integration
- 📱 Responsive design for both iOS and Android
- 🔐 Secure authentication system
- 📅 Event management and announcements
- 🏢 Department and faculty information
- 🆘 Emergency help and safety features

## Tech Stack

- React Native
- Expo
- TypeScript
- React Native Navigation
- React Native Animatable
- React Native WebView
- Expo Linear Gradient
- NativeWind / Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ezway.git
cd ezway
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on your preferred platform:
```bash
# For iOS
npm run ios
# or
yarn ios

# For Android
npm run android
# or
yarn android
```

## Project Structure

```
ezway/
├── app/                  # Main app screens
│   ├── _layout.tsx      # Root layout component
│   ├── index.tsx        # Home/Dashboard screen
│   ├── login.tsx        # Login screen
│   ├── signup.tsx       # Signup screen
│   ├── map.tsx          # Full-screen map view
│   ├── events.tsx       # Events list screen
│   ├── profile.tsx      # Profile screen
│   └── forgot-password.tsx # Password reset screen
├── components/          # Reusable components
│   ├── Card.tsx         # Card component
│   ├── LoginScreen.tsx  # Login form
│   ├── DashboardScreen.tsx # Dashboard layout
│   ├── ProfileScreen.tsx # Profile layout
│   ├── SplashScreen.tsx # Splash screen
│   └── BottomNavigation.tsx # Bottom tab navigation
├── assets/             # Static assets
│   ├── fonts/         # Custom fonts
│   └── images/        # Images and icons
└── constants/         # App constants and configuration
```

## Features in Detail

### Authentication
- Secure login and signup
- Password reset functionality
- Session management

### Dashboard
- Personalized welcome message
- Quick access to important features
- Animated card components

### Map Integration
- Interactive campus map
- Location search
- Building information
- Navigation assistance

### Events
- Upcoming events list
- Event details
- Registration system

### Profile
- User information
- Settings management
- Dark mode support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Animatable](https://github.com/oblador/react-native-animatable)
- [Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
