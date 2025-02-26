import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useForm } from "@tanstack/react-form";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import FormField from "../FormField";
import { ThemedButton } from "../ThemedButton";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { signInSchema, signUpSchema } from "./AuthForm.validation";
import { TAuthFormProps, TFormValues, EAuthTypes } from "./AuthForm.type";

const AuthForm = ({
  title,
  fields,
  primaryButton,
  secondaryButton,
  errorMessage,
}: TAuthFormProps) => {
  const form = useForm({
    defaultValues: fields.reduce((acc, field) => {
      return { ...acc, [field.name]: "" };
    }, {} as TFormValues),
    onSubmit: (values) => {
      primaryButton.onPress(values.value);
    },
    validators: {
      onSubmit: title === EAuthTypes.SIGNIN ? signInSchema : signUpSchema,
    },
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
          <form.Field name={fieldConfig.name as any} key={fieldConfig.name}>
            {(field) => (
              <>
                <FormField
                  label={fieldConfig.label}
                  value={field.state.value}
                  handleChangeText={field.handleChange}
                  placeholder={fieldConfig.placeholder}
                />
                {field.state.meta.errors?.length > 0 && (
                  <View>
                    <ThemedText
                      darkColor={Colors.dark.error500}
                      lightColor={Colors.light.error500}
                    >
                      {field.state.meta.errors.join(", ")}
                    </ThemedText>
                  </View>
                )}
              </>
            )}
          </form.Field>
        ))}
        {errorMessage && (
          <ThemedText
            darkColor={Colors.dark.error500}
            lightColor={Colors.light.error500}
          >
            {errorMessage}
          </ThemedText>
        )}
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
