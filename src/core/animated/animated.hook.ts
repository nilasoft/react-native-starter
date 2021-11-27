import _ from 'lodash';
import {DependencyList, useMemo} from 'react';
import {Animated} from 'react-native';
import {AnimatedHookInput, AnimatedHookOutput} from './animated.model';

/**
 * Helper hook for creating animations.
 */
export function useAnimated<A extends 'default' | string, I extends string>(
  options: () => AnimatedHookInput<A, I>,
  deps?: DependencyList
): AnimatedHookOutput<A, I> {
  return useMemo(() => {
    let input = options();
    let value = new Animated.Value(input.initial);
    let animation = _.mapValues(input.animation, config => {
      let cfg = _.assign({useNativeDriver: true}, input.defaults, config);
      switch (cfg.type) {
        case 'spring':
          return Animated.spring(value, cfg as Animated.SpringAnimationConfig);
        default:
          return Animated.timing(value, cfg as Animated.TimingAnimationConfig);
      }
    });
    let interpolation = _.mapValues(input.interpolation, config => value.interpolate(config));
    return _.assign({value}, animation, interpolation);
  }, deps || []);
}
