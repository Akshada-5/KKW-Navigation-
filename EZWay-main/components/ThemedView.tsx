import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';
import { useColorScheme } from '../hooks/useColorScheme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  colorType?: 'background' | 'card' | 'elevated';
};

export function ThemedView({ 
  style, 
  lightColor, 
  darkColor, 
  colorType = 'background',
  ...otherProps 
}: ThemedViewProps) {
  const theme = useColorScheme() ?? 'light';
  const backgroundColor = theme === 'dark' 
    ? darkColor || `colors.background.dark.${colorType}`
    : lightColor || `colors.background.${colorType}`;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
