import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import Svg, { Path, G } from "react-native-svg";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import type { IRootStackParamList } from "../../../hook/rootStack";
import { db } from "../../../config/firebase";

type Props = {
  navigation: StackNavigationProp<IRootStackParamList>;
};

const days = [
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
];

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

const ValorNutricional: React.FC<Props> = ({ navigation }) => {
  const [menuData, setMenuData] = useState<{ [day: string]: any[] }>({});
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState("Segunda-Feira");
  const [currentMealIndex, setCurrentMealIndex] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState<{
    Proteína: string;
    Carboidrato: string;
    Gordura: string;
  }>({
    Proteína: "",
    Carboidrato: "",
    Gordura: "",
  });

  useEffect(() => {
    const fetchMeals = async () => {
      const snapshot = await getDocs(collection(db, "meals"));
      const data: { [day: string]: any[] } = {};
      snapshot.forEach((docSnap) => {
        const meal = docSnap.data();
        const dia = meal.dia || "Segunda-Feira";
        if (!data[dia]) data[dia] = [];
        data[dia].push({ ...meal, id: docSnap.id });
      });
      setMenuData(data);
      setLoading(false);
    };
    fetchMeals();
  }, []);

  if (loading)
    return (
      <Text style={{ marginTop: 100, textAlign: "center" }}>Carregando...</Text>
    );

  const mealsOfDay = menuData[currentDay] || [];
  const currentMeal = mealsOfDay[currentMealIndex];

  const parsedNutrients = currentMeal?.nutrientes
    ? Object.entries(currentMeal.nutrientes).map(([key, value]) => ({
        x: key,
        y: Number(value) || 0, // garante que y seja um number
      }))
    : [];

  const handleEditOpen = () => {
    setEditData({
      Proteína: currentMeal?.nutrientes?.Proteína?.toString() || "0",
      Carboidrato: currentMeal?.nutrientes?.Carboidrato?.toString() || "0",
      Gordura: currentMeal?.nutrientes?.Gordura?.toString() || "0",
    });
    setModalVisible(true);
  };

  const handleSave = async () => {
    const mealRef = doc(db, "meals", currentMeal.id);
    await updateDoc(mealRef, {
      nutrientes: {
        Proteína: Number(editData.Proteína),
        Carboidrato: Number(editData.Carboidrato),
        Gordura: Number(editData.Gordura),
      },
    });
    // atualiza local
    const updatedMeal = {
      ...currentMeal,
      nutrientes: {
        Proteína: Number(editData.Proteína),
        Carboidrato: Number(editData.Carboidrato),
        Gordura: Number(editData.Gordura),
      },
    };
    const updatedDayMeals = [...mealsOfDay];
    updatedDayMeals[currentMealIndex] = updatedMeal;
    setMenuData((prev) => ({ ...prev, [currentDay]: updatedDayMeals }));
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("PainelGestor")}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Valor nutricional de acordo com o dia da semana
          </Text>
          <Text style={styles.dayText}>{currentDay}</Text>
        </View>

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

        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentMealIndex === 0 && styles.navButtonDisabled,
            ]}
            onPress={() => setCurrentMealIndex((prev) => prev - 1)}
            disabled={currentMealIndex === 0}
          >
            <AntDesign
              name="left"
              size={24}
              color={currentMealIndex === 0 ? "#ccc" : "#000"}
            />
          </TouchableOpacity>

          <View style={styles.mealButton}>
            <Text style={styles.mealButtonText}>
              {currentMeal?.title || "Refeição"}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.navButton,
              currentMealIndex === mealsOfDay.length - 1 &&
                styles.navButtonDisabled,
            ]}
            onPress={() => setCurrentMealIndex((prev) => prev + 1)}
            disabled={currentMealIndex === mealsOfDay.length - 1}
          >
            <AntDesign
              name="right"
              size={24}
              color={
                currentMealIndex === mealsOfDay.length - 1 ? "#ccc" : "#000"
              }
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleEditOpen}
          style={{ marginTop: 30, alignSelf: "center" }}
        >
          <Text style={{ color: "blue", fontWeight: "bold" }}>
            Editar nutrientes
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Nutrientes</Text>

            {["Proteína", "Carboidrato", "Gordura"].map((key) => (
              <View key={key} style={{ marginBottom: 15 }}>
                <Text style={styles.label}>{key}</Text>
                <TextInput
                  keyboardType="numeric"
                  value={editData[key as keyof typeof editData]}
                  onChangeText={(text) =>
                    setEditData({ ...editData, [key]: text })
                  }
                  style={styles.input}
                />
              </View>
            ))}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: "red" }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <Text style={{ color: "green" }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  backButton: { position: "absolute", top: 50, left: 20, zIndex: 1 },
  scrollView: { flex: 1, padding: 20, paddingTop: 80 },
  titleContainer: { alignItems: "center", marginBottom: 30 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#666",
  },
  dayText: { fontSize: 24, fontWeight: "bold", color: "#FFA500", marginTop: 5 },
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
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  navButton: { padding: 10 },
  navButtonDisabled: { opacity: 0.5 },
  mealButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#000",
    marginHorizontal: 20,
  },
  mealButtonText: { fontSize: 18, fontWeight: "bold", color: "#FFA500" },
  modalContainer: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
});

export default ValorNutricional;
