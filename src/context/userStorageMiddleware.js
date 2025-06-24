import AsyncStorage from '@react-native-async-storage/async-storage';

const userStorageMiddleware = store => next => async action => {
  if (action.type === 'SET_USER') {
    try {
      await AsyncStorage.setItem('@USER', JSON.stringify(action.payload));
    } catch (error) {
      console.error('AsyncStorage middleware error:', error);
    }
  }

  if (action.type === 'REMOVE_USER') {
    try {
      await AsyncStorage.removeItem('@USER');
    } catch (error) {
      console.error('AsyncStorage remove hatası:', error);
    }
  }

  return next(action);
};

export default userStorageMiddleware;
