import { StyleSheet } from "react-native";

import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        justifyContent: 'flex-end',
    },

    headerContainer: {
        marginHorizontal: 15,
    },

    header: {
        color: colors.darkBlue,
        fontSize: 120,
        fontFamily: fonts.mainFont,
    },

    formContainer: {
    }

});