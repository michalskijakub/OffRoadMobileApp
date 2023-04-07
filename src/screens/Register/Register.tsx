import {useState} from "react";
import {Image, Text} from "react-native";
import {Center, VStack} from "native-base";
import {Feather, Foundation, MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {auth} from "../../../firebaseConfig";
import {RootStackParamList} from "../../navigation/AppNavigation";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import Logo from "../../../assets/logo/logoMockWhite.png";
import COLORS from "../../constants/colors";


import styles from "./styles/Register.styles";
import { validateEmail, validateUsername, validatePassword, validateRepeatedPassword } from "../../utils/validators";

type RegisterScreenProp = NativeStackNavigationProp<RootStackParamList>;

const Register = () => {
    const [username, setUsername] = useState("");
    const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
    const [wasUsernameFocused, setWasUsernameFocused] = useState(false);
    const [email, setEmail] = useState("");
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [wasEmailFocused, setWasEmailFocused] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [wasPasswordFocused, setWasPasswordFocused] = useState(false);
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [isRepeatedPasswordInvalid, setIsRepeatedPasswordInvalid] = useState(false);
    const [wasRepeatedPasswordFocused, setWasRepeatedPasswordFocused] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [registerErrorMessage, setRegisterErrorMessage] = useState("");

    const navigation = useNavigation<RegisterScreenProp>();

    const handleSignInPress = () => {
        navigation.navigate("Login");
    };

    const handleUsernameChange = (text: string) => {
        setIsUsernameInvalid(!validateUsername(text));
        setUsername(text);
    };

    const handleUsernameOutsidePress = () => {
      setWasUsernameFocused(true);
    }

    const handleEmailChange = (text: string) => {
        setIsEmailInvalid(!validateEmail(text));
        setEmail(text);
    };

    const handleEmailOutsidePress = () => {
      setWasEmailFocused(true);
    }

    const handlePasswordChange = (text: string) => {
        setIsPasswordInvalid(!validatePassword(text));
        setPassword(text);
    };

    const handlePasswordOutsidePress = () => {
      setWasPasswordFocused(true);
    }

    const handleRepeatedPasswordChange = (text: string) => {
        setIsRepeatedPasswordInvalid(!validateRepeatedPassword(password, text));
        setRepeatedPassword(text);
    };

    const handleRepeatedPasswordOutsidePress = () => {
      setWasRepeatedPasswordFocused(true);
    }

    const registerUser = () => {
        if (!isUsernameInvalid && !isEmailInvalid && !isPasswordInvalid && !isRepeatedPasswordInvalid) {
          createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
              updateProfile(res.user, {
                displayName: username,
              }).then(() => {
                setRegisterError(false);
              }).catch((error) => console.log(error));
            })
            .catch((error) => {
              setRegisterError(true);
              if (error.message.includes("email")) {
                setRegisterErrorMessage("Incorrect email");
              } else {
                setRegisterErrorMessage("Incorrect password");
              }
            });
        }
    };

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <VStack>
                <Center marginTop="15%">
                    <Image source={Logo} style={styles.logo}/>
                    <Text style={styles.headerText}>Off-road</Text>
                    <Text style={styles.textBold}>Let's Drive Together</Text>
                </Center>
                <Center marginTop="10%">
                    <Text style={styles.signUpText}>SIGN UP</Text>
                    <CustomInput
                        state={username}
                        setState={handleUsernameChange}
                        placeholder="Username"
                        icon={<MaterialIcons name="person"/>}
                        isContentInvalid={isUsernameInvalid && wasUsernameFocused}
                        errorMessage="Username must be at least 5 characters long"
                        outsideClick={handleUsernameOutsidePress}
                    />
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
                        icon={<Foundation name="key" color={COLORS.blood}/>}
                        type="password"
                        isContentInvalid={isPasswordInvalid && wasPasswordFocused}
                        errorMessage="Password must be at least 6 characters long"
                        outsideClick={handlePasswordOutsidePress}
                    />
                    <CustomInput
                        state={repeatedPassword}
                        setState={handleRepeatedPasswordChange}
                        placeholder="Repeat password"
                        icon={<Foundation name="key" color={COLORS.blood}/>}
                        type="password"
                        isContentInvalid={isRepeatedPasswordInvalid && wasRepeatedPasswordFocused}
                        errorMessage="Provided passwords are not identical"
                        outsideClick={handleRepeatedPasswordOutsidePress}
                    />
                </Center>

                <Center marginTop="8%">
                    {registerError && <Text style={styles.textBold}>{registerErrorMessage}</Text>}
                    <CustomButton
                        text="SIGN UP"
                        clickHandler={registerUser}
                    />
                    <Text style={styles.text} onPress={handleSignInPress}>
                        Already have an account?{" "}
                        <Text style={styles.textBold}>Sign In</Text>
                    </Text>
                </Center>
            </VStack>
        </KeyboardAwareScrollView>
    );
};

export default Register;
