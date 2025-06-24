import { StyleSheet } from "react-native";

import colors from "../../styles/colors";

const base_style = StyleSheet.create({
    container: {
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },

    text: {
        fontWeight: 'bold',
        fontSize: 15
    },

    innerContanier: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'        
    },

    icon: {
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default {
    primary: StyleSheet.create({
        ... base_style,
        container: {
            ... base_style.container,
            backgroundColor: colors.darkBlue,
        },
    
        text: {
            ... base_style.text,
            color: 'white',
        },
    
        icon: {
            ... base_style.icon,
            color: 'white',
        },
    }),

    secondary: StyleSheet.create({
        ... base_style,
        container: {
            ... base_style.container,
            backgroundColor: colors.bgColor,
            borderWidth: 1,
            borderColor: colors.darkBlue,
        },
    
        text: {
            ... base_style.text,
            color: colors.darkBlue,
        },
    
        icon: {
            ... base_style.icon,
            color: colors.darkBlue,
        },
    }),

    iconstyle: StyleSheet.create({
        ... base_style,
    
        text: {
            ... base_style.text,
            color: colors.darkBlue,
        },
    
        icon: {
            ... base_style.icon,
            color: colors.darkBlue,
        },
    })
}