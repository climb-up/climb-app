import { Alert } from "react-native";
import { useRouter } from "expo-router";
import useUserStore from "@/context/userStore";
import { signOut } from "@/lib/appwrite";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";

export default function Account() {
  const router = useRouter();

  const { setUser, setIsLogged } = useUserStore();

  const signOutHandler = async () => {
    try {
      const response = await signOut();
      console.log(response);
      setUser(null);
      setIsLogged(false);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      router.push("/app/index");
    }
  };

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText>Edit app/account.tsx to edit this screen.</ThemedText>
      <ThemedButton text="Wyloguj się" action={signOutHandler}></ThemedButton>
    </ThemedView>
  );
}
