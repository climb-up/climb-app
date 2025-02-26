import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import icons from "../constants/Icons";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

interface FormFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  keyboardType?: string;
  otherStyles?: object;
}

const FormField = ({
  label,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const theme = useColorScheme() ?? "light";
  const isLight = theme === "light";
  const placeholderColor = Colors.base.silver300;

  return (
    <ThemedView style={[styles.container, otherStyles]}>
      <ThemedText style={styles.label} type="defaultSemiBold">
        {label}
      </ThemedText>
      <ThemedView style={[styles.inputContainer]} withBorder>
        <TextInput
          style={[
            styles.textInput,
            {
              color: isLight ? Colors.light.text500 : Colors.dark.text500,
            },
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          onChangeText={handleChangeText}
          secureTextEntry={label === "Hasło" && !showPassword}
        />
        {label === "Hasło" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "100%",
  },
  label: {
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default FormField;
