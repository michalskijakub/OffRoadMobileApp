import { useState } from "react";
import { View, Image, Text } from "react-native";
import { VStack, Center } from "native-base";
import { Feather, Foundation, Entypo, MaterialIcons } from "@expo/vector-icons";

import {
	getAuth,
	updatePassword,
	reauthenticateWithCredential,
	EmailAuthProvider,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigation";

import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import styles from "./styles/AccountSettings.styles";
import COLORS from "../../constants/colors";
import { validatePassword } from "../../utils/validators";
import HomeAppBar from "../../components/common/HomeAppBar";

type ChangePasswordProp = NativeStackNavigationProp<RootStackParamList>;

export default function ChangePassword(props: any) {
	const [oldPassword, setOldPassword] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [saveError, setSaveError] = useState(false);
	const [saveErrorMessage, setSaveErrorMessage] = useState("");
	const [passwordChanged, setPasswordChanged] = useState(false);

	const handleOldPasswordChange = (text: string) => {
		setOldPassword(text);
	};

	const handlePasswordChange = (text: string) => {
		setPassword(text);
	};
	const handleRepeatPasswordChange = (text: string) => {
		setRepeatPassword(text);
	};

	const navigation = useNavigation<ChangePasswordProp>();
	const handleBackPress = () => {
		navigation.navigate("AccountSettings");
	};
	const handleChangePasswordPress = () => {
		const auth = getAuth();
		const user = auth.currentUser;
		let credential;
		if (auth && auth.currentUser && auth.currentUser.email)
			credential = EmailAuthProvider.credential(
				auth.currentUser.email,
				oldPassword
			);
		else throw new Error("Failed to get auth!");
		if (user) {
			reauthenticateWithCredential(user, credential)
				.then((res) => {
					console.log(res);
					updatePassword(user, password)
						.then(() => {
							setSaveError(false);
							setPasswordChanged(true);
						})
						.catch((error) => {
							console.log(error);
							setSaveError(true);
							setSaveErrorMessage("Failed to update your password!");
						});
				})
				.catch((err) => {
					console.log(err.message);
					if (err.message === "Firebase: Error (auth/wrong-password).") {
						setSaveError(true);
						setSaveErrorMessage("Wrong old password!");
					}
				});
		} else throw new Error("User not found!");
	};

	return (
		<View style={styles.container}>
			<VStack>
				<HomeAppBar text="Profile" />
				<Center marginTop="5%">
					<Text style={styles.headerText}>PASSWORD CHANGE</Text>
				</Center>
				<Center marginTop="5%">
					<CustomInput
						state={oldPassword}
						setState={handleOldPasswordChange}
						placeholder="Old password"
						icon={<MaterialIcons name="lock-clock" color={COLORS.blood} />}
						errorMessage="Invalid password"
						isContentInvalid={false}
						margin={2}
					/>
					<CustomInput
						state={password}
						setState={handlePasswordChange}
						placeholder="New password"
						icon={<Foundation name="key" color={COLORS.blood} />}
						isContentInvalid={false}
						margin={2}
					/>
					<CustomInput
						state={repeatPassword}
						setState={handleRepeatPasswordChange}
						placeholder="Repeat new password"
						icon={<MaterialIcons name="verified" color={COLORS.blood} />}
						isContentInvalid={false}
						margin={2}
					/>
				</Center>
				<Center>
					{saveError && <Text style={styles.textBold}>{saveErrorMessage}</Text>}
					{passwordChanged && (
						<Text style={styles.textBold}>Password changed!</Text>
					)}
				</Center>
				<Center marginTop="40%">
					<CustomButton
						text="CHANGE PASSWORD"
						clickHandler={handleChangePasswordPress}
						margin={0}
					/>
					<CustomButton
						text="GO BACK"
						clickHandler={handleBackPress}
						margin={4}
					/>
				</Center>
			</VStack>
		</View>
	);
}
