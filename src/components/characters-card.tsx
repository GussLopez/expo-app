import { Spacing } from "@/constants/theme";
import { Character } from "@/types";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export default function CharacterCard({ char }: { char: Character }) {

  return (
    <ThemedView>
      <ThemedView type="backgroundElement" style={styles.stepContainer}>
        <ThemedView style={styles.cardHeader}>
          <ThemedText style={styles.nameText}>{char.name}</ThemedText>
          <ThemedText style={styles.statusText}>{char.status}</ThemedText>
        </ThemedView>
        <Image
          source={char.image}
          style={styles.imageTutorial}
        />
      </ThemedView>
    </ThemedView>
  )
}


const styles = StyleSheet.create({
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
    justifyContent: 'space-between'
  },
  nameText: {
    fontSize: 20,
    fontWeight: "600"
  },
  statusText: {
    fontSize: 15,
    fontWeight: "400"
  }
})