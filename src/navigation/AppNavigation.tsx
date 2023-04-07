import React, { useState, useEffect } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import PasswordReset from "../screens/PasswordReset/PasswordReset";
import PasswordResetConfirmation from "../screens/PasswordReset/PasswordResetConfirmation";
import FirstLoginAddress from "../screens/First_login/FirstLoginAddress";
import FirstLoginPhone from "../screens/First_login/FirstLoginPhone";
import COLORS from "../constants/colors";
import CallForHelpAreYouSure from "../screens/RequestHelpModule/CallForHelpAreYouSure";
import CallForHelp from "../screens/RequestHelpModule/CallForHelp";
import HelpCanceled from "../screens/MapModules/HelpCanceled";
import MapMode from "../screens/MapModules/MapMode";
import ExchangeInfo from "../screens/MapModules/ExchangeInfo";
import NumberSharingActive from "../screens/MapModules/NumberSharingActive";
import MainScreen from "../screens/Main/MainScreen";
import AccountSettings from "../screens/AccountSettings/AccountSettings";
import ChangePassword from "../screens/AccountSettings/ChangePassword";
import DeleteAccount from "../screens/AccountSettings/DeleteAccount";
import AccountDeleted from "../screens/AccountSettings/AccountDeleted";
import ChangeEmail from "../screens/AccountSettings/ChangeEmail";
import HelpNeeded from "../screens/Login/HelpNeeded";

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: COLORS["gamboge orange"],
	},
};

export type RootStackParamList = {
	Login: undefined;
	FirstLoginAddress: undefined;
	FirstLoginPhone: undefined;
	Register: undefined;
	PasswordReset: undefined;
	PasswordResetConfirmation: undefined;
	MainScreen: undefined;
	AccountSettings: undefined;
	ChangePassword: undefined;
	ChangeEmail: undefined;
	DeleteAccount: undefined;
	AccountDeleted: undefined;
	CallForHelpAreYouSure: undefined;
	CallForHelp: undefined;
	HelpCanceled: undefined;
	MapMode: undefined;
	ExchangeInfo: undefined;
	NumberSharingActive: undefined;
  HelpNeeded: { username: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = ({ navigationRef }: { navigationRef: any }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});
	}, [auth]);

	return (
		<NavigationContainer ref={navigationRef} theme={theme}>
			<Stack.Navigator
				initialRouteName="Login"
				screenOptions={{ headerShown: false, animation: "none" }}
			>
				{isLoggedIn ? (
					<Stack.Group>
						<Stack.Screen name="MainScreen" component={MainScreen} />
						<Stack.Screen name="AccountSettings" component={AccountSettings} />
						<Stack.Screen name="ChangePassword" component={ChangePassword} />
						<Stack.Screen name="ChangeEmail" component={ChangeEmail} />
						<Stack.Screen name="DeleteAccount" component={DeleteAccount} />
						<Stack.Screen
							name="CallForHelpAreYouSure"
							component={CallForHelpAreYouSure}
						/>
						<Stack.Screen name="CallForHelp" component={CallForHelp} />
						<Stack.Screen name="HelpCanceled" component={HelpCanceled} />
						<Stack.Screen name="MapMode" component={MapMode} />
						<Stack.Screen name="ExchangeInfo" component={ExchangeInfo} />
						<Stack.Screen
							name="NumberSharingActive"
							component={NumberSharingActive}
						/>
					</Stack.Group>
				) : (
					<Stack.Group>
						<Stack.Screen name="Login" component={Login} />
						<Stack.Screen name="Register" component={Register} />
						<Stack.Screen name="PasswordReset" component={PasswordReset} />
						<Stack.Screen
							name="PasswordResetConfirmation"
							component={PasswordResetConfirmation}
						/>
						<Stack.Screen name="AccountDeleted" component={AccountDeleted} />
            <Stack.Screen name="HelpNeeded" component={HelpNeeded} />
					</Stack.Group>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigation;
