import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

function calculateFontSize(
  labelType: "header" | "paragraph" = "paragraph"
): number {
  if (labelType == "header") {
    let width = Dimensions.get("window").width;
    if (width >= 755) return 18;
    if (width >= 705) return 17;
    if (width >= 615) return 16;
    if (width >= 525) return 15;
    if (width >= 490) return 14;
    if (width >= 430) return 13;
    return 12;
  }
  let height = Dimensions.get("window").height;
  if (height >= 1300) return 20;
  if (height >= 1200) return 19;
  if (height >= 1100) return 18;
  if (height >= 1000) return 17;
  if (height >= 890) return 16;
  if (height >= 800) return 15;
  return 14;
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
  },
  topSection: {
    height: (Dimensions.get("window").height * 250) / 568,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  middleSection: {
    flexDirection: "row",
    justifyContent: "center",
    height: (Dimensions.get("window").height * 60) / 568,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "center",
    flexGrow: 1,
  },
  lineSeparatorPosition: {
    position: "absolute",
    bottom: 5,
  },
  cardsSection: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  bottomCardText: {
    fontFamily: "Lato",
    color: COLORS["floral white"],
    fontSize: calculateFontSize(),
    marginLeft: 10,
    marginRight: 60,
  },
  bottomCardText2: {
    fontFamily: "Lato",
    color: COLORS["floral white"],
    fontSize: calculateFontSize(),
    marginLeft: 50,
  },
  bottomCard: {
    marginTop: 5,
    width: "90%",
    height: (Dimensions.get("window").height * 40) / 568,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  shareButtonPosition: {
    position: "absolute",
    bottom: 5,
  },
  map: {
    width: "80%",
    height: "80%",
  },
});

export default styles;
