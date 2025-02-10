import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import images from "@/constants/Images";
import { Colors } from "@/constants/Colors";

const Welcome = () => {
  const router = useRouter();

  return (
    <View style={styles.welcomeContainer}>
      <ImageBackground
        source={images.splashScreen}
        style={styles.welcomeContainer}
      />
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          onPress={() => router.push("/(auth)/sign-in")}
          style={[styles.button, styles.buttonBackgroundDark]}
        >
          <Text style={[styles.buttonText, styles.buttonTextLight]}>
            Zaloguj się
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(auth)/sign-up")}
          style={[styles.button, styles.buttonBackgroundLight]}
        >
          <Text style={[styles.buttonText, styles.buttonTextDark]}>
            Zarejestruj się
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  welcomeContainer: {
    position: "relative",
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonsWrapper: {
    paddingHorizontal: 24,
    position: "absolute",
    bottom: 50,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  },
  button: {
    width: "auto",
    paddingBlock: 16,
    paddingHorizontal: 4,
    display: "flex",
    alignItems: "center",
    borderRadius: 24,
    borderWidth: 2,
  },
  buttonBackgroundLight: {
    backgroundColor: Colors.base.white500,
    borderColor: Colors.base.darkBlue500,
  },
  buttonBackgroundDark: {
    backgroundColor: Colors.base.darkBlue500,
    borderColor: Colors.base.darkBlue500,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 600,
  },
  buttonTextDark: {
    color: Colors.base.darkBlue500,
  },
  buttonTextLight: {
    color: Colors.base.white500,
  },
});
