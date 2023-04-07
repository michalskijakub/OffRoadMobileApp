import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import {
	StatusBar,
	Box,
	HStack,
	Image,
	Text,
	Icon,
	IconButton,
	Menu,
} from "native-base";
import { getAuth, signOut } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";
import logo from "../../../assets/logo/logoMockWhite.png";
import COLORS from "../../constants/colors";

type AppBarProp = NativeStackNavigationProp<RootStackParamList>;

export default function AppBar() {
	const navigation = useNavigation<AppBarProp>();
	const handleAccountPress = () => {
		navigation.navigate("AccountSettings");
	};

	const logout = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<StatusBar barStyle="light-content" />
			<Box safeAreaTop bg={COLORS.blood} />
			<HStack
				bg={COLORS.blood}
				px="1"
				py="3"
				justifyContent="space-between"
				alignItems="center"
				w="100%"
			>
				<HStack alignItems="center">
					<Image source={logo} size="xs" alt="Logo" marginLeft={2} />
					<Text color="white" fontSize="24" fontWeight="bold" marginLeft={4}>
						Off-road
					</Text>
				</HStack>
				<HStack>
					<IconButton
						icon={
							<Icon
								as={MaterialIcons}
								name="account-circle"
								size="xl"
								color="white"
							/>
						}
						onPress={handleAccountPress}
					/>
					<Menu
						w="190"
						trigger={(triggerProps) => {
							return (
								<IconButton
									{...triggerProps}
									icon={
										<Icon
											as={MaterialIcons}
											name="more-vert"
											size="xl"
											color="white"
										/>
									}
								/>
							);
						}}
					>
						<Menu.Item onPress={logout}>Log out</Menu.Item>
					</Menu>
				</HStack>
			</HStack>
		</>
	);
}
