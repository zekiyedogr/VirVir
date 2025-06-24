import { StyleSheet } from "react-native";

import colors from "../../styles/colors";

export default StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: colors.bgColorContainer,
        margin: 8,
        padding: 10,
        borderRadius: 10,
        shadowColor: colors.darkBlue,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5
    },

    inner_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    user: {
        color: colors.darkBlue,
        fontSize: 15,

    },
    date: {
        fontSize: 14,
        fontStyle: 'italic',
        color: 'dark'
    },
    text: {
        fontSize: 15,
        color: 'white',
        padding: 10,
        fontWeight: 'bold'
    },
    butonContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },
})