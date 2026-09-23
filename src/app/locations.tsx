import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { ApiInfo, Location } from "@/types";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocationsPage() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [pageUrl, setPageUrl] = useState(`${apiUrl}/location`);
  const [locations, setLocations] = useState<Location[] | null>(null);
  const [apiInfo, setApiInfo] = useState<ApiInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function loadLocations() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(pageUrl, {
          signal: controller.signal
        });

        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const data = await res.json();
        setLocations(data.results);
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
    loadLocations();

    return () => controller.abort();
  }, [pageUrl]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.title}>
            Ubicaciones
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.list}>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{
              gap: Spacing.three,
              paddingBottom: Spacing.four
            }}
            data={locations}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ThemedView>
                <ThemedView type="backgroundElement" style={styles.stepContainer}>
                  <ThemedView style={styles.cardHeader}>
                    <ThemedText style={styles.nameText}>{item.name}</ThemedText>
                  </ThemedView>
                  <ThemedView>
                    <ThemedView style={styles.descriptionDiv}>
                      <ThemedText style={styles.descriptionLabel}>Dimensión:</ThemedText>
                      <ThemedText>{item.dimension === "unknown" ? 'Desconocida' : item.dimension}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.descriptionDiv}>
                      <ThemedText style={styles.descriptionLabel}>Tipo:</ThemedText>
                      <ThemedText>{item.type}</ThemedText>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
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
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  imageTutorial: {
    width: '100%',
    aspectRatio: 296 / 300,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    justifyContent: 'center'
  },
  nameText: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: 'center'
  },
  descriptionDiv: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    gap: 14
  },
  descriptionLabel: {
    color: "#c1c1c1",
    fontWeight: "400"
  },
})