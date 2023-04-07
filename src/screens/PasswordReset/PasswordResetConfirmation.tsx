import {Image, Text, View} from "react-native";
import {Center, VStack} from "native-base";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../navigation/AppNavigation";
import {useNavigation} from "@react-navigation/native";

import CustomButton from "../../components/common/CustomButton";

import Logo from "../../../assets/logo/logoMockWhite.png";

import styles from "./styles/PasswordReset.styles";

type PasswordResetConfirmationScreenProp =
    NativeStackNavigationProp<RootStackParamList>;

const PasswordResetConfirmation = () => {
    const navigation = useNavigation<PasswordResetConfirmationScreenProp>();

    const handleGoBackButtonPress = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <VStack>
                <Center marginTop="25%">
                    <Image source={Logo} style={styles.logo}/>
                    <Text style={styles.headerText}>Off-road</Text>
                    <Text style={styles.bloodyTextBold}>Let's Drive Together</Text>
                </Center>
                <Center marginTop="10%">
                    <Text style={styles.signUpText}>PASSWORD RESET</Text>
                </Center>
                <Center marginTop="10%">
                    <Text style={styles.whiteTextBold}>All done!</Text>
                </Center>
                <Center marginTop="5%">
                    <Text style={styles.whiteText}>Check your inbox to get your temporary new.</Text>
                    <Text style={styles.whiteText}>
                        password.
                    </Text>
                    <Text style={styles.whiteText}>
                        If you don't see our message, be sure to
                    </Text>
                    <Text style={styles.whiteText}>
                        check spam or try again in 15 minutes.
                    </Text>
                </Center>
                <Center marginTop="15%">
                    <CustomButton text="GO BACK" clickHandler={handleGoBackButtonPress}/>
                </Center>
            </VStack>
        </View>
    );
};

export default PasswordResetConfirmation;
