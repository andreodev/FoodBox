import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 240,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 10,
    elevation: 5,
    zIndex: 2,
  },
  drawerHeader: {
    marginBottom: 18,
    paddingLeft: 8,
  },
  drawerTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#F97316',
    letterSpacing: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 8,
    borderRadius: 6,
  },
  drawerItemText: {
    fontSize: 15,
    color: '#222',
  },
});