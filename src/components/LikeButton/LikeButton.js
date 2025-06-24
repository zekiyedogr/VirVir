import React from "react";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import styles from './LikeButton.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const LikeButton = ({ likeCount, onPress, loading, icon }) => {
    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator color={"white"} />
            ) : (
                <View style={styles.innerContanier}>
                    <Text style={styles.likeCount}>{likeCount}</Text>                    
                    <TouchableOpacity onPress={onPress} disabled={loading}>
                        <Icon style={styles.icon} name={icon} />
                    </TouchableOpacity>               
                </View>
            )}
        </View>
    );
}

export default LikeButton;