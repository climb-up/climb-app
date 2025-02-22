import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { signIn, getCurrentUser } from "@/lib/appwrite";
import useUserStore from "@/context/userStore";
import AuthForm from "@/components/auth/AuthForm";
import {
  EAuthTypes,
  TSignInValues,
  EAuthErrorMessages,
} from "@/components/auth/AuthForm.type";

const SignIn = () => {
  const router = useRouter();

  const { setUser, setIsLogged } = useUserStore();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signInHandler = async (values: TSignInValues) => {
    setErrorMessage(null);

    try {
      await signIn(values.email, values.password);

      const response = await getCurrentUser();

      if (!response) {
        setErrorMessage(EAuthErrorMessages.SIGNIN);
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
      title={EAuthTypes.SIGNIN}
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
        onPress: signInHandler,
      }}
      secondaryButton={{
        text: "Nie masz konta? Zarejestruj się",
        onPress: () => router.push("/(auth)/sign-up"),
      }}
      errorMessage={errorMessage}
    />
  );
};

export default SignIn;
