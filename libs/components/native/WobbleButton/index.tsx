import { useCallback, useRef } from 'react';
import { Animated, Button, ButtonProps, StyleSheet } from 'react-native';

export const WobbleButton = (props: ButtonProps) => {
  const anim = useRef(new Animated.Value(0));

  const wobble = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim.current, {
          useNativeDriver: true,
          toValue: -2,
          duration: 50
        }),
        Animated.timing(anim.current, {
          useNativeDriver: true,
          toValue: 2,
          duration: 50
        }),
        Animated.timing(anim.current, {
          useNativeDriver: true,
          toValue: 0,
          duration: 50
        })
      ]),
      { iterations: 2 }
    ).start();
  }, []);

  const handlePress = async (e) => {
    const response = props.onPress(e);
    if (response) {
      wobble();
    }
  };

  return (
    <Animated.View style={styles(anim).animatedView}>
      <Button mode="contained" {...props} onPress={handlePress} />
    </Animated.View>
  );
};

const styles = (anim) =>
  StyleSheet.create({
    animatedView: {
      transform: [{ translateX: anim.current }]
    }
  });
