import {useState} from "react";
import {Image, Text, View} from "react-native";
import {Center, VStack} from "native-base";
import {Foundation} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../navigation/AppNavigation";
import {getAuth} from "firebase/auth";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import Logo from "../../../assets/logo/logoMockWhite.png";
import COLORS from "../../constants/colors";
import styles from "./styles/FirstLogin.styles";
import { addUserData } from "../../utils/firestore";
import { doc, getDoc} from "firebase/firestore";
import {dbFirestore} from "../../../firebaseConfig";
import { waitFor } from "@testing-library/react-native";
import firestore from '@react-native-firebase/firestore';



type FirstLoginPhone = NativeStackNavigationProp<RootStackParamList>;

const FirstLoginPhone = () => {
    const [connectionTimeout, setConnectionTimeout] = useState(false);
    const [userPhone, setPhone] = useState("");
    const auth = getAuth();
    const userEmail = auth.currentUser?.email;

    const navigation = useNavigation<FirstLoginPhone>();

    const handleContinue = async() => {
        setConnectionTimeout(false);
        //update address in firebase based on user email
        if (userPhone != "" && userEmail != null) {
            let rejectTimeout: number | null = setTimeout(() => {
              setConnectionTimeout(true);
              clearTimeout(rejectTimeout!);
              rejectTimeout = null;
            }, 5000);

            //update address in firebase
            firestore()
                .collection('UsersData')
                .doc(userEmail) 
                .update({
                    phone: userPhone,
                })
                .then(() => {
                    if (rejectTimeout) {
                      clearTimeout(rejectTimeout!);
                      rejectTimeout = null;
                      console.log('User updated!');
                    }
                });

        }
        
    };

    

    const handlePhoneChange = (text: string) => {
        setPhone(text);
    };


    return (
        <View style={styles.container}>
            <VStack>
                <Center marginTop="30%">
                    <Image source={Logo} style={styles.logo}/>
                    <Text style={styles.headerText}>Off-road</Text>
                    <Text style={styles.headerText2}>PHONE NUMBER</Text>
                    <Text style={styles.textInformation}>Text for phone number reason here</Text>
                </Center>
                <Center marginTop="15%">
                    <CustomInput
                        state={userPhone}
                        setState={handlePhoneChange}
                        placeholder="Phone number"
                        icon={<Foundation name="key" color={COLORS.blood}/>}
                        isContentInvalid={false}
                    />
                </Center>
                <Center marginTop="10%">
                    {connectionTimeout && <Text style={styles.text}>There was a network problem. Please try again.</Text>}
                    <CustomButton
                        text="CONTINUE"
                        clickHandler={handleContinue}
                    />
                </Center>
            </VStack>
        </View>
    );
};

export default FirstLoginPhone;
