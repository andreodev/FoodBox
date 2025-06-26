import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Svg, { G, Path, Circle, Text as SvgText, Line } from "react-native-svg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { StackNavigationProp } from "@react-navigation/stack";
import type { IRootStackParamList } from "../../../hook/rootStack";

type Props = {
  navigation: StackNavigationProp<IRootStackParamList>;
};

const GraficoAvaliacoes: React.FC<Props> = ({ navigation }) => {
  const [ratingsCount, setRatingsCount] = useState<number[]>([0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const snapshot = await getDocs(collection(db, "feedbacks"));
      const counts = [0, 0, 0, 0, 0];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const rating = data.rating;
        if (rating >= 1 && rating <= 5) {
          counts[rating - 1]++;
        }
      });

      setRatingsCount(counts);
      setLoading(false);
    };

    fetchFeedbacks();
  }, []);

  const maxCount = Math.max(...ratingsCount, 1); // evitar divisão por zero
  const svgWidth = 300;
  const svgHeight = 200;
  const padding = 40; // espaço para eixos e legendas

  // Calcula pontos (x, y) do gráfico
  const points = ratingsCount.map((count, i) => {
    const x = padding + (i * (svgWidth - 2 * padding)) / 4; // 5 pontos no eixo X
    const y = svgHeight - padding - (count / maxCount) * (svgHeight - 2 * padding);
    return { x, y, count };
  });

  // Cria string para o path da linha
  const linePath = points
    .map((point, i) => (i === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`))
    .join(" ");

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Desempenho das Avaliações</Text>

        {loading ? (
          <Text style={{ marginTop: 50 }}>Carregando...</Text>
        ) : (
          <Svg height={svgHeight} width={svgWidth}>
            <G>
              {/* Eixo X */}
              <Line
                x1={padding}
                y1={svgHeight - padding}
                x2={svgWidth - padding}
                y2={svgHeight - padding}
                stroke="#333"
                strokeWidth="2"
              />
              {/* Eixo Y */}
              <Line
                x1={padding}
                y1={padding}
                x2={padding}
                y2={svgHeight - padding}
                stroke="#333"
                strokeWidth="2"
              />

              {/* Labels eixo X */}
              {points.map((point, i) => (
                <SvgText
                  key={`xlabel-${i}`}
                  x={point.x}
                  y={svgHeight - padding + 20}
                  fontSize="14"
                  fill="#666"
                  textAnchor="middle"
                >
                  {i + 1}
                </SvgText>
              ))}

              {/* Labels eixo Y (5 divisões) */}
              {[0, 0.25, 0.5, 0.75, 1].map((frac, i) => {
                const y = svgHeight - padding - frac * (svgHeight - 2 * padding);
                const value = Math.round(frac * maxCount);
                return (
                  <G key={`ylabel-${i}`}>
                    <SvgText
                      x={padding - 10}
                      y={y + 5}
                      fontSize="12"
                      fill="#666"
                      textAnchor="end"
                    >
                      {value}
                    </SvgText>
                    {/* Linhas horizontais de grade */}
                    <Line
                      x1={padding}
                      y1={y}
                      x2={svgWidth - padding}
                      y2={y}
                      stroke="#ccc"
                      strokeWidth="1"
                    />
                  </G>
                );
              })}

              {/* Linha do gráfico */}
              <Path d={linePath} fill="none" stroke="#33CC66" strokeWidth="3" />

              {/* Pontos */}
              {points.map((point, i) => (
                <G key={`point-${i}`}>
                  <Circle cx={point.x} cy={point.y} r={6} fill="#33CC66" />
                  <SvgText
                    x={point.x}
                    y={point.y - 10}
                    fontSize="12"
                    fill="#333"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {point.count}
                  </SvgText>
                </G>
              ))}
            </G>
          </Svg>
        )}

        <View style={styles.legend}>
          {["1", "2", "3", "4", "5"].map((label, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: "#33CC66" }]} />
              <Text style={styles.legendText}>Nota {label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { alignItems: "center", paddingTop: 80, paddingBottom: 40 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#666",
    textAlign: "center",
  },
  backButton: { position: "absolute", top: 50, left: 20, zIndex: 1 },
  legend: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    width: "80%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 16,
    color: "#333",
  },
});

export default GraficoAvaliacoes;
