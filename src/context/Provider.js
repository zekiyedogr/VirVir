import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux"; 
import { configureStore } from '@reduxjs/toolkit';

import reducers from "./reducers";
import userStorageMiddleware from './userStorageMiddleware';

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        AsyncStorage.getItem('@USER').then(userSession => {
            userSession && setUser(JSON.parse(userSession));
        });
    }, []);

    const store = configureStore({ 
        reducer: reducers, 
        preloadedState: { user }, 
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userStorageMiddleware)
    });
    
    return <Provider store={store}>{ children }</Provider>
}

export default UserProvider;
