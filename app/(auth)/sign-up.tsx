import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { createUser } from "@/lib/appwrite";
import useUserStore from "@/context/userStore";
import AuthForm from "@/components/auth/AuthForm";
import {
  EAuthTypes,
  TFormValues,
  EAuthErrorMessages,
} from "@/components/auth/AuthForm.type";

const SignUp = () => {
  const router = useRouter();

  const { setUser, setIsLogged } = useUserStore();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signUpHandler = async (values: TFormValues) => {
    if (!values.email || !values.password || !values.name) return;
    try {
      const response = await createUser(
        values.email,
        values.password,
        values.name
      );

      if (!response) {
        setErrorMessage(EAuthErrorMessages.SIGNUP);
        return;
      }

      setUser(response);
      setIsLogged(true);

      router.replace("/(tabs)/(explore)");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occured");
      }
    }
  };

  return (
    <AuthForm
      title={EAuthTypes.SIGNUP}
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
        onPress: signUpHandler,
      }}
      secondaryButton={{
        text: "Masz już konto? Zaloguj się",
        onPress: () => router.push("/(auth)/sign-in"),
      }}
      errorMessage={errorMessage}
    />
  );
};

export default SignUp;
