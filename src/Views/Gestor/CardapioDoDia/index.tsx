import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import type { IRootStackParamList } from '../../../hook/rootStack';
import MealItem from '../../../components/Mealtem';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';


type Props = {
  navigation: StackNavigationProp<IRootStackParamList>;
};

interface Meal {
  id: string;
  title: string;
  value: string;
  editing: boolean;
}

const EditarCardapioDia: React.FC<Props> = ({ navigation }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 🔁 Buscar refeições ao iniciar
  useEffect(() => {
    const fetchMeals = async () => {
      const mealCollection = collection(db, 'meals');
      const snapshot = await getDocs(mealCollection);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        editing: false,
      })) as Meal[];

      setMeals(data);
    };

    fetchMeals();
  }, []);

  const handleEdit = (id: string) => {
    setMeals(meals.map(m => m.id === id ? { ...m, editing: true } : m));
    setSelectedId(id);
  };

  const handleChange = (id: string, text: string) => {
    setMeals(meals.map(m => m.id === id ? { ...m, value: text } : m));
  };

  const handleSave = async (id: string) => {
    const meal = meals.find(m => m.id === id);
    if (!meal) return;

    await updateDoc(doc(db, 'meals', id), {
      title: meal.title,
      value: meal.value,
    });

    setMeals(meals.map(m => m.id === id ? { ...m, editing: false } : m));
    setSelectedId(null);
  };

  const handleAdd = async () => {
    const docRef = await addDoc(collection(db, 'meals'), {
      title: 'Nova refeição',
      value: '',
    });

    const newMeal: Meal = {
      id: docRef.id,
      title: 'Nova refeição',
      value: '',
      editing: true,
    };

    setMeals([...meals, newMeal]);
    setSelectedId(docRef.id);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'meals', id));
    setMeals(meals.filter(m => m.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleChangeTitle = (id: string, text: string) => {
  setMeals(meals.map(m => m.id === id ? { ...m, title: text } : m));
};


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PainelGestor')}>
          <AntDesign name="arrowleft" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.title}>Refeições de hoje</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {meals.map(meal => (
          <MealItem
            key={meal.id}
            meal={meal}
            isSelected={selectedId === meal.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onChangeValue={handleChange}
            onChangeTitle={handleChangeTitle}
            onSave={handleSave}
          />
        ))}

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
