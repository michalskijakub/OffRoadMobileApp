import { Alert } from "react-native";
import { isDevice } from 'expo-device';
import { openSettings } from 'expo-linking';
import {
  getPermissionsAsync,
  requestPermissionsAsync,
  getExpoPushTokenAsync,
  setNotificationHandler,
} from 'expo-notifications';
import { getAuth } from "firebase/auth";

import { addUserData, getUserData } from "./firestore";

export const registerForPushNotifications = async () => {
  if (!isDevice) {
    throw new Error(
      'Sorry, Push Notifications are only supported on physical devices.'
    );
  }

  const { status: existingStatus } = await getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert(
      'Error',
      'Sorry, we need your permission to enable Push Notifications. Please enable it in your privacy settings.',
      [
        {
          text: 'OK',
        },
        {
          text: 'Open Settings',
          onPress: async () => openSettings(),
        },
      ]
    );
    return;
  }

  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    })
  });

  const { data } = await getExpoPushTokenAsync();

  const userData = await getUserData();

  if (userData) {
    console.log(userData);
    if (userData.pushToken !== data) {
      console.log("test")
      if (getAuth().currentUser) {
        const email = getAuth().currentUser!.email!;
  
        addUserData(email, userData.address, userData.phone, userData.range, data);
      }
    }
  } else {
    if (getAuth().currentUser) {
      const email = getAuth().currentUser!.email!;

      addUserData(email, "", "", "", data);
    }
  }
};

export const sendPushNotification = async (expoPushToken: string) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Human in trouble!',
    body: `${getAuth().currentUser?.displayName} needs your help!`,
    data: { username: getAuth().currentUser?.displayName },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}