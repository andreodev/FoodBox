import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import type { IRootStackParamList } from '../hook/rootStack';

type Props = {
  navigation: StackNavigationProp<IRootStackParamList>;
};

interface Meal {
  id: number;
  title: string;
  value: string;
  editing: boolean;
}

const initialMeals: Meal[] = [
  { id: 1, title: 'Café da manhã', value: 'Pão, Café, Nescau, Ovos', editing: false },
  { id: 2, title: 'Lanche da manhã', value: 'Salgado folheado e Suco de Laranja', editing: false },
  { id: 3, title: 'Almoço', value: 'Strogonoff de frango, Feijão, Salada, Arroz, Macarrão, Suco de laranja e Farofa', editing: false },
  { id: 4, title: 'Lanche da tarde', value: 'Bolo de Laranja e Suco de Abacaxi', editing: false },
];

const EditarCardapioDia: React.FC<Props> = ({ navigation }) => {
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setMeals(meals.map(m => m.id === id ? { ...m, editing: true } : m));
    setSelectedId(id);
  };

  const handleChange = (id: number, text: string) => {
    setMeals(meals.map(m => m.id === id ? { ...m, value: text } : m));
  };

  const handleSave = (id: number) => {
    setMeals(meals.map(m => m.id === id ? { ...m, editing: false } : m));
    setSelectedId(null);
  };

  const handleAdd = () => {
    const newId = meals.length > 0 ? Math.max(...meals.map(m => m.id)) + 1 : 1;
    setMeals([...meals, { id: newId, title: 'Nova refeição', value: '', editing: true }]);
    setSelectedId(newId);
  };

  const handleDelete = (id: number) => {
    setMeals(meals.filter(m => m.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PainelGestor')}>
          <AntDesign name="arrowleft" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.title}>Refeições de hoje:</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {meals.map((meal) => (
          <View key={meal.id} style={selectedId === meal.id ? styles.mealBlockSelected : styles.mealBlock}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealTitle}>{meal.title}:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => handleEdit(meal.id)}>
                  <MaterialIcons name="edit" size={20} color="#F97316" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(meal.id)} style={{ marginLeft: 10 }}>
                  <MaterialIcons name="delete" size={20} color="#F97316" />
                </TouchableOpacity>
              </View>
            </View>
            {meal.editing ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={styles.mealInput}
                  value={meal.value}
                  onChangeText={text => handleChange(meal.id, text)}
                  placeholder="Digite o(s) elemento(s) do item"
                  autoFocus
                />
                <TouchableOpacity onPress={() => handleSave(meal.id)} style={{ marginLeft: 8 }}>
                  <MaterialIcons name="check" size={24} color="#F97316" />
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.mealText}>{meal.value}</Text>
            )}
          </View>
        ))}
        {/* Botão de adicionar nova refeição */}
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <MaterialIcons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    elevation: 2,
    zIndex: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 18,
    color: '#222',
  },
  content: {
    padding: 20,
  },
  mealBlock: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  mealBlockSelected: {
    backgroundColor: '#FFF7ED',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderColor: '#F97316',
    borderWidth: 2,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  mealTitle: {
    fontWeight: 'bold',
    color: '#F97316',
    fontSize: 15,
  },
  mealText: {
    color: '#222',
    fontSize: 14,
  },
  mealInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#F97316',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#222',
  },
  addButton: {
    backgroundColor: '#F97316',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 16,
    elevation: 3,
  },
});

export default EditarCardapioDia; 