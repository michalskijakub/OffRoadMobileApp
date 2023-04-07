import { useState } from "react";
import { View, Image, Text } from "react-native";
import { VStack, Center } from "native-base";
import { Feather, Foundation, Entypo, MaterialIcons } from "@expo/vector-icons";

import {
	getAuth,
	updateEmail,
	reauthenticateWithCredential,
	EmailAuthProvider,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { validateEmail } from "../../utils/validators";
import { getUserData, addUserData, deleteUserData } from "../../utils/firestore";

import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import styles from "./styles/AccountSettings.styles";
import COLORS from "../../constants/colors";
import HomeAppBar from "../../components/common/HomeAppBar";

type ChangePasswordProp = NativeStackNavigationProp<RootStackParamList>;

export default function ChangeEmail(props: any) {
	const [email, setEmail] = useState("");
	const [isEmailInvalid, setIsEmailInvalid] = useState(false);
	const [wasEmailFocused, setWasEmailFocused] = useState(false);
	const [password, setPassword] = useState("");
	const [saveError, setSaveError] = useState(false);
	const [saveErrorMessage, setSaveErrorMessage] = useState("");
	const [emailChanged, setEmailChanged] = useState(false);

	const handleEmailChange = (text: string) => {
		setIsEmailInvalid(!validateEmail(text));
		setEmail(text);
	};

	const handleEmailOutsidePress = () => {
		setWasEmailFocused(true);
	};

	const handlePasswordChange = (text: string) => {
		setPassword(text);
	};

	const navigation = useNavigation<ChangePasswordProp>();
	const handleBackPress = () => {
		navigation.navigate("AccountSettings");
	};
	const handleChangeEmailPress = () => {
		const auth = getAuth();
		const user = auth.currentUser;
		let credential;
		if (auth && auth.currentUser && auth.currentUser.email)
			credential = EmailAuthProvider.credential(
				auth.currentUser.email,
				password
			);
		else throw new Error("Failed to get auth!");
		if (user) {
			reauthenticateWithCredential(user, credential)
				.then(async (res) => {
					const oldEmail = auth.currentUser?.email;
          const userData = await getUserData();
          if (userData && oldEmail) {
            addUserData(email, userData.address, userData.phone, userData.range, userData.pushToken);
            deleteUserData(oldEmail);

            updateEmail(user, email)
						.then(async () => {
							setSaveError(false);
							setEmailChanged(true);
						})
						.catch((error) => {
							console.log(error);
							setSaveError(true);
							setSaveErrorMessage("Failed to update your password!");
						});
          } else {
            console.log("Error during obtaining user data!");
          }
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
					<Text style={styles.headerText}>E-MAIL CHANGE</Text>
				</Center>
				<Center marginTop="5%">
					<CustomInput
						state={password}
						setState={handlePasswordChange}
						placeholder="Password"
						icon={<MaterialIcons name="lock-clock" color={COLORS.blood} />}
						errorMessage="Invalid password"
						isContentInvalid={false}
						margin={2}
					/>
					<CustomInput
						state={email}
						setState={handleEmailChange}
						placeholder="Email"
						icon={<Feather name="at-sign" color={COLORS.blood} />}
						isContentInvalid={isEmailInvalid && wasEmailFocused}
						errorMessage="Invalid email"
						outsideClick={handleEmailOutsidePress}
						margin={2}
					/>
				</Center>
				<Center>
					{saveError && <Text style={styles.textBold}>{saveErrorMessage}</Text>}
					{emailChanged && <Text style={styles.textBold}>E-mail changed!</Text>}
				</Center>
				<Center marginTop="40%">
					<CustomButton
						text="CHANGE E-MAIL"
						clickHandler={handleChangeEmailPress}
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
