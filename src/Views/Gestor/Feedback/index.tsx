import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import {
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { IRootStackParamList } from "../../../hook/rootStack";
import FeedbackKpiBox from "./FeedbackKPIBox";
import FeedbackCard from "./components/FeedbackCard";
import { styles } from "./styles/style";
import { AntDesign } from '@expo/vector-icons';

interface Feedback {
  id: string;
  comment?: string;
  createdAt?: Timestamp;
  productName?: string;
  rating?: number;
}

interface Props {
  navigation: StackNavigationProp<IRootStackParamList>;
}

const FeedbackGestor: React.FC<Props> = ({navigation}) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRange, setSelectedRange] = useState<string>("7 dias");

  const periodOptions = ["Hoje", "7 dias"];

  useEffect(() => {
    async function fetchFeedbacks() {
      setLoading(true);
      try {
        const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data: Feedback[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Feedback));
        setFeedbacks(data);
      } catch (e) {
        console.error("Erro ao carregar avaliações:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchFeedbacks();
  }, []);

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const filtered = feedbacks.filter((fb) => {
    if (!fb.createdAt?.toDate) return false;
    const date = fb.createdAt.toDate();
    return selectedRange === "Hoje" ? date >= todayStart : date >= sevenDaysAgo;
  });

  const media = filtered.length
    ? (
        filtered.reduce((sum, fb) => sum + (fb.rating || 0), 0) / filtered.length
      ).toFixed(1)
    : "0.0";

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PainelGestor')}>
          <AntDesign name="arrowleft" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.title}>Avaliações</Text>
      </View>
      <FeedbackKpiBox
        media={media}
        total={filtered.length}
        periodo={selectedRange}
        options={periodOptions}
        onSelectPeriod={setSelectedRange}
      />
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#F97316" />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => <FeedbackCard {...item} />}
        />
      )}
    </View>
  );
};

export default FeedbackGestor;
