import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  backButton: { position: "absolute", top: 50, left: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, alignSelf: "center", marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
  input: { backgroundColor: "#F5F5F5", padding: 10, borderRadius: 5, marginTop: 5 },
  saveButton: { backgroundColor: "orange", padding: 15, borderRadius: 5, alignItems: "center", marginTop: 20 },
  saveButtonText: { color: "white", fontWeight: "bold" },
});