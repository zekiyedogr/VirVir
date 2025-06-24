import React, {useState, useEffect} from "react";
import { SafeAreaView, StatusBar, FlatList } from "react-native";

import styles from "./Messages.styles"
import FloatingButton from "../../components/FloatingButton";
import ContentInputModal from "../../components/ContentInputModal";
import MessageCard from "../../components/MessageCard/MessageCard";
import parseContentData from "../../utils/parseContentData";
import { useSelector } from 'react-redux';

import database from '@react-native-firebase/database';

import MessageBox from "../../components/MessageBox";

const Messages = () => {
  const [contenModalVisible, setContenModalVisible] = useState(false);
  const [contentList, setContentList] = useState([]);
  const [warning, setWarning] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const userSession = useSelector(state => state.user);

  useEffect(() => {    
    const messageRef = database().ref('messages/');
    
    const onValueChange = messageRef.on('value', snapshot => {
      const contentData = snapshot.val();
      if (!contentData) return;
      const parsedData = parseContentData(contentData);
      setContentList(parsedData);
    });
    
    return () => messageRef.off('value', onValueChange);
  }, []);

  function handleInputToggle() {
    setContenModalVisible(!contenModalVisible);
  };

  async  function handleSendContent(content) {
    handleInputToggle();
    try {
      if(userSession) {
        const contentObject = {
          text: content,
          username: userSession.username,
          date: new Date().toISOString(),
        };

        await database().ref('messages/').push(contentObject);
      }
      else {
        setWarning('Kullanıcı verisi bulunamadı.');
        setModalVisible(true);
      }

    } catch (error) {
      setWarning('Mesaj gönderme sırasında hata oluştu!');
      setModalVisible(true);
    }
  }

  const closeModal = () => {
    setModalVisible(false);
    setWarning("");
  };

  const renderContent = ({item}) => <MessageCard message={item} username={userSession.username}/>
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <FlatList
          data={contentList}
          renderItem={renderContent}
      />
      <FloatingButton iconName='chat-plus-outline' onPress={handleInputToggle} />
      <ContentInputModal modalVisible={contenModalVisible} close={handleInputToggle} onSend={handleSendContent} />
      <MessageBox modalVisible={modalVisible} close={closeModal} header={warning}  theme="danger"/>
    </SafeAreaView>
)
}

export default Messages;