import React from 'react';
import { View, Image } from 'react-native';
import styles from './Welcome.styles';

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/Logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default Welcome;
