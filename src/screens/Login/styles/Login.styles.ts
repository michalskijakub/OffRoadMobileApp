import {StyleSheet} from "react-native";
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    logo: {
        width: 98,
        height: 98,
    },
    headerText: {
        fontSize: 40,
        color: COLORS.white,
        fontWeight: "bold",
        textShadowOffset: {width: 0, height: 4},
        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowRadius: 4,
    },
    textBold: {
        fontSize: 12,
        fontWeight: "bold",
        color: COLORS.blood,
    },
    text: {
        fontSize: 12,
        color: COLORS.blood,
    },
});

export default styles;
