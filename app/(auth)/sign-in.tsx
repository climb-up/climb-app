import React from "react";
import { useRouter } from "expo-router";
import AuthForm from "@/components/auth/AuthForm";

const SignIn = () => {
  const router = useRouter();

  return (
    <AuthForm
      title="Zaloguj się"
      fields={[
        { name: "email", label: "Email", placeholder: "Podaj adress email" },
        {
          name: "password",
          label: "Hasło",
          placeholder: "Podaj hasło",
          type: "password",
        },
      ]}
      primaryButton={{
        text: "Zaloguj się",
        onPress: () => console.log("logowanie"),
      }}
      secondaryButton={{
        text: "Nie masz konta? Zarejestruj się",
        onPress: () => router.push("/(auth)/sign-up"),
      }}
    />
  );
};

export default SignIn;
