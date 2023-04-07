import { View } from "react-native"
import { VStack, Center, Text } from "native-base";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp} from "@react-navigation/native-stack";

import AppBar from "../../components/common/AppBar";
import COLORS from "../../constants/colors";
import CustomButton from "../../components/common/CustomButton";
import { RootStackParamList } from "../../navigation/AppNavigation";

type HelpNeededProp = NativeStackNavigationProp<RootStackParamList>;

const HelpNeeded = () => {
  const route = useRoute<RouteProp<RootStackParamList, "HelpNeeded">>();
  const navigation = useNavigation<HelpNeededProp>();

  return (
    <View>
      <AppBar />
      <Center>
        <VStack mt="20%">
          <Text textAlign="center" fontSize="3xl" color={COLORS.white} fontWeight="bold">🚨 Help wanted 🚨</Text>
          <Text textAlign="center" color={COLORS.white} mt="5%" fontSize="md">It's your time to shine!</Text>
          <Text textAlign="center" color={COLORS.white} mt="2%" fontWeight="bold" fontSize="md">{route.params.username}</Text>
          <Text textAlign="center" color={COLORS.white} mt="2%" fontSize="md">is in need of your assistance.</Text>
          <Text textAlign="center" color={COLORS.white} fontSize="md">Sign in to your account and go to</Text>
          <Text textAlign="center" color={COLORS.white} fontSize="md">"Take a look at the map"</Text>
          <Text textAlign="center" color={COLORS.white} fontSize="md">To find this user and help him</Text>
          <Text textAlign="center" color={COLORS.white} fontSize="md">get back on track.</Text>
          <Text textAlign="center" color={COLORS.white} fontSize="md" mb="20%">Your help is much appreciated</Text>
          <CustomButton text="SIGN IN" clickHandler={() => navigation.navigate("Login")} />
        </VStack>
      </Center>
    </View>
  )
}

export default HelpNeeded