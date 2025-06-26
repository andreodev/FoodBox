// components/FeedbackCard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Timestamp } from "firebase/firestore";

type Props = {
  productName?: string;
  comment?: string;
  createdAt?: Timestamp;
  rating?: number;
};

const FeedbackCard: React.FC<Props> = ({
  productName,
  comment,
  createdAt,
  rating = 0,
}) => {
  const renderStars = () => (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FontAwesome
          key={i}
          name={i < rating ? "star" : "star-o"}
          size={16}
          color="#F97316"
          style={{ marginRight: 2 }}
        />
      ))}
    </View>
  );

  const formatDate = (timestamp?: Timestamp): string => {
    if (!timestamp?.toDate) return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.productName}>{productName || "Produto"}</Text>
      {renderStars()}
      <Text style={styles.comment}>{comment || "Sem comentário"}</Text>
      <Text style={styles.date}>{formatDate(createdAt)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF3E0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  comment: {
    fontStyle: "italic",
    color: "#555",
    marginTop: 6,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
  },
});

export default FeedbackCard;
