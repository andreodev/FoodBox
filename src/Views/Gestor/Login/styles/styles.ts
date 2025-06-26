import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    justifyContent: "center"
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: 15
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    fontSize: 16
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
  forgotPassword: {
    color: "orange",
    textAlign: "right",
    marginBottom: 20
  },
  loginButton: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
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
  orText: {
    textAlign: "center",
    marginVertical: 15,
    color: "gray",
    fontSize: 14
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 1,
    borderRadius: 8
  },
  googleText: {
    marginLeft: 10,
    fontSize: 16
  }
});