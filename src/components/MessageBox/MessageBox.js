import React from "react";
import { TouchableOpacity, Text, View, Modal, Animated } from "react-native";
import styles from './MessageBox.styles';

const MessageBox = ({ modalVisible, close, header, theme = "message" }) => {
  const [slideAnim] = React.useState(new Animated.Value(-300));
  
  React.useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={close}
    >
      <View style={styles[theme].centered_view}>
        <Animated.View 
          style={[
            styles[theme].modal_view, 
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          <Text style={styles[theme].header}>{header}</Text>
          <TouchableOpacity onPress={close}>
            <Text style={styles[theme].modal_button}>Tamam</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default MessageBox;