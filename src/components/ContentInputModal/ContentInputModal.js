import React, {useState} from "react";
import { View, TextInput} from "react-native";
import styles from './ContentInputModal.styles';
import Modal from 'react-native-modal'

import Button from "../Button";
import { set } from "@react-native-firebase/database";

const ContentInputModal = ({ modalVisible, close, onSend }) => {
  const [text, setText] = useState(null);

  function handleSend() {
    if(!text) {
      return;
    }

    onSend(text);
    setText(null);
  }
  
  return (
    <Modal
      animationType = "slide"
      transparent = {true}
      visible = { modalVisible }
      onBackdropPress={close}
      onSwipeComplete={close}
      onBackButtonPress={close}
      style = { styles.modal }
    >
    <View style = { styles.container }>
        <View style = { styles.input_container }>
          <TextInput placeholder="Vır vır mı edeceksin?" onChangeText={setText} multiline/>
        </View>          
        <Button text={"Gönder"} onPress={handleSend} />
      </View>     
    </Modal>
  );
}

export default ContentInputModal;