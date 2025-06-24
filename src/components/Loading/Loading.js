import React from 'react';
import { View } from 'react-native';
import LottieView from "lottie-react-native";

function Loading() {
  return (
    <View style = {{ flex: 1, backgroundColor: '#fffcef' }}>
      <LottieView style = {{ flex: 1 }} source={require("../../Assets/Lottie/loading.json")} autoPlay/>
    </View>
  )
}

export default Loading;