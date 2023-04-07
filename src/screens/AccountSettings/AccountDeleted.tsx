import { View, Image, Text } from "react-native";
import { VStack, Center } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigation";

import CustomButton from "../../components/common/CustomButton";
import styles from "./styles/DeleteAccount.styles";
import Logo from "../../../assets/logo/logoMockWhite.png";

type DeleteAccountProp = NativeStackNavigationProp<RootStackParamList>;

export default function AccountDeleted(props: any) {
	const navigation = useNavigation<DeleteAccountProp>();
	const handleBackPress = () => {
		navigation.navigate("Login");
	};
	return (
		<View style={styles.container}>
			<VStack>
				<Center marginTop="35%">
					<Image source={Logo} style={styles.logo} />
				</Center>
				<Center marginTop="5%" padding={7}>
					<Text style={styles.textBold}>Sad to see you go...</Text>
					<Text style={styles.text}>
						Sad to see you go... Thank you for using Off-road. We hope to see
						you again very soon. If you have any suggestions about fixing this
						app, don’t hesitate to write a review. Your feedback is one of the
						most important thing to us.
					</Text>
					<Text style={styles.text}>So long, partner!</Text>
				</Center>
				<Center marginTop="30%">
					<CustomButton
						text="SEE YOU SOON"
						clickHandler={handleBackPress}
						margin={4}
					/>
				</Center>
			</VStack>
		</View>
	);
}
