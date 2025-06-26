import React, { useState, type JSX } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import type { IRootStackParamList } from '../hook/rootStack';

type Props = {
  navigation: StackNavigationProp<IRootStackParamList>;
};

const menuOptions: {
  label: string;
  icon: JSX.Element;
  screen: keyof IRootStackParamList;
}[] = [
  { label: 'Feedback', icon: <FontAwesome5 name="comment-dots" size={32} color="#F97316" />, screen: 'Feedback' },
  { label: 'Valor nutricional', icon: <MaterialIcons name="pie-chart" size={32} color="#F97316" />, screen: 'Tela21' },
  { label: 'Cardápio semanal', icon: <MaterialIcons name="restaurant-menu" size={32} color="#F97316" />, screen: 'Tela20' },
];

const PainelUsuario: React.FC<Props> = ({ navigation }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#222" />
      </TouchableOpacity>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>O que você vai fazer hoje?</Text>
      <View style={styles.grid}>
        {menuOptions.map(option => (
          <TouchableOpacity
            key={option.label}
            style={[styles.button, selected === option.label && styles.selectedButton]}
            onPress={() => {
              setSelected(option.label);
              navigation.navigate(option.screen as any);
            }}
            activeOpacity={0.8}
          >
            <View style={styles.iconWrapper}>{option.icon}</View>
            <Text style={styles.buttonText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 10,
    width: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
    marginLeft: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedButton: {
    borderColor: '#F97316',
    borderWidth: 2,
    backgroundColor: '#FFF7ED',
  },
  iconWrapper: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: '#222',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PainelUsuario;
