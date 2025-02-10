import React from "react";
import { useRouter } from "expo-router";
import AuthForm from "@/components/auth/AuthForm";

const SignUp = () => {
  const router = useRouter();

  return (
    <AuthForm
      title="Zarejestruj się"
      fields={[
        { name: "name", label: "Imię", placeholder: "Podaj imię" },
        { name: "email", label: "Email", placeholder: "Podaj adress email" },
        {
          name: "password",
          label: "Hasło",
          placeholder: "Podaj hasło",
          type: "password",
        },
      ]}
      primaryButton={{
        text: "Stwórz konto",
        onPress: () => console.log("rejestracja"),
      }}
      secondaryButton={{
        text: "Masz już konto? Zaloguj się",
        onPress: () => router.push("/(auth)/sign-in"),
      }}
    />
  );
};

export default SignUp;
