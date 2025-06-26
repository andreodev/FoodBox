import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Tela1: undefined;
  Welcome: undefined;
};

type Screen1NavigationProp = StackNavigationProp<RootStackParamList, 'Tela1'>;

type Props = {
  navigation: Screen1NavigationProp;
};

const Tela1: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Welcome'); 
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);  

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 200,
    width: 170,
    resizeMode: 'contain', 
  },
});

export default Tela1;
