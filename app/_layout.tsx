import 'react-native-gesture-handler';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import CustomDrawerContent from './drawer.content';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer drawerContent={CustomDrawerContent}>
          <Drawer.Screen name="(tabs)" 
            options={{
              title: "",
              headerTintColor: '#fff',
              headerStyle: {
                  backgroundColor: '#043F63',
                  elevation: 0,
              }
            }}
          />
        </Drawer>
      </PaperProvider>
    </ThemeProvider>
  );
}
