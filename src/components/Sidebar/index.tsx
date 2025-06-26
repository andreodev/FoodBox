// components/SidebarDrawer.tsx
import React, { useEffect, useRef } from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  Animated,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { IRootStackParamList } from '../../hook/rootStack';
import {styles} from './style/side';

type Props = {
  visible: boolean;
  onClose: () => void;
  navigation: StackNavigationProp<IRootStackParamList>;
};

const menuOptions: { label: string; icon: React.ComponentProps<typeof MaterialIcons>['name'] }[] = [
   { label: 'Visão geral', icon: 'dashboard' },
  { label: 'Avaliações', icon: 'star' },
  { label: 'Gráficos', icon: 'insert-chart' },
  { label: 'Cardápio do dia', icon: 'today' },
  { label: 'Cardápio semanal', icon: 'date-range' },
  { label: 'Valor Nutricional', icon: 'restaurant' },
  { label: 'Perfil', icon: 'person' },
  { label: 'Sair', icon: 'logout' },
];

const SCREEN_WIDTH = Dimensions.get('window').width;

const SidebarDrawer: React.FC<Props> = ({ visible, onClose, navigation }) => {
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -SCREEN_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent visible>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.drawerOverlay, { opacity: overlayAnim }]} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>PORTAL DO GESTOR</Text>
        </View>
        {menuOptions.map((option) => (
  <TouchableOpacity
  key={option.label}
  onPress={() => {
    onClose();
    switch (option.label) {
      case 'PainelGestor':
        navigation.navigate('PainelGestor');
        break;
      case 'Avaliações':
        navigation.navigate('FeedbackGestor');
        break;
      case 'Cardápio do dia':
        navigation.navigate('EditarCardapioDia');
        break;
      case 'Cardápio semanal':
        navigation.navigate('CardapioDaSemana');
        break;
        case 'Gráficos': 
        navigation.navigate('GraficoAvaliacoes');
        break;
        case 'Valor Nutricional':
        navigation.navigate('ValorNutricional');
        break;
        case 'Sair': 
        navigation.navigate('Welcome');
      // outros casos se precisar
    }
  }}
  style={styles.drawerItem}
>
  <MaterialIcons
    name={option.icon}
    size={22}
    color="#F97316"
    style={{ marginRight: 12 }}
  />
  <Text style={styles.drawerItemText}>{option.label}</Text>
</TouchableOpacity>
))}

      </Animated.View>
    </Modal>
  );
};



export default SidebarDrawer;
