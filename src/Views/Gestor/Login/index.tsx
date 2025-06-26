import type { StackNavigationProp } from "@react-navigation/stack";
import type { IRootStackParamList } from "../../../hook/rootStack";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { styles } from "./styles/styles";
import { AntDesign } from "@expo/vector-icons";

// Firebase Firestore
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase"; // Ajuste o caminho conforme seu projeto

type LoginScreenNavigationProp = StackNavigationProp<IRootStackParamList>;

interface ILogin {
  navigation: LoginScreenNavigationProp;
}

export default function Login({ navigation }: ILogin) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Erro", "Preencha email e senha.");
      return;
    }

    setLoading(true);
    try {
      // Consulta no Firestore por email
      const q = query(collection(db, "managers"), where("email", "==", email.trim().toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert("Erro", "Usuário não encontrado.");
        setLoading(false);
        return;
      }

      // Deve ter só 1 usuário com o email, pega o primeiro
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      if (userData.password !== password) {
        Alert.alert("Erro", "Senha incorreta.");
        setLoading(false);
        return;
      }

      // Login OK
      navigation.navigate("PainelGestor");

    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert("Erro", "Erro ao tentar fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Bem-vindo novamente!</Text>
      <Text style={styles.subtitle}>Entrar na sua conta</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu email"
          value={email}
          onChangeText={setEmail}
          autoComplete="email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Sua senha"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <AntDesign
              name={showPassword ? "eye" : "eyeo"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CreateManager')}>
        <Text style={styles.signupText}>
          Ainda não tem uma conta? <Text style={styles.signupLink}>Crie uma!</Text>
        </Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Ou entre com</Text>

      <TouchableOpacity style={styles.googleButton}>
        <AntDesign name="google" size={24} color="red" />
        <Text style={styles.googleText}>Google</Text>
      </TouchableOpacity>
    </View>
  );
}
