import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 32,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 16,
  },
  profileBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 24,
    borderWidth: 1.5,
    borderColor: '#EEE',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      },
    }),
  },
  profileBoxActive: {
    borderColor: '#F97316',
    backgroundColor: '#FFF7ED',
    ...Platform.select({
      android: {
        elevation: 4,
        shadowColor: '#F97316',
      },
      web: {
        boxShadow: '0 4px 6px rgba(249, 115, 22, 0.5)',
      },
    }),
  },
  profileText: {
    marginTop: 8,
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
  },
  profileTextActive: {
    color: '#F97316',
  },
  continueButton: {
    backgroundColor: '#F97316',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginHorizontal: 4,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
