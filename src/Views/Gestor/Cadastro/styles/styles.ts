import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: '#fff' },
  backButton: { position: "absolute", top: 50, left: 20, zIndex: 2 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginTop: 40 },
  subtitle: { fontSize: 16, color: "gray", textAlign: "center", marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    fontSize: 16
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },
  registerButton: {
    backgroundColor: "#F97316",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20
  },
  registerText: { color: "white", fontWeight: "bold", fontSize: 16 },
  termsText: { textAlign: "center", marginTop: 20, color: "gray" },
  termsLink: { color: "#F97316", fontWeight: "bold" }
});