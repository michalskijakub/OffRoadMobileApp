import React, { useState } from "react";
import { Text } from "react-native";
import { Center, InfoOutlineIcon, View, WarningOutlineIcon } from "native-base";
import styles from "./styles/HelpCanceled.styles";
import COLORS from "../../constants/colors";
import CustomButton from "./components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigation";

type HelpCanceledProp = NativeStackNavigationProp<RootStackParamList>;

const HelpCanceled = () => {
	useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const navigation = useNavigation<HelpCanceledProp>();

	return (
		<View style={styles.wrapper}>
			<Center>
				<InfoOutlineIcon style={styles.infoIcon} />
				<Text style={styles.infoHeader}>Rescue operation cancelled</Text>
			</Center>

			<Center>
				<Text style={styles.paragraph}>
					User "User name" cancelled the call for help. Thank you for your
					effort. We hope your kindness will get back to you soon.
				</Text>
			</Center>

			<View>
				<CustomButton
					text="GO TO MAIN SCREEN"
					clickHandler={() => {
						// TODO: go to main screen
						navigation.navigate("MainScreen");
					}}
				/>
			</View>
		</View>
	);
};

export default HelpCanceled;
