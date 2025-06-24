import { StyleSheet } from "react-native";

import colors from "../../styles/colors";

export default StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: colors.bgColorContainer,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },

    input: {
        color: colors.darkBlue,
        flex: 1,
    },
});