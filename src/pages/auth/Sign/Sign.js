import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import styles from './Sign.styles';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import MessageBox from "../../../components/MessageBox";
import authErrorMessageParser from "../../../utils/authErrorMessageParser";
import { useDispatch } from 'react-redux';

const initialFormValues = {
  usermail: '',
  password: '',
  repassword: ''
}

const Sign = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("message");
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  
  function goToLogin () {
    navigation.goBack();
  }  

  async function handleFormSign (formValues) {
    if(formValues.password != formValues.repassword) {
      setMessageType("danger");
      setMessage("Şifreler uyuşmuyor");
      setModalVisible(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const nameSnapshot = await database()
        .ref('users')
        .orderByChild('username')
        .equalTo(formValues.username)
        .once('value');

      if (nameSnapshot.exists()) {
        setMessageType("danger");
        setMessage("Bu kullanıcı adı zaten alınmış");
        setLoading(false);
        setModalVisible(true);
        return;
      }

      const mailSnapshot = await database()
        .ref('users')
        .orderByChild('usermail')
        .equalTo(formValues.usermail)
        .once('value');

      if (mailSnapshot.exists()) {
        setMessageType("danger");
        setMessage("Bu mail adresi zaten kayıtlı");
        setLoading(false);
        setModalVisible(true);
        return;
      }

      const userObject = {
        name: formValues.name,
        surname: formValues.surname,
        username: formValues.username,
        usermail: formValues.usermail,
      }

      const authResponse = await auth().createUserWithEmailAndPassword(formValues.usermail, formValues.password);
      
      await database().ref('users/' + authResponse.user.uid + '/').set(userObject);
      
      dispatch({ type: 'SET_USER', payload: userObject });

      setLoading(false);
      
      setMessageType("message");
      setMessage("Kullanıcı oluşturuldu");
      setModalVisible(true);
      setLoading(false);
    }
    
    catch (error) {      
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
      <Formik initialValues={initialFormValues} onSubmit={handleFormSign}>
        {({values, handleChange, handleSubmit }) => (
        <>
          <Input 
            placeholder={'Adınızı girin'}
            value={values.name}
            onType={handleChange('name')}
          />
          <Input 
            placeholder={'Soyadınızı girin'}
            value={values.surname}
            onType={handleChange('surname')}
          />
          <Input 
            placeholder={'Kullanıcı adınızı girin'}
            value={values.username}
            onType={handleChange('username')}
          />
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
          <Input
            placeholder={'Şifrenizi tekrar girin'} secureText={true}            
            value={values.repassword}
            onType={handleChange('repassword')}
          />
          <Button text={'Kayıt Ol'} onPress={handleSubmit} loading={loading} />
        </>
        )}
        
      </Formik>
      <Button text={'Geri Dön'} onPress={goToLogin} theme={"secondary"} />
      </View>
      <MessageBox modalVisible={modalVisible} close={closeModal} header={message}  theme={messageType}/>
    </View>
  );
};

export default Sign;

