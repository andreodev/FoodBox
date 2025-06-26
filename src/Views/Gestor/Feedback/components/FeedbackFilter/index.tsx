import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

interface Props {
  selected: string;
  options: string[];
  onSelect: (val: string) => void;
}

const FeedbackFilter: React.FC<Props> = ({ selected, options, onSelect }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContainer}
    >
      {options.map((opt) => (
        <TouchableOpacity
          key={opt}
          onPress={() => onSelect(opt)}
          style={[styles.filterButton, selected === opt && styles.filterButtonSelected]}
        >
          <Text
            style={[styles.filterButtonText, selected === opt && styles.filterButtonTextSelected]}
          >
            {opt}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: "#FFF3E0",
    flexDirection: "row",
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F97316",
    marginRight: 8,
  },
  filterButtonSelected: {
    backgroundColor: "#F97316",
  },
  filterButtonText: {
    color: "#F97316",
    fontWeight: "600",
  },
  filterButtonTextSelected: {
    color: "#fff",
  },
});

export default FeedbackFilter;
