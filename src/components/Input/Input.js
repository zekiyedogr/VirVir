import React from "react";
import { View, TextInput } from "react-native";
import styles from './Input.styles';

const Input = ({placeholder,value, onType, secureText, keyboardType, autoCapitalize}) => {
    return (
        <View style = { styles.container }>
            <TextInput
                style = { styles.input }
                placeholder={placeholder}
                placeholderTextColor="#01139150"
                value={value}
                onChangeText={onType}
                secureTextEntry={secureText}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
            />
        </View>
    )
}

export default Input;