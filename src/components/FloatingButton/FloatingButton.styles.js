import { StyleSheet } from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export default StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 35,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkBlue,
    },
    icon: {
        fontSize: 30,
        color: 'white',
        fontFamily: fonts.mainFont,
    }
});