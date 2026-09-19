import * as Device from 'expo-device';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { Image } from 'expo-image';
import { Link } from 'expo-router';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.title}>
            Rick and Morty
          </ThemedText>
        </ThemedView>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <ThemedView style={styles.card}>
            <ThemedView type="backgroundElement">
              <Link href="/characters" asChild>
                <Pressable style={styles.card}>
                  <ThemedText style={styles.cardTitle}>
                    Personajes
                  </ThemedText>

                  <Image
                    source={require('@/assets/images/characters.png')}
                    style={styles.image}
                    contentFit="cover"
                  />
                </Pressable>
              </Link>
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.card}>
            <ThemedView type="backgroundElement">
              <Link href="/locations" asChild>
                <Pressable style={styles.card}>
                  <ThemedText style={styles.cardTitle}>
                    Ubicaciones
                  </ThemedText>

                  <Image
                    source={require('@/assets/images/locations.png')}
                    style={styles.image}
                    contentFit="cover"
                  />
                </Pressable>
              </Link>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView >
    </ThemedView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    flexShrink: 0,
    paddingTop: Spacing.six,
  },
  title: {
    textAlign: 'center',
    marginBottom: 14
  },
  stepContainer: {
    width: '100%',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  card: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 500,
    textAlign: 'center',
    paddingVertical: 15
  },
  image: {
    width: '100%',
    aspectRatio: 296 / 171,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
});
