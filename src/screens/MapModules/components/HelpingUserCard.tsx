import { Box, Button } from "native-base";
import { Dimensions, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from "../../../constants/colors";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type HelpingUserCardProps = {
  username: string;
  contactClickHandler: () => void;
  localizationClickHandler: () => void;
};

const HelpingUserCard = ({
  username,
  contactClickHandler,
  localizationClickHandler,
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
        <MaterialIcons
          name="account-circle"
          size={(Dimensions.get("window").height * 32) / 568}
          color={COLORS["floral white"]}
          style={{
            marginRight: 5,
          }}
        />
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
      <Box
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          size={(Dimensions.get("window").height * 32) / 568}
          variant={"unstyled"}
          onPress={contactClickHandler}
        >
          <MaterialIcons
            name="contact-phone"
            size={(Dimensions.get("window").height * 32) / 568}
            color={COLORS["floral white"]}
          />
        </Button>
        <Button
          size={(Dimensions.get("window").height * 32) / 568}
          variant={"unstyled"}
          onPress={localizationClickHandler}
        >
          <MaterialCommunityIcons
            name="map-marker-account-outline"
            style={{
              marginLeft: 11,
            }}
            size={(Dimensions.get("window").height * 32) / 568}
            color={COLORS["floral white"]}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default HelpingUserCard;
