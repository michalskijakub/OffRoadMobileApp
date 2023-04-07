import {StyleSheet} from "react-native";
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    logo: {
        width: 40,
        height: 40,
    },
    headerText: {
        fontSize: 40,
        color: COLORS.white,
        fontWeight: "bold",
        textShadowOffset: {width: 0, height: 4},
        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowRadius: 4,
    },
    signUpText: {
        fontSize: 34,
        color: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS["floral white"],
    },
    bloodyTextBold: {
        fontSize: 12,
        fontWeight: "bold",
        color: COLORS.blood,
    },
    whiteTextBold: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS["floral white"],
    },
    bloodyText: {
        fontSize: 12,
        color: COLORS.blood,
    },
    whiteText: {
        fontSize: 12,
        color: COLORS["floral white"],
    },
});

export default styles;
