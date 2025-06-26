import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import type { IRootStackParamList } from '../../../hook/rootStack';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../config/firebase';

type Props = {
  navigation: StackNavigationProp<IRootStackParamList, 'Feedback'>;
  route: RouteProp<IRootStackParamList, 'Feedback'>;
};


type Meal = {
  id: string;
  title: string;
};

export default function Feedback({ navigation }: Props) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'meals'));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
        }));
        setMeals(data);
      } catch (err) {
        console.error('Erro ao buscar refeições:', err);
        Alert.alert('Erro', 'Não foi possível carregar as refeições.');
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const handleSubmit = async () => {
    if (!selectedMeal) {
      Alert.alert('Refeição obrigatória', 'Por favor, selecione uma refeição.');
      return;
    }

    if (rating === 0) {
      Alert.alert('Avaliação obrigatória', 'Por favor, selecione uma nota.');
      return;
    }

    try {
      await addDoc(collection(db, 'feedbacks'), {
        productName: selectedMeal.title,
        mealId: selectedMeal.id,
        rating,
        comment,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Obrigado!', 'Sua avaliação foi enviada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao enviar avaliação: ', error);
      Alert.alert('Erro', 'Não foi possível enviar a avaliação.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={28} color="black" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Escolha a refeição</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#F97316" />
        ) : (
          <FlatList
            data={meals}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginBottom: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedMeal(item)}
                style={[
                  styles.mealButton,
                  selectedMeal?.id === item.id && styles.mealButtonSelected
                ]}
              >
                <Text style={[
                  styles.mealText,
                  selectedMeal?.id === item.id && styles.mealTextSelected
                ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}

        <Text style={styles.subtitle}>Sua nota:</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((value) => (
            <TouchableOpacity
              key={value}
              onPress={() => setRating(value)}
              style={{ marginHorizontal: 8 }}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={value <= rating ? 'star' : 'star-border'}
                size={44}
                color={value <= rating ? '#FFBF00' : '#AAA'}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subtitle}>Comentário (opcional):</Text>
        <TextInput
          style={styles.input}
          placeholder="Escreva algo sobre a refeição..."
          multiline
          value={comment}
          onChangeText={setComment}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.button, { marginTop: 40 }]}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Enviar Avaliação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { padding: 24, paddingTop: 100 },
  backButton: { position: 'absolute', top: 50, left: 20, zIndex: 2 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#333' },
  subtitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#444' },
  starsContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 14,
    minHeight: 100,
    fontSize: 16,
    color: '#222',
    backgroundColor: '#FAFAFA',
  },
  button: {
    backgroundColor: '#F97316',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3,
  },
  buttonText: { fontSize: 18, color: '#FFF', textAlign: 'center', fontWeight: 'bold' },
  mealButton: {
    backgroundColor: '#EEE',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 12,
  },
  mealButtonSelected: {
    backgroundColor: '#F97316',
  },
  mealText: {
    fontSize: 16,
    color: '#333',
  },
  mealTextSelected: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
