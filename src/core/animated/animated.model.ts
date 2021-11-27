import {Animated} from 'react-native';

export type AnimatedHookInput<A extends string, I extends string> = {
  initial: number;
  defaults?: Partial<AnimatedHookAnimation>;
  animation: Record<A, AnimatedHookAnimation>;
  interpolation?: Record<I, Animated.InterpolationConfigType>;
};

export type AnimatedHookAnimation =
  | { type?: 'timing'; } & Omit<Animated.TimingAnimationConfig, 'useNativeDriver'>
  | { type?: 'spring'; } & Omit<Animated.SpringAnimationConfig, 'useNativeDriver'>
  & { useNativeDriver?: boolean; };

export type AnimatedHookOutput<A extends string, I extends string> =
  & { value: Animated.Value; }
  & Record<A, Animated.CompositeAnimation>
  & Record<I, Animated.AnimatedInterpolation>;
