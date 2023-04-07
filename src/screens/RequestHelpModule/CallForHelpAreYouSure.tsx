import React, { useState } from "react";
import { Text } from "react-native";
import { Center, View, WarningOutlineIcon } from "native-base";
import styles from "./styles/CallForHelpAreYouSure.styles";
import CustomInput from "./components/CustomInput";
import { Feather } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import CustomButton from "./components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { getAuth } from "firebase/auth";

const isEmailCorrect = (email: string): boolean => {
  return email == getAuth().currentUser?.email;
};

const CallForHelpAreYouSure = () => {
  const [email, setEmail] = useState("");
  const [okButtonStyle, setOkButtonStyle] = useState(styles.button);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.wrapper}>
      <Center>
        <WarningOutlineIcon style={styles.warningIcon} />
        <Text style={styles.warningHeader}>Warning</Text>
      </Center>

      <Center>
        <Text style={styles.paragraph}>
          You are about to ask for the help of every user in 30km radius. This
          action can be performed about once every hour. Abusing this action
          WILL get you banned. Write your email to accept this operation.
        </Text>
        <CustomInput
          state={email}
          setState={(input: string) => {
            setEmail(input);
            setOkButtonStyle(
              isEmailCorrect(input)
                ? styles.buttonWhenEmailCorrect
                : styles.button
            );
          }}
          placeholder="Email"
          icon={<Feather name="at-sign" color={COLORS.blood} />}
        />
      </Center>

      <View>
        <View style={okButtonStyle} testID={"opacityView"}>
          <CustomButton
            margin={0}
            text="OK, HELP ME!"
            clickHandler={() => {
              if (!isEmailCorrect(email)) return;
              navigation.navigate("CallForHelp");
            }}
          />
        </View>
        <CustomButton
          text="GO BACK"
          clickHandler={() => {
            navigation.navigate("MainScreen");
          }}
        />
      </View>
    </View>
  );
};

export default CallForHelpAreYouSure;
