import { Dimensions, Text } from "react-native";
import { Button } from "native-base";

import COLORS from "../../constants/colors";

type CustomButtonProps = {
	text: string;
	margin?: number;
	clickHandler: () => void;
	disabled?: boolean;
};

const calculateFontSize = (): number => {
	let height = Dimensions.get("window").height;
	if (height >= 1300) return 18;
	if (height >= 1200) return 17;
	if (height >= 1100) return 16;
	if (height >= 1000) return 15;
	if (height >= 890) return 14;
	if (height >= 800) return 13;
	return 12;
};

const CustomButton = ({
	text,
	margin = 18,
	clickHandler,
	disabled = false,
}: CustomButtonProps) => {
	return (
		<Button
			width={(Dimensions.get("window").width * 252) / 320}
			height={(Dimensions.get("window").height * 42) / 568}
			maxWidth={400}
			maxHeight={100}
			borderRadius={90}
			backgroundColor={COLORS.blood}
			shadow={5}
			marginTop={margin}
			marginBottom={margin}
			onPress={clickHandler}
			isDisabled={disabled}
		>
			<Text
				style={{
					fontSize: calculateFontSize(),
					fontFamily: "Lato-Bold",
					color: COLORS["floral white"],
					marginBottom: 4,
				}}
			>
				{text}
			</Text>
		</Button>
	);
};

export default CustomButton;
