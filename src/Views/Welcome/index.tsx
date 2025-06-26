import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { IRootStackParamList } from '../../hook/rootStack';
import { styles } from './styles/styles';

type UserType = 'usuario' | 'gestor';

// 🔸 tipagem do hook de navegação
type NavigationProps = StackNavigationProp<IRootStackParamList>;

const Welcome: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [userType, setUserType] = useState<UserType>('usuario');

  const handleContinue = () => {
    if (userType === 'usuario') {
      navigation.navigate('MenuUsuario');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Escolha como você quer entrar:</Text>

      <View style={styles.profileContainer}>
        <TouchableOpacity
          style={[styles.profileBox, userType === 'usuario' && styles.profileBoxActive]}
          onPress={() => setUserType('usuario')}
        >
          <MaterialIcons name="person-outline" size={36} color={userType === 'usuario' ? '#F97316' : '#222'} />
          <Text style={[styles.profileText, userType === 'usuario' && styles.profileTextActive]}>Usuário</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.profileBox, userType === 'gestor' && styles.profileBoxActive]}
          onPress={() => setUserType('gestor')}
        >
          <MaterialIcons name="supervisor-account" size={36} color={userType === 'gestor' ? '#F97316' : '#222'} />
          <Text style={[styles.profileText, userType === 'gestor' && styles.profileTextActive]}>Gestor</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
