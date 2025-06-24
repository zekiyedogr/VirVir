import { StyleSheet } from "react-native";

import colors from "../../styles/colors";

export default StyleSheet.create({
    container: {
        borderRadius: 5,
        padding: 10,
        margin: 10,        
    },

    likeCount: {
        fontSize: 15,
        color: colors.darkBlue,
        marginRight: 10
    },

    innerContanier: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'        
    },

    icon: {
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.darkBlue,
    }
});