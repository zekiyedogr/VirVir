import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import styles from './Login.styles';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import MessageBox from "../../../components/MessageBox";
import authErrorMessageParser from "../../../utils/authErrorMessageParser";
import { useDispatch } from 'react-redux';
import database from '@react-native-firebase/database';

const initialFormValues = {
  usermail: '',
  password: ''
}

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("message");
  const [modalVisible, setModalVisible] = useState(false);
  
  const dispatch = useDispatch();

  function goToSign () {
    navigation.navigate('SignPage');
  }

  async function handleFormLogin(formValues) {    
    try {
      setLoading(true);
  
      const authResponse = await auth().signInWithEmailAndPassword(formValues.usermail, formValues.password);
  
      const userId = authResponse.user.uid;
      const userSnapshot = await database().ref('users/' + userId).once('value');
      const userObject = userSnapshot.val();
  
      if (userObject) {
        dispatch({ type: 'SET_USER', payload: userObject });
      } else {
        setMessageType("danger");
        setMessage("Kullanıcı bilgileri alınamadı.");
        setModalVisible(true);
      }
  
      setMessageType("message");
      setMessage("Giriş Yaptı");
      setModalVisible(true);
      setLoading(false);
      navigation.navigate('MessagesPage');
      
    } catch (error) {      
      console.log(error);
      setMessageType("danger");
      setMessage(authErrorMessageParser(error.code));
      setModalVisible(true);
      setLoading(false);
    }
  }
  

  const closeModal = () => {
    setModalVisible(false);
    setMessage("");
    setMessageType("message");
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Vır</Text>
        <Text style={styles.header}>Vır</Text>
      </View>
      <View style={styles.formContainer}>
      <Formik initialValues={initialFormValues} onSubmit={handleFormLogin} >
        {({values, handleChange, handleSubmit }) => (
        <>
          <Input 
            placeholder={'E-posta adresinizi girin'}
            value={values.usermail}
            onType={handleChange('usermail')}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
          />
          <Input
            placeholder={'Şifrenizi girin'} secureText={true}            
            value={values.password}
            onType={handleChange('password')}
          />
          <Button text={'Giriş Yap'} onPress={handleSubmit} loading={loading} />
        </>
        )}
        
      </Formik>
      
      
      <Button text={'Kayıt Ol'} onPress={goToSign} theme={"secondary"} />
      </View>
      <MessageBox modalVisible={modalVisible} close={closeModal} header={message}  theme={messageType}/>
    </View>
  );
};

export default Login;

