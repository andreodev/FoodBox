import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


export default function DiaDaSemana() {
  return (
    <View style={styles.dayContainer}>
      <View style={styles.dayHeader}>
          <TextInput
            style={styles.inputNome}
          />
          <TouchableOpacity  style={{ flex: 1 }}>
            <Text style={styles.dayTitle}>asdasds</Text>
          </TouchableOpacity>

        <View style={styles.iconsRight}>
          <TouchableOpacity
            style={{ marginRight: 12 }}
          >
            <MaterialIcons name="edit" size={22} color="#F97316" />
          </TouchableOpacity>

          <TouchableOpacity >
            <MaterialIcons name="delete" size={22} color="red" />
          </TouchableOpacity>
        </View>
      </View>

        <View style={styles.mealList}>
            <View  style={styles.mealItem}>
              <Text style={styles.mealTitle}>asdasd</Text>
              <TextInput
                style={styles.mealInput}
                multiline
              />
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  dayHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F97316",
  },
  inputNome: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#F97316",
    paddingVertical: 4,
  },
  iconsRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealList: {
    marginTop: 12,
  },
  mealItem: {
    marginBottom: 8,
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  mealInput: {
    fontSize: 13,
    color: "#555",
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 6,
    minHeight: 40,
  },
});
