import {
  TouchableOpacity,
  Text,
  StyleSheet,
  type TouchableOpacityProps,
} from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export type ThemedButtonProps = TouchableOpacityProps & {
  type?: TButtonType;
  text: string;
  action?: () => void;
  textStyle?: object;
};

type TButtonType = "primary" | "link";

export function ThemedButton({
  type = "primary",
  text,
  action,
  textStyle,
  style,
  ...rest
}: ThemedButtonProps) {
  const theme = useColorScheme() ?? "light";
  const isLight = theme === "light";

  const getButtonType = (type: TButtonType) => {
    const buttons = {
      primary: () => {
        return {
          backgroundColor: isLight
            ? Colors.light.background500
            : Colors.dark.accent500,
          color: isLight ? Colors.light.text500 : Colors.dark.text500,
        };
      },
      link: () => {
        return {
          backgroundColor: "transparent",
          color: isLight ? Colors.light.text500 : Colors.dark.text500,
        };
      },
    };

    return buttons[type]();
  };

  return (
    <TouchableOpacity
      style={[
        styles.commonButton,
        { backgroundColor: getButtonType(type).backgroundColor },
        style,
      ]}
      onPress={action}
      {...rest}
    >
      <Text
        style={[
          styles.commonText,
          { color: getButtonType(type).color },
          type === "link" && styles.linkText,
          textStyle,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  commonButton: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  commonText: {
    fontSize: 16,
    textAlign: "center",
  },
  linkText: {
    textDecorationLine: "underline",
  },
});
