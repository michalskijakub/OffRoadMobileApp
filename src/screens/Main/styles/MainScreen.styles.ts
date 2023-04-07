import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

const styles = StyleSheet.create({
	wrapper: {
		flexGrow: 1,
	},
	container: {
		width: "100%",
		height: "100%",
	},
	button: {
		width: "75%",
		textAlign: "center",
	},
	text: {
		fontSize: 18,
		color: COLORS["floral white"],
		textAlign: "center",
		marginTop: 6,
	},
});

export default styles;
