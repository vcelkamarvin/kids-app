import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Fraunces_400Regular, Fraunces_600SemiBold } from '@expo-google-fonts/fraunces';
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { Platform, View } from 'react-native';
import { colors } from '../tokens';

export default function RootLayout() {
  const [loaded] = useFonts({
    Fraunces_400Regular,
    Fraunces_600SemiBold,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: colors.indigo }} />;
  }

  const inner = (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="light" />
    </>
  );

  // On web: render inside a phone frame centered on a neutral backdrop
  if (Platform.OS === 'web') {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
        minHeight: '100vh' as any,
      }}>
        <View style={{
          width: 390,
          height: 844,
          backgroundColor: colors.indigo,
          borderRadius: 48,
          overflow: 'hidden',
          // Hard shadow — Awwwards-worthy, not a soft blur
          shadowColor: '#000',
          shadowOpacity: 0.35,
          shadowRadius: 60,
          shadowOffset: { width: 0, height: 32 },
        }}>
          {inner}
        </View>
      </View>
    );
  }

  return inner;
}
