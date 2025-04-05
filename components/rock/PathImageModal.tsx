import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, LayoutChangeEvent } from "react-native";
import { Modalize } from "react-native-modalize";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type PathImageModalProps = {
  imageUrl: string | null;
  modalRef: React.RefObject<Modalize>;
  offsetTop: number;
};

const PathImageModal = ({
  imageUrl,
  modalRef,
  offsetTop,
}: PathImageModalProps) => {
  const [imageDiamensions, setImageDiamensions] = useState({
    width: 0,
    height: 0,
  });
  const theme = useColorScheme() ?? "light";
  const isLight = theme === "light";

  const screenHeight = Dimensions.get("window").height;
  const insets = useSafeAreaInsets();
  const bottomSaveArea = insets.bottom;
  const topSaveAreaHeight = insets.top;

  const modalHeight =
    screenHeight - offsetTop - bottomSaveArea - topSaveAreaHeight;

  const getImageDiamensionsHandler = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setImageDiamensions({ width, height });
  };

  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.max(1, e.scale);
      focalX.value = e.focalX;
      focalY.value = e.focalY;
    })
    .onEnd(() => {
      scale.value = withTiming(1);
    });

  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);

  const scaleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -imageDiamensions.width / 2 },
        { translateY: -imageDiamensions.height / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: imageDiamensions.width / 2 },
        { translateY: imageDiamensions.height / 2 },
      ],
    };
  });

  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: position.value }],
    };
  });

  return (
    <Modalize
      ref={modalRef}
      modalTopOffset={offsetTop}
      adjustToContentHeight={false}
      scrollViewProps={{ scrollEnabled: false }}
      modalStyle={{
        ...styles.modal,
        backgroundColor: isLight
          ? Colors.light.background500
          : Colors.dark.background100,
      }}
    >
      <View style={[styles.imageContainer, { height: modalHeight }]}>
        <GestureDetector gesture={pinchGesture}>
          <Animated.Image
            source={{ uri: imageUrl ?? "" }}
            style={[styles.image, scaleStyle, panStyle]}
            onLayout={getImageDiamensionsHandler}
          />
        </GestureDetector>
      </View>
    </Modalize>
  );
};

export default PathImageModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 12,
  },
  imageContainer: {
    width: "100%",
    borderRadius: 8,
  },
  image: {
    borderRadius: 8,
    flex: 1,
  },
});
