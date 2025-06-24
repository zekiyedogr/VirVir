import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

const base_style = StyleSheet.create({
  
  centered_view: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
    
  modal_view: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  header: {
    fontSize: 18,
    fontFamily:'sans-serif-thin',
    fontWeight: 'bold',
  },

  modal_button: {
    marginTop: 35,
    fontFamily:'sans-serif-thin',
    fontWeight: 'bold',
  },
})

export default {
  message: StyleSheet.create({
    ... base_style,
    modal_view: {
      ... base_style.modal_view,
      backgroundColor: '#dde0f1',
    },
    header: {
      ... base_style.header,
      color: colors.darkBlue,
    },
    modal_button: {
      ... base_style.modal_button,
      color: colors.darkBlue,
    }
  }),

  danger: StyleSheet.create({
    ... base_style,
    modal_view: {
      ... base_style.modal_view,
      backgroundColor: colors.bgColorDangerContainer,
    },
    header: {
      ... base_style.header,
      color: colors.dangerText,
    },
    modal_button: {
      ... base_style.modal_button,
      color: colors.dangerText,
    }
  }),
}