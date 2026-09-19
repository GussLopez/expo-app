import CharactersCard from "@/components/characters-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { ApiInfo, Character } from "@/types";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CharactersScreen() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [pageUrl, setPageUrl] = useState(`${apiUrl}/character`);
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [apiInfo, setApiInfo] = useState<ApiInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function loadCharacters() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(pageUrl, {
          signal: controller.signal
        });

        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const data = await res.json();
        setCharacters(data.results);
        setApiInfo(data.info);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error ? err.message : 'No se pudieron cargar los datos'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }
    loadCharacters();

    return () => controller.abort();
  }, [pageUrl]);
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.title}>
            Personajes
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.list}>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{
              gap: Spacing.three,
              paddingBottom: Spacing.four
            }}
            data={characters}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <CharactersCard char={item} />
            )}

          />
        </ThemedView>
        <ThemedView style={styles.footerButtons}>
          <Button
            title="Atras"
            disabled={loading || !apiInfo?.prev}
            onPress={() => {
              if (apiInfo?.prev) {
                setPageUrl(apiInfo.prev);
              }
            }}
          />
          <Button
            title="Siguiente"
            disabled={loading || !apiInfo?.next}
            onPress={() => {
              if (apiInfo?.next) {
                setPageUrl(apiInfo.next);
              }
            }}
          />
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  )
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
  },
  list: {
    flex: 1,
    minHeight: 0,
    width: '100%',
    maxWidth: 340,
  },
  footerButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  nextBtn: {

  },
  prevBtn: {
    backgroundColor: "#FFF",
    color: "#000",
    borderStyle: "solid",
    borderColor: "#c1c1c1"
  }
})