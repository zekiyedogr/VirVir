import React from "react";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import styles from './Button.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Button = ({ text, onPress, theme = "primary", loading, icon }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles[theme].container} disabled={loading}>            
            {loading ? (
                <ActivityIndicator color={"white"} />
            ) : (
                <View style={styles[theme].innerContanier}>
                    <Text style={styles[theme].text}>{text}</Text>
                    { icon ? (
                        <Icon style={styles[theme].icon} name={icon} />
                    ) : null
                }
                    
                </View>
            )}
        </TouchableOpacity>
    );
}

export default Button;