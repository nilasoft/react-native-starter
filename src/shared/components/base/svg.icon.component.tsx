import React, {PropsWithChildren, ReactElement} from 'react';
import {GestureResponderEvent, StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {useTheme} from '../../../core/theme/theme.hook';

export default function SvgIcon(
  props: PropsWithChildren<AppSvgIconProps>
): ReactElement {
  const {colors} = useTheme();

  function RenderChildren({style}: { style?: StyleProp<ViewStyle> }): ReactElement {
    return (
      <View style={style}>
        {React.cloneElement(props.children, {
          fill: props.color ? props.color : colors.grayscale.active,
          width: props.width ? props.width : 24,
          height: props.height ? props.height : 24
        })}
      </View>
    );
  }

  return (
    <>
      {typeof props.onPress === 'function' ? (
        <View style={props.containerStyle}>
          <TouchableOpacity onPress={props.onPress} disabled={props.disabled} activeOpacity={0.6}>
            <RenderChildren style={props.style}/>
          </TouchableOpacity>
        </View>
      ) : (
        <RenderChildren style={props.containerStyle}/>
      )}
    </>
  );
}

interface AppSvgIconProps {
  children: any;
  width?: number;
  height?: number;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}
