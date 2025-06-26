// components/FeedbackKpiBox.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  media: string;
  total: number;
  periodo: string;
  options: string[];
  onSelectPeriod: (period: string) => void;
};

const FeedbackKpiBox: React.FC<Props> = ({
  media,
  total,
  periodo,
  options,
  onSelectPeriod,
}) => {
  return (
    <View style={styles.box}>
      <View style={styles.row}>
        <View style={styles.kpi}>
          <Text style={styles.kpiValue}>{media}</Text>
          <Text style={styles.kpiLabel}>Média geral</Text>
        </View>
        <View style={styles.kpi}>
          <Text style={styles.kpiValue}>{total}</Text>
          <Text style={styles.kpiLabel}>Avaliações</Text>
        </View>
        <View style={styles.kpi}>
          <Text style={styles.kpiDropdownLabel}>Período</Text>
          <View style={styles.optionsRow}>
            {options.map((op) => (
              <TouchableOpacity
                key={op}
                onPress={() => onSelectPeriod(op)}
                style={[
                  styles.optionBtn,
                  op === periodo && styles.optionBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    op === periodo && styles.optionTextActive,
                  ]}
                >
                  {op}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    marginTop: 46,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  kpi: {
    flex: 1,
    alignItems: "center",
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F97316",
  },
  kpiLabel: {
    color: "#666",
    fontSize: 14,
  },
  kpiDropdownLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#555",
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 4,
  },
  optionBtn: {
    borderColor: "#F97316",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 2,
  },
  optionBtnActive: {
    backgroundColor: "#F97316",
  },
  optionText: {
    color: "#F97316",
    fontSize: 13,
  },
  optionTextActive: {
    color: "#fff",
  },
});

export default FeedbackKpiBox;
