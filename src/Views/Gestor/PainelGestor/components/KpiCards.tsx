import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Kpi = {
  label: string;
  value: string;
  desc: string;
};

type Props = {
  data: Kpi[];
};

const KpiCards: React.FC<Props> = ({ data }) => {
  return (
    <View style={styles.kpiRow}>
      {data.map((kpi) => (
        <View key={kpi.label} style={styles.kpiBox}>
          <Text style={styles.kpiValue}>{kpi.value}</Text>
          <Text style={styles.kpiLabel}>{kpi.label}</Text>
          <Text style={styles.kpiDesc}>{kpi.desc}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  kpiBox: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    elevation: 1,
  },
  kpiValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F97316',
  },
  kpiLabel: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  kpiDesc: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});

export default KpiCards;
