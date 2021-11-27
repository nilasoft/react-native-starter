import React, { ReactElement } from 'react';
import { StyleProp, Text as RNText, TextStyle } from 'react-native';
import { useTheme } from '../../../core/theme/theme.hook';
import {tw} from 'react-native-tailwindcss';

export default function Text({
  title,
  color,
  size,
  style,
  onPress,
  numberOfLines
}: AppTextComponentProps): ReactElement {
  const { colors } = useTheme();
  return (
    <RNText
      onPress={onPress}
      style={[
          tw.flexWrap,
        {
          color: color ? color : colors.primary.default,
          fontSize: size ? size : 24
        },
        style
      ]}
      numberOfLines={numberOfLines}
    >
      {title}
    </RNText>
  );
}

interface AppTextComponentProps {
  title: string;

  color?: string;

  size?: number ;

  style?: StyleProp<TextStyle>;

  numberOfLines?: number;

  onPress?: () => void;
}
