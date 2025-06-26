import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import type { IRootStackParamList } from "../../../hook/rootStack";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

const days = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
];

type Props = {
  navigation: StackNavigationProp<IRootStackParamList>;
};

type Refeicao = {
  id: string;
  title: string;
  value: string;
};

const Tela20: React.FC<Props> = ({ navigation }) => {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [cardapio, setCardapio] = useState<Record<string, Refeicao[]>>({});
  const [loadingDay, setLoadingDay] = useState<string | null>(null);
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  const userId = "anonimo";

  const toggleDay = async (day: string) => {
    if (expandedDay === day) {
      setExpandedMeal(null);
      setExpandedDay(null);
      return;
    }

    setExpandedDay(day);
    setExpandedMeal(null);

    if (!cardapio[day]) {
      setLoadingDay(day);
      try {
        const docRef = doc(db, "cardapios", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const mealIds = Array.isArray(data.weekPlan?.[day])
            ? data.weekPlan[day].filter((id: any) => typeof id === "string")
            : [];

          const meals: Refeicao[] = [];

          for (const mealId of mealIds) {
            const mealDoc = await getDoc(doc(db, "meals", mealId));
            if (mealDoc.exists()) {
              const mealData = mealDoc.data();
              meals.push({
                id: mealId,
                title: mealData?.title || "Sem título",
                value: mealData?.value || "",
              });
            }
          }

          setCardapio((prev) => ({ ...prev, [day]: meals }));
        }
      } catch (err) {
        console.error("Erro ao carregar cardápio do dia:", err);
      } finally {
        setLoadingDay(null);
      }
    }
  };

  const toggleMeal = (mealId: string) => {
    setExpandedMeal(expandedMeal === mealId ? null : mealId);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("MenuUsuario")}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Cardápio da Semana</Text>

        {days.map((day) => (
          <View key={day} style={styles.dayContainer}>
            <TouchableOpacity
              style={[styles.dayButton, expandedDay === day && styles.expanded]}
              onPress={() => toggleDay(day)}
            >
              <Text style={styles.dayText}>{day}</Text>
              <MaterialIcons
                name={
                  expandedDay === day
                    ? "keyboard-arrow-up"
                    : "keyboard-arrow-down"
                }
                size={24}
                color="white"
              />
            </TouchableOpacity>

            {expandedDay === day && (
              <View style={styles.menuContainer}>
                {loadingDay === day ? (
                  <ActivityIndicator color="#FFA500" />
                ) : cardapio[day] && cardapio[day].length > 0 ? (
                  cardapio[day].map((meal) => (
                    <View key={meal.id} style={styles.mealItem}>
                      <TouchableOpacity
                        onPress={() => toggleMeal(meal.id)}
                        style={styles.mealHeader}
                      >
                        <MaterialIcons
                          name="restaurant"
                          size={20}
                          color="#FFA500"
                        />
                        <Text style={styles.mealTitle}>{meal.title}</Text>
                        <MaterialIcons
                          name={
                            expandedMeal === meal.id
                              ? "expand-less"
                              : "expand-more"
                          }
                          size={24}
                          color="#FFA500"
                        />
                      </TouchableOpacity>

                      {expandedMeal === meal.id && (
                        <View style={styles.mealContent}>
                          <Text style={styles.mealText}>{meal.value}</Text>
                        </View>
                      )}
                    </View>
                  ))
                ) : (
                  <Text style={{ color: "#999", fontStyle: "italic" }}>
                    Nenhuma refeição cadastrada
                  </Text>
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  dayContainer: {
    marginBottom: 15,
  },
  dayButton: {
    backgroundColor: "#FFA500",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  expanded: {
    backgroundColor: "#FF8C00",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  menuContainer: {
    backgroundColor: "#FFF3E0",
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  mealItem: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
  },
  mealHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginLeft: 8,
  },
  mealContent: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  mealText: {
    fontSize: 14,
    color: "#555",
  },
});

export default Tela20;
