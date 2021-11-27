import Constants from 'expo-constants';
import {hideAsync} from 'expo-splash-screen';
import React, {ReactElement} from 'react';
import {Animated, Easing} from 'react-native';
import {tw} from 'react-native-tailwindcss';
import {useAnimated} from '../../core/animated/animated.hook';
import assets from '../../core/common/assets';
import {useAsset} from '../../core/common/hooks';
import {useFlag} from '../../core/flag/flag.hook';
import UpdateComponent from '../../core/update/update.component';

export default function SplashComponent(): ReactElement {

  const finished = useFlag();
  const splash = useAsset(assets.splash);
  const animated = useAnimated(() => ({
    initial: 1,
    animation: {
      default: {
        toValue: 0,
        duration: 800,
        easing: Easing.inOut(Easing.cubic)
      }
    },
    interpolation: {
      rotate: {
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg']
      }
    }
  }));

  async function onLoaded(): Promise<void> {
    if (!__DEV__)
      await hideAsync();
    animated.default.start(finished.up);
  }

  if (finished.state)
    return <UpdateComponent/>;

  return (
    <Animated.View style={[tw.absolute, tw.inset0, {
      backgroundColor: '#ffffff',
      opacity: animated.value
    }]}>
      {splash && (
        <Animated.Image source={splash}
                        style={[tw.wFull, tw.hFull, {
                          resizeMode: 'contain',
                          transform: [
                            {scale: animated.value},
                            {rotate: animated.rotate}
                          ]
                        }]}
                        onLoadEnd={onLoaded}
                        fadeDuration={0}/>
      )}
    </Animated.View>
  );

}
