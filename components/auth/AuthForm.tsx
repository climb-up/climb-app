import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useForm } from "@tanstack/react-form";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import FormField from "../FormField";
import { ThemedButton } from "../ThemedButton";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { ThemedSafeView } from "../ThemedSafeView";

type TAuthFormProps = {
  title: string;
  fields: { name: string; label: string; placeholder: string; type?: string }[];
  primaryButton: { text: string; onPress: (values: any) => void };
  secondaryButton: { text: string; onPress: () => void };
};
const AuthForm: React.FC<TAuthFormProps> = ({
  title,
  fields,
  primaryButton,
  secondaryButton,
}) => {
  const form = useForm({
    defaultValues: fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {}),
    onSubmit: (values) => console.log(values),
  });

  const theme = useColorScheme() ?? "light";
  const isLight = theme === "light";

  return (
    <ThemedView style={styles.container}>
      <View style={styles.titleFormWrapper}>
        <ThemedText type="title" style={styles.title}>
          {title}
        </ThemedText>
        <View
          style={[
            styles.ornament,
            {
              backgroundColor: isLight
                ? Colors.light.accent500
                : Colors.dark.accent500,
            },
          ]}
        ></View>
        {fields.map((fieldConfig) => (
          <form.Field name={fieldConfig.name} key={fieldConfig.name}>
            {(field) => (
              //   {field.state.meta.errors ? (
              //     <Text>{field.state.meta.errors.join(", ")}</Text>
              //   ) : null}
              <FormField
                label={fieldConfig.label}
                value={field.state.value}
                handleChangeText={field.handleChange}
                placeholder={fieldConfig.placeholder}
              />
            )}
          </form.Field>
        ))}
      </View>
      <View style={styles.buttonsWrapper}>
        <ThemedButton
          text={primaryButton.text}
          style={styles.primaryButton}
          action={() => form.handleSubmit()}
        />
        <ThemedButton
          text={secondaryButton.text}
          type="link"
          action={secondaryButton.onPress}
        />
      </View>
    </ThemedView>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 65,
    paddingBottom: 45,
  },
  titleFormWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  title: { marginBottom: 16 },
  ornament: {
    width: 96,
    height: 4,
    marginTop: -12,
    marginBottom: 12,
  },
  buttonsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  primaryButton: {
    width: "100%",
  },
});
