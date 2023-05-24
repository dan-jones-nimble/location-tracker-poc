import { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Button as RNButton,
  ButtonProps as RNButtonProps,
  StyleSheet
} from 'react-native';

export const Button = (props: RNButtonProps & { triggerWobble: boolean }) => {
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

  useEffect(() => {
    if (props.triggerWobble) wobble();
  }, [props]);

  return (
    <Animated.View style={styles(anim).animatedView}>
      <RNButton mode="contained" {...props} />
    </Animated.View>
  );
};

const styles = (anim) =>
  StyleSheet.create({
    animatedView: {
      transform: [{ translateX: anim.current }]
    }
  });
