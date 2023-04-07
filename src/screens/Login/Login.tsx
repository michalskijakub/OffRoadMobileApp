import {useState, useContext} from "react";
import {Image, Text, View} from "react-native";
import {Center, VStack} from "native-base";
import {Feather, Foundation} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../navigation/AppNavigation";
import {auth} from "../../../firebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";

import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";

import Logo from "../../../assets/logo/logoMockWhite.png";

import COLORS from "../../constants/colors";
import { validateEmail } from "../../utils/validators";
import styles from "./styles/Login.styles";

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList>;

const Login = () => {
    const [email, setEmail] = useState("");
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [wasEmailFocused, setWasEmailFocused] = useState(false);
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

    const navigation = useNavigation<LoginScreenProp>();

    const handleSignUpPress = () => {
        navigation.navigate("Register");
    };

    const handleForgotPasswordPress = () => {
        navigation.navigate("PasswordReset");
    };

    const handleEmailChange = (text: string) => {
        setIsEmailInvalid(!validateEmail(text));
        setEmail(text);
    };

    const handleEmailOutsidePress = () => {
      setWasEmailFocused(true)
    }

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    const loginUser = () => {
      if (!isEmailInvalid) {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
              setLoginError(false);
            })
            .catch((error) => {
              setLoginError(true);
              if (error.message.includes("user")) {
                setLoginErrorMessage("Incorrect email");
              } else {
                setLoginErrorMessage("Incorrect password");
              }
            });
      }
    };

    return (
        <View style={styles.container}>
            <VStack>
                <Center marginTop="30%">
                    <Image source={Logo} style={styles.logo}/>
                    <Text style={styles.headerText}>Off-road</Text>
                    <Text style={styles.text}>Let's Drive Together</Text>
                </Center>
                <Center marginTop="15%">
                    <CustomInput
                        state={email}
                        setState={handleEmailChange}
                        placeholder="Email"
                        icon={<Feather name="at-sign" color={COLORS.blood}/>}
                        isContentInvalid={isEmailInvalid && wasEmailFocused}
                        errorMessage="Invalid email"
                        outsideClick={handleEmailOutsidePress}
                    />
                    <CustomInput
                        state={password}
                        setState={handlePasswordChange}
                        placeholder="Password"
                        type="password"
                        icon={<Foundation name="key" color={COLORS.blood}/>}
                        isContentInvalid={false}
                    />
                </Center>
                <Center marginTop="10%">
                    {loginError && <Text style={styles.textBold}>{loginErrorMessage}</Text>}
                    <CustomButton
                        text="SIGN IN"
                        clickHandler={loginUser}
                    />
                    <Text style={styles.text} onPress={handleSignUpPress}>
                        Don't have an account?{" "}
                        <Text style={styles.textBold}>Sign Up Now</Text>
                    </Text>
                </Center>
                <Center marginTop="5%">
                    <Text style={styles.text} onPress={handleForgotPasswordPress}>
                        Forgot password?
                    </Text>
                </Center>
            </VStack>
        </View>
    );
};

export default Login;
