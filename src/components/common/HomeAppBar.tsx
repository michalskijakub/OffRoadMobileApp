import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  StatusBar,
  Text,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import logo from "../../../assets/logo/logoMockWhite.png";
import COLORS from "../../constants/colors";

type HomeAppBarProp = NativeStackNavigationProp<RootStackParamList>;

type CustomHomeAppBarProps = {
  text: string;
  showHomeIcon?: boolean;
};

export default function HomeAppBar({
  text = "Off-road",
  showHomeIcon = true,
}: CustomHomeAppBarProps) {
  const navigation = useNavigation<HomeAppBarProp>();
  const handleHomePress = () => {
    navigation.navigate("MainScreen");
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Box safeAreaTop bg={COLORS.blood} />
      <HStack
        bg={COLORS.blood}
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <HStack alignItems="center">
          <Image source={logo} size="xs" alt="Logo" marginLeft={2} />
          <Text color="white" fontSize="24" fontWeight="bold" marginLeft={4}>
            {text}
          </Text>
        </HStack>
        {showHomeIcon ? (
          <HStack>
            <IconButton
              icon={<Icon as={Entypo} name="home" size="xl" color="white" />}
              onPress={handleHomePress}
            />
          </HStack>
        ) : null}
      </HStack>
    </>
  );
}
