import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

function calculateFontSize(
  labelType: "header" | "paragraph" = "paragraph"
): number {
  let width = Dimensions.get("window").width;
  if (labelType == "header") {
    if (width >= 800) return 50;
    if (width >= 600) return 45;
    if (width >= 450) return 40;
    if (width >= 375) return 35;
    return 30;
  }
  if (width >= 800) return 22;
  if (width >= 600) return 19;
  if (width >= 450) return 17;
  if (width >= 375) return 15;
  return 13;
}

const styles = StyleSheet.create({
  infoIcon: {
    color: COLORS.blood,
    height: Dimensions.get("window").height * 0.2799,
    width: Dimensions.get("window").height * 0.2799,
    marginTop: Dimensions.get("window").height * 0.05,
  },
  infoHeader: {
    fontSize: calculateFontSize("header"),
    alignItems: "center",
    fontFamily: "Lato-Bold",
    marginTop: 10,
    marginBottom: 10,
    color: COLORS["floral white"],
  },
  paragraph: {
    fontFamily: "Lato",
    fontSize: calculateFontSize(),
    width: (Dimensions.get("window").width * 273) / 320,
    maxWidth: 700,
    textAlign: "center",
    color: COLORS["floral white"],
  },
  wrapper: {
    height: Dimensions.get("window").height,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default styles;
