import { Box, ScrollView } from "native-base";
import styles from "./styles/CallForHelp.styles";
import HomeAppBar from "../../components/common/HomeAppBar";
import React, { useEffect, useState } from "react";
import { Dimensions, Text } from "react-native";
import LineSeparator from "../../components/common/LineSeparator";
import CustomButton from "./components/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import HelpingUserCard from "./components/HelpingUserCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { getAuth } from "firebase/auth";
import {
	addUserRequestingHelp,
	declineHelpFromUser,
	deleteUserRequestingHelp,
	getUsersWhoWantToHelp,
	getUsersData,
} from "../../utils/firestore";
import * as Linking from "expo-linking";

import { sendPushNotification } from "../../utils/notifications";

const DEGREE_KM = 111;

const CallForHelp = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const auth = getAuth();
	const user = auth.currentUser;
	const username = user.displayName;

	const [connectionTimeout, setConnectionTimeout] = useState(false);
	const [coords, setCoords] = useState<{ latitude: string; longitude: string }>(
		{ latitude: "", longitude: "" }
	);
	const [lastRefresh, setLastRefresh] = useState("");
	const [usersWhoWantToHelp, setUsersWhoWantToHelp] = useState(
		Array<{ username: string; phoneNumber: string }>
	);

	useEffect(() => {
		const getCurrentLocation = async () => {
			return await Location.getCurrentPositionAsync();
		};

		const currentCords = getCurrentLocation();

		currentCords.then((res) => {
			const { coords } = res;
			const querySnapshot = getUsersData();
			querySnapshot.then((res) => {
				res.forEach(async (doc) => {
					const userData = doc.data();
					if (doc.id !== getAuth().currentUser?.email) {
						if (userData.pushToken) {
							if (userData.address) {
								const userLocation = await Location.geocodeAsync(
									userData.address
								);
								if (userLocation.length) {
									const longitudeDifference = Math.abs(
										coords.longitude - userLocation[0].longitude
									);
									const latitudeDifference = Math.abs(
										coords.latitude - userLocation[0].latitude
									);

									if (userData.range) {
										if (
											longitudeDifference * DEGREE_KM <= userData.range &&
											latitudeDifference * DEGREE_KM <= userData.range
										) {
											sendPushNotification(userData.pushToken);
										}
									} else {
										if (
											longitudeDifference * DEGREE_KM <= 30 &&
											latitudeDifference * DEGREE_KM <= 30
										) {
											sendPushNotification(userData.pushToken);
										}
									}
								}
							}
						}
					}
				});
			});
		});

		//sendPushNotification("ExponentPushToken[PBMLYwJ5NXFOSSI1TwXcsy]");
	}, []);

	const updateData = async () => {
		setConnectionTimeout(false);

		let rejectTimeout: ReturnType<typeof setTimeout> | null = setTimeout(() => {
			setConnectionTimeout(true);
			clearTimeout(rejectTimeout!);
			rejectTimeout = null;
		}, 5000);

		const location = await Location.getCurrentPositionAsync({}).then((res) => {
			if (rejectTimeout) {
				clearTimeout(rejectTimeout!);
				rejectTimeout = null;
				return res;
			}

			return null;
		});

		if (location !== null) {
			setCoords({
				latitude: location.coords.latitude.toString().substring(0, 9),
				longitude: location.coords.longitude.toString().substring(0, 9),
			});

			rejectTimeout = setTimeout(() => {
				setConnectionTimeout(true);
				clearTimeout(rejectTimeout!);
				rejectTimeout = null;
			}, 5000);

			const returnedUsers = await getUsersWhoWantToHelp(username).then(
				(res) => {
					if (rejectTimeout) {
						clearTimeout(rejectTimeout!);
						rejectTimeout = null;
						return res;
					}

					return null;
				}
			);

			if (returnedUsers !== null) {
				setUsersWhoWantToHelp(returnedUsers);

				const date = new Date();

				rejectTimeout = setTimeout(() => {
					setConnectionTimeout(true);
					clearTimeout(rejectTimeout!);
					rejectTimeout = null;
				}, 5000);

				await addUserRequestingHelp(
					username,
					location.coords.latitude.toString().substring(0, 9),
					location.coords.longitude.toString().substring(0, 9),
					date
				).then(() => {
					if (rejectTimeout) {
						clearTimeout(rejectTimeout!);
						rejectTimeout = null;
					}
				});
				setLastRefresh(date.toString().substring(16, 24));
			}
		}
	};

	const RenderUsersWhoWantToHelp = (
		usersWhoWantToHelp: Array<{ username: string; phoneNumber: string }>
	) => {
		return usersWhoWantToHelp.length > 0 ? (
			<Box style={styles.cardsSection}>
				{usersWhoWantToHelp.map((key, index) => {
					return (
						<HelpingUserCard
							key={index}
							username={key.username}
							phoneIconClickHandler={() => {
								Linking.openURL(`tel:${key.phoneNumber}`);
								console.log(`calling ${key.phoneNumber}`);
							}}
							cancelIconClickHandler={async () => {
								let rejectTimeout: ReturnType<typeof setTimeout> | null =
									setTimeout(() => {
										setConnectionTimeout(true);
										clearTimeout(rejectTimeout!);
										rejectTimeout = null;
									}, 5000);

								await declineHelpFromUser(key.username).then(() => {
									if (rejectTimeout) {
										clearTimeout(rejectTimeout!);
										rejectTimeout = null;
									}
								});

								rejectTimeout = setTimeout(() => {
									setConnectionTimeout(true);
									clearTimeout(rejectTimeout!);
									rejectTimeout = null;
								}, 5000);

								await updateData().then(() => {
									if (rejectTimeout) {
										clearTimeout(rejectTimeout!);
										rejectTimeout = null;
									}
								});
							}}
						/>
					);
				})}
			</Box>
		) : (
			<></>
		);
	};

	useEffect(() => {
		(async () => {
			let rejectTimeout: ReturnType<typeof setTimeout> | null = setTimeout(
				() => {
					setConnectionTimeout(true);
					clearTimeout(rejectTimeout!);
					rejectTimeout = null;
				},
				5000
			);

			let status: Location.PermissionStatus | null =
				await Location.requestForegroundPermissionsAsync().then((res) => {
					if (rejectTimeout) {
						clearTimeout(rejectTimeout!);
						rejectTimeout = null;
						return res.status;
					}

					return null;
				});

			if (status !== null) {
				if (status !== "granted") {
					navigation.navigate("MainScreen");
					return;
				}
				rejectTimeout = setTimeout(() => {
					setConnectionTimeout(true);
					clearTimeout(rejectTimeout!);
					rejectTimeout = null;
				}, 5000);

				await updateData().then(() => {
					if (rejectTimeout) {
						clearTimeout(rejectTimeout!);
						rejectTimeout = null;
					}
				});
			}
		})();
	}, []);
	useEffect(() => {
		const interval = setInterval(async () => {
			let rejectTimeout: ReturnType<typeof setTimeout> | null = setTimeout(
				() => {
					setConnectionTimeout(true);
					clearTimeout(rejectTimeout!);
					rejectTimeout = null;
				},
				5000
			);

			await updateData().then(() => {
				if (rejectTimeout) {
					clearTimeout(rejectTimeout!);
					rejectTimeout = null;
				}
			});
		}, 30 * 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<HomeAppBar text={"Requesting help"} showHomeIcon={false} />
			<Box style={styles.wrapper}>
				<Box style={styles.topSection}>
					<Text style={styles.topText}>
						You are currently requesting help. Below is a list of users who
						agreed to help you. They have constant access to your current
						location but, for privacy reasons, don't know your phone number. Be
						sure to contact them to discuss the details, or click the cross
						button to let them know you already expect help from someone else.
						DO NOT click cancel unless you are 100% sure you will get the help
						you need.
					</Text>
					<Box style={styles.lineSeparatorPosition}>
						<LineSeparator />
					</Box>
				</Box>
				<Box style={styles.middleSection}>
					<ScrollView h={styles.middleSection.height - 20}>
						{RenderUsersWhoWantToHelp(usersWhoWantToHelp)}
					</ScrollView>
					<Box style={styles.lineSeparatorPosition}>
						<LineSeparator />
					</Box>
				</Box>
				<Box style={styles.bottomSection}>
					<Box style={styles.cardsSection}>
						<Box style={styles.bottomCard}>
							<MaterialIcons
								name="info"
								size={(Dimensions.get("window").height * 32) / 568}
								color={COLORS["floral white"]}
							/>
							<Text style={styles.bottomCardText}>
								Always prioritize your health!
							</Text>
						</Box>
						<Box style={styles.bottomCard}>
							<MaterialIcons
								name="refresh"
								size={(Dimensions.get("window").height * 32) / 568}
								color={COLORS["floral white"]}
							/>
							<Text style={styles.bottomCardText}>
								Last refresh: {lastRefresh}
							</Text>
						</Box>
						<Box style={styles.bottomCard}>
							<MaterialIcons
								name="location-pin"
								size={(Dimensions.get("window").height * 32) / 568}
								color={COLORS["floral white"]}
							/>
							<Text style={styles.bottomCardText}>
								Latitude: {coords.latitude}
								{"\n"}Longitude: {coords.longitude}
							</Text>
						</Box>
					</Box>
					<Box style={styles.cancelButtonPosition}>
						{connectionTimeout && (
							<Text style={styles.errorText}>
								There was a network problem. Some information may be incorrect.
							</Text>
						)}
						<CustomButton
							text="CANCEL"
							margin={0}
							clickHandler={async () => {
								let rejectTimeout: ReturnType<typeof setTimeout> | null =
									setTimeout(() => {
										setConnectionTimeout(true);
										clearTimeout(rejectTimeout!);
										rejectTimeout = null;
									}, 5000);

								await deleteUserRequestingHelp(username).then(() => {
									if (rejectTimeout) {
										clearTimeout(rejectTimeout!);
										rejectTimeout = null;
									}
								});
								// TODO: uncomment on release,
								//  for now leave it so we don't have to create new mock data every god damn time
								// await deleteEveryoneWhoWantedToHelpUser(username);
								navigation.navigate("MainScreen");
							}}
						/>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default CallForHelp;
