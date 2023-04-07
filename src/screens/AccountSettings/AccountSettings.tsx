import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { Center, VStack, ScrollView } from "native-base";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigation";

import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import styles from "./styles/AccountSettings.styles";
import COLORS from "../../constants/colors";
import HomeAppBar from "../../components/common/HomeAppBar";
import { addUserData, getUserData } from "../../utils/firestore";
import { validateRange } from "../../utils/validators";

type AccountSettingsProp = NativeStackNavigationProp<RootStackParamList>;

export default function AccountSettings() {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [range, setRange] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [saveErrorMessage, setSaveErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      let data = await getUserData();
      setPhone(data.phone);
      setAddress(data.address);
      setRange(data.range.endsWith(" km") ? data.range : data.range + " km");
    })();
  }, []);

  const handleRangeChange = (text: string) => {
    setRange(text);
  };

  const handlePhoneChange = (text: string) => {
    setPhone(text);
  };

  const handleAddressChange = (text: string) => {
    setAddress(text);
  };

  const navigation = useNavigation<AccountSettingsProp>();
  const handleChangePasswordPress = () => {
    navigation.navigate("ChangePassword");
  };
  const handleDeleteAccountPress = () => {
    navigation.navigate("DeleteAccount");
  };

  const handleChangeEmailPress = () => {
    navigation.navigate("ChangeEmail");
  };

  const handleSaveInfo = () => {
    const auth = getAuth();
    let errorMessage = "";
    if (phone === "") {
      errorMessage = "Can not save empty phone number!";
    } else if (address === "") {
      errorMessage = "Can not save empty address!";
    } else if (range === "") {
      errorMessage = "Can not save empty range!";
    } else if (!validateRange(range.replace("km", "").trim())) {
      errorMessage = "Incorrect range!";
    }
    // TODO: add address and phone number validation
    if (errorMessage != "") {
      setSaveError(true);
      setSaveErrorMessage(errorMessage);
      return;
    }
    setSaveSuccess(false);
    setSaveError(false);
    if (auth.currentUser && auth.currentUser.email) {
      addUserData(
        auth.currentUser.email,
        address,
        phone,
        range.replace("km", "").trim()
      )
        .then((res) => {
          setSaveSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          setSaveError(true);
          setSaveErrorMessage(error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <VStack>
        <HomeAppBar text="Profile" />
        {/*TODO: figure out how to get height of scroll view*/}
        <ScrollView h={Dimensions.get("window").height * 0.85}>
          <Center marginTop="5%">
            <Text style={styles.headerText}>USER INFO</Text>
          </Center>
          <Center marginTop="5%">
            <CustomInput
              state={phone}
              setState={handlePhoneChange}
              placeholder="Phone"
              icon={<Entypo name="phone" color={COLORS.blood} />}
              isContentInvalid={false}
              margin={2}
            />
            <CustomInput
              state={address}
              setState={handleAddressChange}
              placeholder="Address"
              icon={<Entypo name="home" color={COLORS.blood} />}
              isContentInvalid={false}
              margin={2}
            />
            <CustomInput
              state={range}
              setState={handleRangeChange}
              placeholder="Help range (km)"
              icon={
                <MaterialCommunityIcons
                  name="map-marker-distance"
                  color={COLORS.blood}
                />
              }
              isContentInvalid={false}
              margin={2}
            />
          </Center>
          <Center>
            {saveError && (
              <Text style={styles.textBold}>{saveErrorMessage}</Text>
            )}
            {saveSuccess && (
              <Text style={styles.textBold}>Saved user info</Text>
            )}
          </Center>
          <Center>
            <CustomButton text="SAVE" clickHandler={handleSaveInfo} />
          </Center>
          <Center marginTop="5%">
            <Text style={styles.headerText}>DANGER ZONE</Text>
          </Center>
          <Center marginTop="3%">
            <CustomButton
              text="CHANGE E-MAIL"
              clickHandler={handleChangeEmailPress}
              margin={3}
            />
            <CustomButton
              text="CHANGE PASSWORD"
              clickHandler={handleChangePasswordPress}
              margin={3}
            />
            <CustomButton
              text="DELETE ACCOUNT"
              clickHandler={handleDeleteAccountPress}
              margin={3}
            />
          </Center>
        </ScrollView>
      </VStack>
    </View>
  );
}
