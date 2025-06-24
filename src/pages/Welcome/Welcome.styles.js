import { StyleSheet, Dimensions } from "react-native";
import colors from "../../styles/colors";

const deviceSize = Dimensions.get("window");

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.bgColor,
    },
    image: {
      width: deviceSize.width * 0.5,
      height: deviceSize.height * 0.3,
    },
});