import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons, Entypo, FontAwesome } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import type { IRootStackParamList } from "../../../hook/rootStack";
import { db } from "../../../config/firebase";
import { styles } from "../PainelGestor/styles/style";
import SidebarDrawer from "../../../components/Sidebar";
import KpiCards from "../PainelGestor/components/KpiCards";

type Props = {
  navigation: StackNavigationProp<IRootStackParamList>;
};

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

const PainelGestor: React.FC<Props> = ({ navigation }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [kpis, setKpis] = useState([
    { label: "L/P", value: "0", desc: "Média" },
    { label: "NPS", value: "0", desc: "Últimos feedbacks" },
    { label: "Clientes Ativos", value: "0", desc: "Últimos 7 dias" },
  ]);
  const [mediaPorDia, setMediaPorDia] = useState<number[]>([]);

  useEffect(() => {
    async function fetchFeedbacks() {
      const sevenDaysAgo = Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
      const q = query(collection(db, "feedbacks"), where("createdAt", ">=", sevenDaysAgo));
      const snapshot = await getDocs(q);

      const all = snapshot.docs.map(doc => doc.data());
      setFeedbacks(all);

      const ratings = all.map(f => f.rating).filter(r => typeof r === "number");
      const average = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length) : 0;

      const promoters = ratings.filter(r => r >= 9).length;
      const detractors = ratings.filter(r => r <= 6).length;
      const nps = ratings.length ? Math.round(((promoters - detractors) / ratings.length) * 100) : 0;

      const uniqueClients = new Set(all.map(f => f.mealId)).size;

      setKpis([
        { label: "L/P", value: average.toFixed(1), desc: "Média" },
        { label: "NPS", value: nps.toString(), desc: "Últimos feedbacks" },
        { label: "Clientes Ativos", value: uniqueClients.toString(), desc: "Últimos 7 dias" },
      ]);

      // Cálculo por dia da semana
      const notasPorDia: Record<string, number[]> = {};
      for (const dia of diasSemana) notasPorDia[dia] = [];

      all.forEach((fb) => {
        const date = fb.createdAt?.toDate?.();
        if (date) {
          const dia = diasSemana[date.getDay()];
          notasPorDia[dia].push(fb.rating);
        }
      });

      const medias = diasSemana.map((dia) => {
        const notas = notasPorDia[dia];
        if (notas.length === 0) return 0;
        return notas.reduce((a, b) => a + b, 0) / notas.length;
      });

      setMediaPorDia(medias);
    }

    fetchFeedbacks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Entypo name="menu" size={32} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      <SidebarDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <KpiCards data={kpis} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Últimas Avaliações</Text>
          <View style={styles.ratingsHeader}>
            <Text style={[styles.ratingsCol, { flex: 1 }]}>Nota</Text>
            <Text style={[styles.ratingsCol, { flex: 3 }]}>Comentário</Text>
          </View>
          {feedbacks.map((r, idx) => (
            <View key={idx} style={styles.ratingsRow}>
              <View style={[styles.ratingsColView, { flex: 1, flexDirection: "row" }]}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <FontAwesome
                    key={i}
                    name={i < r.rating ? "star" : "star-o"}
                    size={18}
                    color="#F97316"
                  />
                ))}
              </View>
              <Text style={[styles.ratingsCol, { flex: 3 }]}>{r.comment}</Text>
            </View>
          ))}
        </View>

        {/* Gráfico com dados reais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Evolução ao longo da semana</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end", height: 100 }}>
            {mediaPorDia.map((val, idx) => (
              <View
                key={idx}
                style={{
                  width: 30,
                  height: val * 15,
                  backgroundColor: "#F97316",
                  marginHorizontal: 6,
                  borderRadius: 6,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>{val.toFixed(1)}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            {diasSemana.map((lbl, idx) => (
              <Text key={idx} style={{ width: 30, textAlign: "center", color: "#888" }}>
                {lbl}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PainelGestor;
