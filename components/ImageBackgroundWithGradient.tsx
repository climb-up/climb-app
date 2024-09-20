import {
	ImageBackground,
	ImageSourcePropType,
	StyleSheet,
	View,
	type ViewStyle
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type ImageBackgroundWithGradientProps = {
	source: ImageSourcePropType;
	children?: React.ReactNode;
	innerStyle?: ViewStyle;
};

export function ImageBackgroundWithGradient(
	props: ImageBackgroundWithGradientProps
) {
	return (
		<ImageBackground
			source={props.source}
			resizeMode="cover"
			style={styles.image}
		>
			<LinearGradient
				colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
				style={styles.gradient}
			>
				<View style={{ width: "100%", height: "100%", ...props.innerStyle }}>
					{props.children}
				</View>
			</LinearGradient>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: "100%"
	},
	gradient: {
		width: "100%",
		height: "100%"
	}
});
