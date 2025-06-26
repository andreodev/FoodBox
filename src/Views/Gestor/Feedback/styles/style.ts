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
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  noFeedbackText: { fontSize: 16, color: "#666" },
  feedbackCard: {
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

  kpiBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  kpiItem: {
    alignItems: "center",
    flex: 1,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F97316",
  },
  kpiLabel: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
});
