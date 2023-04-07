import React from "react";
import {
	TouchableOpacity,
	ImageBackground,
	Text,
	StyleSheet,
	ImageSourcePropType,
} from "react-native";
import COLORS from "../../constants/colors";

type CustomButtonProps = {
	backgroundColor: string;
	image: ImageSourcePropType;
	text: string;
	textColor?: string;
	lowerText?: string;
	handlePress?: () => void;
};

export default function ImageButton({
	backgroundColor = COLORS.blood,
	image,
	text,
	textColor = COLORS["floral white"],
	lowerText,
	handlePress,
}: CustomButtonProps) {
	const styles = StyleSheet.create({
		touchable: {
			width: "80%",
		},
		imageButton: {
			textAlign: "center",
			width: "100%",
			backgroundColor: backgroundColor,
			borderRadius: 10,
			padding: 10,
		},
		image: {
			borderRadius: 10,
			opacity: 0.4,
			flex: 1,
			width: undefined,
			height: undefined,
			resizeMode: "cover",
		},
		imageTextBold: {
			color: textColor,
			fontSize: 21,
			lineHeight: 50,
			fontWeight: "bold",
			textAlign: "center",
		},
		imageText: {
			color: textColor,
			fontSize: 21,
			lineHeight: 50,
			textAlign: "center",
		},
	});
	return (
		<TouchableOpacity onPress={handlePress} style={styles.touchable}>
			<ImageBackground
				style={styles.imageButton}
				imageStyle={styles.image}
				source={image}
			>
				<Text style={styles.imageTextBold}>{text}</Text>
				{lowerText && <Text style={styles.imageText}>{lowerText}</Text>}
			</ImageBackground>
		</TouchableOpacity>
	);
}
