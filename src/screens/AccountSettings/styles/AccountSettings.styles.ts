import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
	},
	textBold: {
		fontSize: 12,
		fontWeight: "bold",
		color: COLORS.blood,
	},
	headerText: {
		fontSize: 34,
		color: COLORS.white,
		borderBottomWidth: 1,
		borderBottomColor: COLORS["floral white"],
	},
});

export default styles;
