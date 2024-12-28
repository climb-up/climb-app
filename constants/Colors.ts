/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#E95C3F";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#24314E",
    contrastText: "#FFF",
    background: "#FFF",
    secondaryBackground: "#F6F6F6",
    tint: tintColorLight,
    icon: "#24314E",
    tabIconDefault: "#24314E",
    tabIconSelected: tintColorLight,
    border: "#24314E",
    modalBackground: "#F3EFE9",
  },
  dark: {
    text: "#ECEDEE",
    contrastText: "#DDD",
    background: "#151718",
    secondaryBackground: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    border: tintColorDark,
    modalBackground: "#F3EFE9",
  },
};
