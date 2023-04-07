import React from "react";
import {Box, Center, FormControl, Icon, Input, WarningOutlineIcon, Text} from "native-base";
import {Dimensions} from "react-native";

import COLORS from "../../constants/colors";

type CustomInputProps = {
    state: string;
    setState: (text: string) => void;
    placeholder: string;
    icon: JSX.Element;
    margin?: number;
    type?: "text" | "password";
    isContentInvalid: boolean;
    errorMessage?: string;
    outsideClick?: () => void;
};

const CustomInput = ({
                         state,
                         setState,
                         placeholder,
                         icon,
                         type = "text",
                         margin = 18,
                         isContentInvalid,
                         errorMessage,
                         outsideClick
                     }: CustomInputProps) => {
    return (
        <Box>
            <FormControl isInvalid={isContentInvalid} color={COLORS.blood}>
                <Box
                    bgColor={COLORS["gamboge orange"]}
                    width={Dimensions.get('window').width * 252 / 320}
                    height={Dimensions.get('window').height * 42 / 568}
                    maxWidth={400}
                    maxHeight={100}
                    borderRadius={90}
                    borderColor={COLORS["floral white"]}
                    borderWidth={1}
                    shadow={5}
                    marginTop={margin}
                    marginBottom={margin}
                >
                    <Box
                        bgColor={COLORS["floral white"]}
                        position={"absolute"}
                        left={0}
                        height={Dimensions.get('window').height * 41 / 568}
                        width={Dimensions.get('window').height * 40.5 / 568}
                        maxWidth={100}
                        maxHeight={100}
                        borderColor={COLORS["floral white"]}
                        variant="roundedBox"
                        borderRadius={90}
                        flexDirection={"row"}
                        justifyContent={"center"}
                    >
                        <Center>
                            <Icon
                                as={icon}
                                height={Dimensions.get('window').height * 16 / 568}
                                width={Dimensions.get('window').height * 16 / 568}
                                color={COLORS.blood}
                            />
                        </Center>
                    </Box>
                    <Center>
                        <Input
                            marginTop={"auto"}
                            marginBottom={"auto"}
                            variant="customInput"
                            placeholderTextColor={COLORS["floral white"]}
                            placeholder={placeholder}
                            width={Dimensions.get('window').width * 151 / 320}
                            height={Dimensions.get('window').height * 42 / 568}
                            maxWidth={400 * 3 / 5}
                            maxHeight={100}
                            color={COLORS["floral white"]}
                            borderWidth={0}
                            onSubmitEditing={outsideClick}
                            onBlur={outsideClick}
                            borderRadius={0}
                            fontSize={14}
                            type={type}
                            style={{fontFamily: "Lato"}}
                            value={state}
                            onChangeText={(text: string) => setState(text)}
                        />
                    </Center>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" color={COLORS.blood} />}>
                      <Text style={{ color: COLORS.blood }}>{errorMessage}</Text>
                    </FormControl.ErrorMessage>
                </Box>
            </FormControl>
        </Box>
    );
};

export default CustomInput;
