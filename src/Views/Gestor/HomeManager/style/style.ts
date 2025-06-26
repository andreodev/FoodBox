import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  signupText: {
    textAlign: "center",
    color: "gray",
    fontSize: 14
  },
  signupLink: {
    color: "orange",
    fontWeight: "bold"
  },
    backButton: {
    position: "absolute",
    top: 50,
    left: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  userTypeContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  userType: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: "center",
  },
  selectedUser: {
    borderWidth: 2,
    borderColor: "#f90",
  },
  userTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  forgotPassword: {
    color: "#f90",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#f90",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    color: "#666",
    fontSize: 14,
    marginBottom: 20,
  },
  registerLink: {
    color: "#f90",
    fontWeight: "bold",
  },
  orText: {
    color: "#666",
    fontSize: 14,
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    marginBottom: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});