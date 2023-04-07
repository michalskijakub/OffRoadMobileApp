import React, { useState } from "react";
import { View, Text } from "react-native";
import { VStack, Center } from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { getAuth, deleteUser } from "firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigation";

import CustomInput from "../RequestHelpModule/components/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import styles from "./styles/DeleteAccount.styles";
import COLORS from "../../constants/colors";

type DeleteAccountProp = NativeStackNavigationProp<RootStackParamList>;

export default function DeleteAccount() {
  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const handleEmailChange = (text: string) => {
    console.log(getAuth().currentUser?.email);
    setIsEmailInvalid(text != getAuth().currentUser?.email);
    setEmail(text);
  };

  const navigation = useNavigation<DeleteAccountProp>();
  const handleBackPress = () => {
    navigation.navigate("AccountSettings");
  };
  const handleDeleteAccountPress = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      if (user.email !== email) {
        setDeleteError(true);
        setDeleteErrorMessage("Wrong email!");
      } else
        deleteUser(user)
          .then(() => {
            navigation.navigate("AccountDeleted");
          })
          .catch((error) => {
            setDeleteError(true);
            setDeleteErrorMessage(error.message);
          });
    } else throw new Error("User not found!");
  };

  return (
    <View style={styles.container}>
      <VStack>
        <Center marginTop="15%">
          <Entypo name="warning" size={120} color={COLORS.blood} />
        </Center>
        <Center marginTop="5%" paddingX={10}>
          <Text style={styles.textBold}>Warning</Text>
          <Text style={styles.text}>
            You are about to delete your account. All data associated with it
            will be gone forever (very long time).
          </Text>
          <Text style={styles.text}>
            Type your email to confim this action.
          </Text>
        </Center>
        <Center marginTop="15%">
          <CustomInput
            state={email}
            margin={0}
            setState={(input: string) => handleEmailChange(input)}
            placeholder="Email"
            icon={<Feather name="at-sign" color={COLORS.blood} />}
          />
        </Center>
        <Center>
          {deleteError && (
            <Text style={styles.textBold}>{deleteErrorMessage}</Text>
          )}
        </Center>
        <Center marginTop="15%">
          <CustomButton
            text="DELETE ACCOUNT"
            clickHandler={handleDeleteAccountPress}
            disabled={isEmailInvalid || email.length <= 0}
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
