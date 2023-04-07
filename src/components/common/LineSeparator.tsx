import {Box, Center} from "native-base";
import {Dimensions} from "react-native";
import COLORS from "../../constants/colors";

type LineSeparatorProps = {
    marginTop?: number,
    marginBottom?: number
}

const LineSeparator = ({marginTop = 0, marginBottom = 0}: LineSeparatorProps) => {
    return (
        <Center style={{
            width: "100%"
        }}>
            <Box style={{
                height: 1,
                borderWidth: 1,
                borderColor: COLORS["floral white"],
                borderRadius: 90,
                width: Dimensions.get('window').width * 120 / 320,
                backgroundColor: COLORS["floral white"],
                marginTop: marginTop,
                marginBottom: marginBottom,

            }}
            shadow={4}/>
        </Center>
    )
}

export default LineSeparator;