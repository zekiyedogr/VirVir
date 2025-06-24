import React from "react";
import { TouchableOpacity,Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./FloatingButton.styles";

const FloatingButton = ({ iconName, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.icon} >+</Text>
        </TouchableOpacity>
    )
}

export default FloatingButton