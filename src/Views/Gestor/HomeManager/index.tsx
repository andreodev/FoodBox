import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IRootStackParamList } from "../../../hook/rootStack";
import type { StackNavigationProp } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./style/style";

type TelaLoginProps = StackNavigationProp<IRootStackParamList, "Login">;

interface Props {
  navigation: TelaLoginProps;
}

const HomeManager: React.FC<Props> = ({ navigation }) => {
  const [selectedUser, setSelectedUser] = useState<
    "empresa" | "funcionario" | null
  >(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Entrar na sua conta, você é?</Text>

      <View style={styles.userTypeContainer}>
        <TouchableOpacity
          style={[
            styles.userType,
            selectedUser === "empresa" && styles.selectedUser,
          ]}
          onPress={() => setSelectedUser("empresa")}
        >
          <Text style={styles.userTitle}>Empresa</Text>
          <Text style={styles.userSubtitle}>Enviar para o seu email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.userType,
            selectedUser === "funcionario" && styles.selectedUser,
          ]}
          onPress={() => setSelectedUser("funcionario")}
        >
          <Text style={styles.userTitle}>Funcionário</Text>
          <Text style={styles.userSubtitle}>Envie seu número de celular</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => console.log("Esqueceu sua senha?")}>
        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("CreateManager")}>
        <Text style={styles.signupText}>
          Ainda não tem uma conta?{" "}
          <Text style={styles.signupLink}>Crie uma!</Text>
        </Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Ou com</Text>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialButtonText}>Entre com o Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialButtonText}>Entre com a Apple</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeManager;
