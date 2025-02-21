/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

type LightColorValues = (typeof Colors.light)[keyof typeof Colors.light];
type DarkColorValues = (typeof Colors.dark)[keyof typeof Colors.dark];

const tintColorLight = "#E95C3F";
const tintColorDark = "#fff";

const Colors = {
  base: {
    darkBlue100: "#0D121C",
    darkBlue300: "#1A2338",
    darkBlue500: "#24314E",
    white500: "#FFF",
    silver500: "#BDC2BF",
    silver300: "#AAB1AD",
    green500: "#0B6E4F",
    pink500: "#8B687F",
    orange500: "#E95C3F",
  },
  light: {
    text500: "#24314E",
    text300: "#1A233",
    background100: "#FFFFFF",
    background300: "#FFFFFF",
    background500: "#FFFFFF",
    border: "#24314E",
    accent500: "#E95C3F",
    error500: "#D8315B",
    tint: tintColorLight,
    icon: "#24314E",
    tabIconDefault: "#24314E",
    tabIconSelected: tintColorLight,
    modalBackground: "#F3EFE9",
  },
  dark: {
    text500: "#BDC2BF",
    text300: "#AAB1AD",
    background100: "#0D121C",
    background300: "#1A2338",
    background500: "#24314E",
    border: "#AAB1AD",
    accent500: "#0B6E4F",
    error500: "#D8315B",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    modalBackground: "#F3EFE9",
  },
};

export { Colors, LightColorValues, DarkColorValues };
