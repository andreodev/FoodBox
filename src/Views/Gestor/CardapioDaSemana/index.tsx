import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { AntDesign } from "@expo/vector-icons";

const initialDias = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];


export default function CardapioDaSemana({ navigation }: any) {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [mealsByDay, setMealsByDay] = useState<Record<string, string[]>>({});
  const [allMeals, setAllMeals] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedDays, setExpandedDays] = useState<string[]>([]);

  const userId = "anonimo";

  function orderSelectedDays(days: string[]) {
    return initialDias.filter((d) => days.includes(d));
  }

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const mealsSnap = await getDocs(collection(db, "meals"));
      const mealsList = mealsSnap.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
      }));
      setAllMeals(mealsList);

      const cardapioDoc = await getDoc(doc(db, "cardapios", userId));
      if (cardapioDoc.exists()) {
        const data = cardapioDoc.data();
        const weekPlan = data.weekPlan || {};
        setMealsByDay(weekPlan);
        setSelectedDays(orderSelectedDays(Object.keys(weekPlan)));
      }

      setLoading(false);
    }

    loadData();
  }, []);

  function toggleDay(day: string) {
    let newSelected;
    if (selectedDays.includes(day)) {
      newSelected = selectedDays.filter((d) => d !== day);
      const newMealsByDay = { ...mealsByDay };
      delete newMealsByDay[day];
      setMealsByDay(newMealsByDay);
      setExpandedDays(expandedDays.filter((d) => d !== day));
    } else {
      newSelected = [...selectedDays, day];
    }
    setSelectedDays(orderSelectedDays(newSelected));
  }

  function toggleMealForDay(day: string, mealId: string) {
    const currentMeals = mealsByDay[day] || [];
    if (currentMeals.includes(mealId)) {
      const updatedMeals = currentMeals.filter((id) => id !== mealId);
      setMealsByDay({ ...mealsByDay, [day]: updatedMeals });
    } else {
      setMealsByDay({ ...mealsByDay, [day]: [...currentMeals, mealId] });
    }
  }

  function toggleExpand(day: string) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandedDays.includes(day)) {
      setExpandedDays(expandedDays.filter((d) => d !== day));
    } else {
      setExpandedDays([...expandedDays, day]);
    }
  }

  async function handleSave() {
    setLoading(true);
    try {
      const cleanedWeekPlan: Record<string, string[]> = {};
      for (const day of Object.keys(mealsByDay)) {
        cleanedWeekPlan[day] = mealsByDay[day].filter((id) => typeof id === "string");
      }

      await setDoc(
        doc(db, "cardapios", userId),
        {
          userId,
          weekPlan: cleanedWeekPlan,
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );
      alert("Cardápio salvo com sucesso!");
      setMealsByDay(cleanedWeekPlan);
      setSelectedDays(orderSelectedDays(Object.keys(cleanedWeekPlan)));
    } catch (e) {
      alert("Erro ao salvar cardápio.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#F97316" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate('PainelGestor')}>
                <AntDesign name="arrowleft" size={28} color="#222" />
              </TouchableOpacity>
             <Text style={styles.title}>Cardápio da Semana</Text>
            </View>

      <View style={styles.daysContainer}>
        {initialDias.map((day) => {
          const isSelected = selectedDays.includes(day);
          return (
            <TouchableOpacity
              key={day}
              style={[styles.dayButton, isSelected && styles.dayButtonSelected]}
              onPress={() => toggleDay(day)}
            >
              <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>{day}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView style={{ flex: 1, marginTop: 20, paddingHorizontal: 12 }}>
        {selectedDays.map((day) => {
          const isExpanded = expandedDays.includes(day);
          const selectedMeals = mealsByDay[day] || [];

          return (
            <View key={day} style={styles.card}>
              <TouchableOpacity onPress={() => toggleExpand(day)} style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{day}</Text>
                <AntDesign name={isExpanded ? "up" : "down"} size={20} color="#F97316" />
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.cardContent}>
                  {allMeals.map((meal) => {
                    const isMealSelected = selectedMeals.includes(meal.id);
                    return (
                      <TouchableOpacity
                        key={meal.id}
                        style={[
                          styles.mealButton,
                          isMealSelected && styles.mealButtonSelected,
                        ]}
                        onPress={() => toggleMealForDay(day, meal.id)}
                      >
                        <Text
                          style={[
                            styles.mealText,
                            isMealSelected && styles.mealTextSelected,
                          ]}
                        >
                          {meal.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Cardápio</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 10,
  },
  dayButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    minWidth: 90,
    maxWidth: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  dayButtonSelected: {
    backgroundColor: "#F97316",
    borderColor: "#F97316",
  },
  dayText: { color: "#444", fontWeight: "600" },
  dayTextSelected: { color: "#fff" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F97316",
  },
  cardContent: {
    marginTop: 12,
  },

  mealButton: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  mealButtonSelected: {
    backgroundColor: "#F97316",
    borderColor: "#F97316",
  },
  mealText: {
    fontWeight: "600",
    color: "#444",
  },
  mealTextSelected: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#F97316",
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3,
    margin: 16,
  },
  saveButtonText: {
    fontSize: 18,
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});
