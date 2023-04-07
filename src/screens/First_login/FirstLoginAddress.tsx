import { useState } from "react";
import { Image, Text, View } from "react-native";
import { Center, VStack } from "native-base";
import { Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import Logo from "../../../assets/logo/logoMockWhite.png";
import COLORS from "../../constants/colors";
import styles from "./styles/FirstLogin.styles";
import database from "@react-native-firebase/database";
import { getAuth } from "firebase/auth";
import { addUserData } from "../../utils/firestore";

type FirstLoginAddress = NativeStackNavigationProp<RootStackParamList>;

const FirstLoginAddress = () => {
  const [connectionTimeout, setConnectionTimeout] = useState(false);
  const [address, setAddress] = useState("");
  const auth = getAuth();
  const userEmail = auth.currentUser?.email;

  const navigation = useNavigation<FirstLoginAddress>();

  const handleContinue = async () => {
    setConnectionTimeout(false);
    //update address in firebase based on user email

    if (address != "" && userEmail != null) {
      let rejectTimeout: number | null = setTimeout(() => {
        setConnectionTimeout(true);
        clearTimeout(rejectTimeout!);
        rejectTimeout = null;
      }, 5000);
      //update address in firebase
      //addUserDataAddress(user.email, address);
      await addUserData(userEmail, address, "", "").then(() => {
        if (rejectTimeout) {
          clearTimeout(rejectTimeout!);
          rejectTimeout = null;
          console.log("User updated!");
        }
      });
    }
  };

  const handleAddressChange = (text: string) => {
    setAddress(text);
  };

  return (
    <View style={styles.container}>
      <VStack>
        <Center marginTop="30%">
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.headerText}>Off-road</Text>
          <Text style={styles.headerText2}>LOCATION</Text>
          <Text style={styles.textInformation}>
            Since our app send push notifications based on available users in
            range of an accident, we need to know where you live. You can leave
            this field blank if you want, but you will not recieve any push
            notifications and won’t be able to help other users untill you
            provide this information.
          </Text>
          <Text style={styles.textInformation}>
            Enter you address, including country, state, city, street, street
            number and flat number.
          </Text>
        </Center>
        <Center marginTop="15%">
          <CustomInput
            state={address}
            setState={handleAddressChange}
            placeholder="Address"
            icon={<Foundation name="key" color={COLORS.blood} />}
            isContentInvalid={false}
          />
        </Center>
        <Center marginTop="10%">
          {connectionTimeout && (
            <Text style={styles.text}>
              There was a network problem. Please try again.
            </Text>
          )}
          <CustomButton text="CONTINUE" clickHandler={handleContinue} />
        </Center>
      </VStack>
    </View>
  );
};

export default FirstLoginAddress;
