import React, {useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import colors from "./styles/colors";
import Login from "./pages/auth/Login";
import Sign from "./pages/auth/Sign";
import Messages from "./pages/Messages";
import Welcome from "./pages/Welcome";

const Stack = createStackNavigator();

export default () => {
  const [userSession, setUserSession] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
    });
  }, []);

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      dispatch({ type: 'REMOVE_USER' });
    } catch (error) {
      console.error("Çıkış yaparken hata oluştu: ", error);
    }
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="SignPage" component={Sign} />        
      </Stack.Navigator>
      
    )
  };

  const WelcomeStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomePage" component={Welcome} />       
      </Stack.Navigator>      
    )
  };

  const MessagesStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MessagesPage"
          component={Messages}
          options={{
            title: 'Vır Vırlar',
            headerTintColor: colors.darkBlue,
            headerTitleAlign: 'center',
            headerRight: () =>
              <Icon 
                name='logout' 
                size={30}
                color={colors.darkBlue}
                onPress={handleSignOut} />
          }}
        />
      </Stack.Navigator>      
    )
  };

  return(
    <NavigationContainer>
        { userSession === null ? (
          Welcome()
        ) : !userSession ?  (
          AuthStack()
        ) : (
          MessagesStack()
        )}
    </NavigationContainer>
  )
};
