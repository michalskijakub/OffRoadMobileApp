import {extendTheme} from "native-base";

import COLORS from "./constants/colors";

const customTheme = extendTheme({
    components: {
        Input: {
            sizes: {
                customLg: {
                    width: "80%",
                },
            },
            variants: {
                customInput: {
                    borderRadius: "full",
                    borderWidth: "1",
                    borderColor: COLORS["floral white"],
                    textAlign: "center",
                    _text: {
                        color: COLORS["floral white"],
                    },
                    _focus: {
                        borderColor: COLORS.blood,
                    },
                },
            },
        },
        Box: {
            sizes: {
                customSm: {
                    width: "14%",
                    height: "100%",
                },
            },
            variants: {
                roundedBox: {
                    position: "absolute",
                    borderRadius: 20,
                },
            },
        },
        Button: {
            sizes: {
                customLg: {
                    width: "80%",
                    height: 50,
                },
            },
            variants: {
                bloodyRound: {
                    backgroundColor: COLORS.blood,
                    borderRadius: "full",
                    shadowOffset: {width: 0, height: 4},
                    shadowColor: "rgba(0, 0, 0, 0.25)",
                    shadowRadius: 4,
                },
            },
        },
    },
});

export default customTheme;
