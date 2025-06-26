import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import Svg, { G, Path } from "react-native-svg";
import { collection, getDocs } from "firebase/firestore";
import type { IRootStackParamList } from "../../../hook/rootStack";
import { db } from "../../../config/firebase";

type Props = {
  navigation: StackNavigationProp<IRootStackParamList>;
};

const PieChart = ({
  data,
  size = 200,
}: {
  data: { x: string; y: number }[];
  size?: number;
}) => {
  const colors = {
    Gordura: "#0000FF",
    "Fibra alimentar": "#FFD700",
    "Valor energético": "#FFA500",
    Proteína: "#FF0000",
    Carboidrato: "#00FF00",
  };

  const total = data.reduce((sum, item) => sum + item.y, 0);
  let startAngle = 0;

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <G transform="translate(100, 100)">
        {data.map((item, index) => {
          const angle = (item.y / total) * 360;
          const endAngle = startAngle + angle;
          const startRad = ((startAngle - 90) * Math.PI) / 180;
          const endRad = ((endAngle - 90) * Math.PI) / 180;
          const x1 = 80 * Math.cos(startRad);
          const y1 = 80 * Math.sin(startRad);
          const x2 = 80 * Math.cos(endRad);
          const y2 = 80 * Math.sin(endRad);
          const largeArcFlag = angle > 180 ? 1 : 0;
          const path = `M 0 0 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

          startAngle = endAngle;
          return (
            <G key={index}>
              <Path
                d={path}
                fill={colors[item.x as keyof typeof colors] || "#ccc"}
                stroke="white"
                strokeWidth="2"
              />
            </G>
          );
        })}
      </G>
    </Svg>
  );
};

const ValorNutricionalUsuario: React.FC<Props> = ({ navigation }) => {
  const [meals, setMeals] = useState<any[]>([]);
  const [selectedMealIndex, setSelectedMealIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "meals"));
      const fetchedMeals = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMeals(fetchedMeals);
      setLoading(false);
    };
    fetchData();
  }, []);

  const selectedMeal = meals[selectedMealIndex];
  const parsedNutrients = selectedMeal?.nutrientes
    ? Object.entries(selectedMeal.nutrientes).map(([key, value]) => ({
        x: key,
        y: Number(value) || 0,
      }))
    : [];

  if (loading)
    return (
      <Text style={{ marginTop: 100, textAlign: "center" }}>Carregando...</Text>
    );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Valor Nutricional da Refeição</Text>

        {/* Seleção de refeições */}
        <FlatList
          horizontal
          data={meals}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.mealList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.mealSelector,
                index === selectedMealIndex && styles.mealSelectorSelected,
              ]}
              onPress={() => setSelectedMealIndex(index)}
            >
              <Text
                style={[
                  styles.mealSelectorText,
                  index === selectedMealIndex && styles.mealSelectorTextSelected,
                ]}
              >
                {item.title || `Refeição ${index + 1}`}
              </Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.chartContainer}>
          <PieChart data={parsedNutrients} />
        </View>

        <View style={styles.legendContainer}>
          {parsedNutrients.map((nutrient, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[
                  styles.legendColor,
                  {
                    backgroundColor:
                      nutrient.x === "Gordura"
                        ? "#0000FF"
                        : nutrient.x === "Fibra alimentar"
                        ? "#FFD700"
                        : nutrient.x === "Valor energético"
                        ? "#FFA500"
                        : nutrient.x === "Carboidrato"
                        ? "#00FF00"
                        : "#FF0000",
                  },
                ]}
              />
              <Text style={styles.legendText}>
                {nutrient.x}: {nutrient.y}g
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  backButton: { position: "absolute", top: 50, left: 20, zIndex: 1 },
  scrollView: { flex: 1, padding: 20, paddingTop: 80 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#666",
  },
  mealList: {
    marginBottom: 20,
    paddingVertical: 10,
  },
  mealSelector: {
    backgroundColor: "#eee",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  mealSelectorSelected: {
    backgroundColor: "#FFA500",
  },
  mealSelectorText: {
    fontSize: 16,
    color: "#444",
  },
  mealSelectorTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  chartContainer: { alignItems: "center", marginBottom: 30 },
  legendContainer: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  legendItem: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  legendColor: { width: 20, height: 20, borderRadius: 10, marginRight: 10 },
  legendText: { fontSize: 16, color: "#333" },
});

export default ValorNutricionalUsuario;
