import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    elevation: 2,
    zIndex: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 18,
    color: '#222',
  },
  content: {
    padding: 20,
  },
  addButton: {
    backgroundColor: '#F97316',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 16,
    elevation: 3,
  },
   dayContainer: {
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F97316",
  },
  mealList: {
    marginTop: 12,
  },
  mealItem: {
    marginBottom: 8,
    paddingLeft: 8,
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  mealValue: {
    fontSize: 13,
    color: "#555",
    marginLeft: 8,
  },
});