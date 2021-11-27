import React, {PropsWithChildren, ReactElement, useEffect} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {StyleProp, View, ViewStyle} from 'react-native';
import {AsyncState} from '../../../core/state/state.model';
import {tw} from 'react-native-tailwindcss';
import {useFlag} from '../../../core/flag/flag.hook';
import * as _ from 'lodash';

export default function LoadingComponent(props: PropsWithChildren<LoadingComponentProps>
): ReactElement {

  const loading = useFlag(true);

  useEffect(() => {
    if (isLoaded()) loading.down();
    else loading.up();
  }, props.state);

  function isLoaded(): boolean {
    return _.every(props.state, (state) => state.status !== 'request');
  }

  return (
    <View style={[tw.flexGrow, tw.justifyCenter, props.style]}>
      {loading.state ? <ActivityIndicator style={[tw.flexGrow, tw.justifyCenter]}/> : props.children}
    </View>
  );
}

interface LoadingComponentProps {
  state: AsyncState<any>[];
  style?: StyleProp<ViewStyle>;
}
