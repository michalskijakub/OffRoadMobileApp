import React from "react";
import {Box, IconButton} from "native-base";
import {Dimensions, Image, Text} from "react-native";
import COLORS from "../../../constants/colors";
import Logo from "../../../../assets/logo/logo.png";
import IosStatusBarSpacer from "../../../components/common/IosStatusBarSpacer";

function calculateSize(component: "icon" | "name"): number {
    let width = Dimensions.get('window').width;
    if (component == "name") {
        if (width >= 800) return 45;
        if (width >= 600) return 40;
        if (width >= 450) return 35;
        if (width >= 375) return 30;
        return 24;
    }
    if (width >= 800) return 9;
    if (width >= 600) return 8;
    if (width >= 450) return 8;
    if (width >= 375) return 7;
    return 7;
}

type RibbonProps = {
    text?: string;
    icon?: JSX.Element | null;
    iconOnClick?: () => void;
};

const Ribbon = ({
                    text = "Off-road",
                    icon = null,
                    iconOnClick = () => {
                    }
                }
                    : RibbonProps) => {
    return (
        <>
            <IosStatusBarSpacer color={COLORS.blood}/>
            <Box style={{
                height: Dimensions.get('window').height * 60 / 568,
                backgroundColor: COLORS.blood,
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <Box style={{
                    marginLeft: 10,
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Image source={Logo} style={{
                        height: Dimensions.get('window').height * 36 / 568,
                        width: Dimensions.get('window').height * 36 / 568,
                    }}/>
                    <Text style={{
                        height: Dimensions.get('window').height * 42 / 568,
                        width: Dimensions.get('window').width * 194 / 320,
                        lineHeight: Dimensions.get('window').height * 42 / 568,
                        fontFamily: "Lato-Bold",
                        fontSize: calculateSize("name"),
                        marginLeft: 10,
                        color: COLORS["floral white"]
                    }}>
                        {text}
                    </Text>
                </Box>
                {
                    icon ? <IconButton
                        _icon={{
                            as: icon,
                            color: COLORS["floral white"],
                            size: calculateSize("icon"),
                            lineHeight: Dimensions.get('window').height * 31 / 568
                        }}
                        style={{
                            marginRight: 20,
                            height: "100%",
                        }}
                        width={Dimensions.get('window').height * 31 / 568}
                        onPress={iconOnClick}
                    /> : null
                }
            </Box>
        </>
    )
}

export default Ribbon;