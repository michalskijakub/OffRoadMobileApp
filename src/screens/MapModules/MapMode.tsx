import { Box, ScrollView, View } from "native-base";
import styles from "./styles/MapMode.styles";
import HomeAppBar from "../../components/common/HomeAppBar";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, Image } from "react-native";
import LineSeparator from "../../components/common/LineSeparator";
import CustomButton from "./components/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import HelpingUserCard from "./components/HelpingUserCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  addUserRequestingHelp,
  declineHelpFromUser,
  deleteEveryoneWhoWantedToHelpUser,
  deleteUserRequestingHelp,
  getUsersWhoWantToHelp,
  getUsersWhoRequestHelp,
  addUserWhoWantsToHelp,
} from "../../utils/firestore";
import * as Linking from "expo-linking";
import { getAuth } from "firebase/auth";
const MapMode = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const auth = getAuth();
  const username = auth.currentUser;
  var lat = "";
  var long = "";

  const [coords, setCoords] = useState<{ latitude: string; longitude: string }>(
    { latitude: "", longitude: "" }
  );
  const [lastRefresh, setLastRefresh] = useState("");
  const [UsersRequestingHelp, setUsersRequestingHelp] = useState(
    Array<{
      username: string;
      latitude: string;
      longitude: string;
      timestamp: Date;
    }>
  );

  const updateData = async () => {
    const location = await Location.getCurrentPositionAsync({});
    setCoords({
      latitude: location.coords.latitude.toString().substring(0, 9),
      longitude: location.coords.longitude.toString().substring(0, 9),
    });
    const date = new Date();
    setUsersRequestingHelp(
      await getUsersWhoRequestHelp(
        username,
        location.coords.latitude.toString().substring(0, 9),
        location.coords.longitude.toString().substring(0, 9),
        date
      )
    );
    setLastRefresh(date.toString().substring(16, 24));
  };

  const RenderUsersWhoWantToHelp = (
    usersWhoWantToHelp: Array<{
      username: string;
      latitude: string;
      longitude: string;
      timestamp: Date;
    }>
  ) => {
    return usersWhoWantToHelp.length > 0 ? (
      <Box style={styles.cardsSection}>
        {usersWhoWantToHelp.map((key, index) => {
          return (
            <HelpingUserCard
              key={index}
              username={key.username}
              contactClickHandler={async () => {
                await addUserWhoWantsToHelp(key.username);
                navigation.navigate("ExchangeInfo", {
                  username: key.username,
                  latitude: key.latitude,
                  longitude: key.longitude,
                });
              }}
              localizationClickHandler={async () => {
                Linking.openURL(
                  `geo:${key.latitude},${key.longitude}?q=${key.latitude},${key.longitude}`
                );
              }}
            />
          );
        })}
      </Box>
    ) : (
      <></>
    );
  };

  const AddMarkers = (
    usersWhoWantToHelp: Array<{
      username: string;
      latitude: string;
      longitude: string;
      timestamp: Date;
    }>
  ) => {
    return usersWhoWantToHelp.length > 0 ? (
      <Box style={styles.cardsSection}>
        {usersWhoWantToHelp.map((key, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: Number(key.latitude),
                longitude: Number(key.longitude),
              }}
            >
              <Callout>
                <Text>{key.username}</Text>
              </Callout>
            </Marker>
          );
        })}
      </Box>
    ) : (
      <></>
    );
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // TODO: navigate to main screen
        setCoords({
          latitude: "NO_PERMISSION",
          longitude: "NO_PERMISSION",
        });
        throw new Error("Not implemented");
      }
      await updateData();
    })();
  }, []);
  useEffect(() => {
    const interval = setInterval(async () => {
      await updateData();
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  lat = coords.latitude;
  long = coords.longitude;

  return (
    <>
      <HomeAppBar text="Help others" />
      <Box style={styles.wrapper}>
        <Box style={styles.topSection}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 51.793558,
              longitude: 19.436893,
              latitudeDelta: 0.2922,
              longitudeDelta: 0.2421,
            }}
          >
            <Marker
              coordinate={{
                latitude: Number(lat),
                longitude: Number(long),
              }}
              pinColor={"green"}
            >
              <Callout>
                <Text>You are here</Text>
              </Callout>
            </Marker>
            {AddMarkers(UsersRequestingHelp)}
          </MapView>
          <Box style={styles.lineSeparatorPosition}>
            <LineSeparator />
          </Box>
        </Box>
        <Box style={styles.middleSection}>
          <ScrollView h={styles.middleSection.height - 20}>
            {RenderUsersWhoWantToHelp(UsersRequestingHelp)}
          </ScrollView>
          <Box style={styles.lineSeparatorPosition}></Box>
        </Box>
      </Box>
    </>
  );
};

export default MapMode;
