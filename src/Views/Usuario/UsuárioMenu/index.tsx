import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import type { IRootStackParamList } from '../../../hook/rootStack';

type Props = {
  navigation: StackNavigationProp<IRootStackParamList, 'MenuUsuario'>;
};

type RoutesWithoutParams = {
  [K in keyof IRootStackParamList]: IRootStackParamList[K] extends undefined ? K : never
}[keyof IRootStackParamList];

type MenuOption = {
  id: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  screen: RoutesWithoutParams;  // Somente rotas sem params
};

export default function MenuUsuario({ navigation }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const options: MenuOption[] = [
    { id: 'feedback', label: 'Feedback', icon: 'rate-review', screen: 'Feedback' },
    { id: 'valor', label: 'Valor Nutricional', icon: 'bar-chart', screen: 'ValorNutricionalUser' },
    { id: 'cardapio', label: 'Cardápio Semanal', icon: 'restaurant-menu', screen: 'CardapioSemanaUser' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo</Text>
      <Text style={styles.subtitle}>O que você vai fazer?</Text>

      <View style={styles.grid}>
        {options.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.button,
              selected === option.id && styles.selectedButton
            ]}
            onPress={() => {
              setSelected(option.id);
              navigation.navigate(option.screen);
            }}
          >
            <MaterialIcons
              name={option.icon}
              size={40}
              color={selected === option.id ? '#F97316' : '#333'}
            />
            <Text style={styles.label}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const buttonSize = (Dimensions.get('window').width - 60) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: buttonSize,
    height: buttonSize,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  selectedButton: {
    backgroundColor: '#FFF3E0',
    borderColor: '#F97316',
    borderWidth: 1,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});
