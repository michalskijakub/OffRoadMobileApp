import { Box, Button } from "native-base";
import { Dimensions, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from "../../../constants/colors";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

type HelpingUserCardProps = {
  username: string;
  backIconClickHandler: () => void;
  mapIconClickHandler: () => void;
};

const HelpingUserCard = ({
  username,
  backIconClickHandler,
  mapIconClickHandler,
}: HelpingUserCardProps) => {
  return (
    <Box
      style={{
        width: "80%",
        marginTop: 20,
        height: (Dimensions.get("window").height * 32) / 568,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Box
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          size={(Dimensions.get("window").height * 32) / 568}
          variant={"unstyled"}
          onPress={backIconClickHandler}
        >
          <Ionicons
            name="ios-arrow-back-circle"
            size={(Dimensions.get("window").height * 32) / 568}
            color={COLORS["floral white"]}
          />
        </Button>
        <Box
          style={{
            height: (Dimensions.get("window").height * 32) / 568,
            width: (Dimensions.get("window").width * 145) / 320,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Lato",
              color: COLORS["floral white"],
            }}
          >
            {username}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default HelpingUserCard;
