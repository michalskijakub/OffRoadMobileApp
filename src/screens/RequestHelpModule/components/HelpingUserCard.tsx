import {Box, Button} from "native-base";
import {Dimensions, Text} from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
import COLORS from "../../../constants/colors";
import React from "react";

type HelpingUserCardProps = {
    username: string;
    phoneIconClickHandler: () => void;
    cancelIconClickHandler: () => void;
};

const HelpingUserCard = ({username, phoneIconClickHandler, cancelIconClickHandler}: HelpingUserCardProps) => {
    return (
        <Box style={{
            width: "80%",
            marginTop: 20,
            height: Dimensions.get('window').height * 32 / 568,
            flexDirection: "row",
            justifyContent: "space-between",
        }}>
            <Box style={{
                flexDirection: "row",
                justifyContent: "flex-end"
            }}>
                <MaterialIcons name="account-circle" size={Dimensions.get('window').height * 32 / 568}
                               color={COLORS["floral white"]}
                               style={{
                                   marginRight: 5
                               }}
                />
                <Box style={{
                    height: Dimensions.get('window').height * 32 / 568,
                    width: Dimensions.get('window').width * 145 / 320,
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontFamily: "Lato",
                        color: COLORS["floral white"],
                    }}>{username}</Text>
                </Box>
            </Box>
            <Box style={{
                flexDirection: "row",
                justifyContent: "flex-end"
            }}>
                <Button size={Dimensions.get('window').height * 32 / 568} variant={"unstyled"} onPress={phoneIconClickHandler}>
                    <MaterialIcons name="phone" size={Dimensions.get('window').height * 32 / 568}
                                   color={COLORS["floral white"]}/>
                </Button>
                <Button size={Dimensions.get('window').height * 32 / 568} variant={"unstyled"} onPress={cancelIconClickHandler}>
                    <MaterialIcons name="cancel"
                                   style={{
                                       marginLeft: 11
                                   }}
                                   size={Dimensions.get('window').height * 32 / 568}
                                   color={COLORS.blood}/>
                </Button>
            </Box>
        </Box>
    );
}

export default HelpingUserCard;