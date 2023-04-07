import {Platform} from "react-native";
import {Box} from "native-base";
import Constants from "expo-constants";
import React from "react";

type IosStatusBarSpacerProps = {
    color: string;
}

const IosStatusBarSpacer = ({color}: IosStatusBarSpacerProps) => { // TODO: check if on android you also need this spacer
    return (
        Platform.OS == "ios" ? <Box style={{
            height: Constants.statusBarHeight,
            backgroundColor: color
        }}/> : null
    )
}

export default IosStatusBarSpacer;
