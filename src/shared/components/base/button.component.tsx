import React, {ReactElement, ReactNode, useMemo} from 'react';
import {tw} from 'react-native-tailwindcss';
import {ActivityIndicator, Surface, TouchableRipple} from 'react-native-paper';
import { StyleProp, StyleSheet, Text as RNText, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import {useOpacity, useTheme} from '../../../core/theme/theme.hook';
import Text from './text.component';
import {useTranslation} from 'react-i18next';

export default function Button({
                                             title,
                                             mode = 'contained',
                                             size = 'long',
                                             color,
                                             onPress,
                                             loading,
                                             disabled,
                                             style,
                                             labelStyle,
                                             contentStyle,
                                             rightIcon
                                           }: AppButtonComponentProps): ReactElement {
  const {t} = useTranslation();
  const {radius, colors, fonts, elevations} = useTheme();
  const disableColor = useOpacity(colors.primary.default, 0.5);
  const textModeDisableColor = useOpacity(colors.grayscale.active, 0.5);
  const styles = useMemo(() => {
    const buttonStyles = StyleSheet.create({
      surface: {
        overflow: 'hidden',
        alignSelf: 'center',
        backgroundColor:
          mode === 'contained'
            ? disabled
            ? disableColor
            : colors.primary.default
            : colors.grayscale.bg,
        borderRadius: radius,
        borderWidth: mode === 'outlined' ? 1 : 0,
        borderColor: disabled ? colors.grayscale.medium_emphasis : colors.grayscale.active,
        height: 42,
        marginVertical: 2
        // minWidth: 90
      },
      title: {
        color:
          mode === 'contained'
            ? colors.grayscale.bg :
            mode === 'outlined' ? colors.grayscale.active
              : disabled
              ? colors.primary.light
              : colors.primary.default

      }
    });
    switch (size) {
      case 'long':
        return StyleSheet.create({
          ...buttonStyles,
          surface: {
            width: '100%',
            ...buttonStyles.surface
          }
        });
      case 'medium':
        return StyleSheet.create({
          ...buttonStyles,
          surface: {
            width: '50%',
            ...buttonStyles.surface
          }
        });
      case 'small':
        return StyleSheet.create({
          ...buttonStyles,
          surface: {
            width: '25%',
            ...buttonStyles.surface
          }
        });
    }
  }, [size, mode, disabled]);
  if (mode === 'text') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          tw.flexRow,
          tw.justifyStart,
          tw.itemsCenter,
          {
            height: 42
          },
          style
        ]}
      >
        <Text
          style={[fonts.Button]}
          color={
            disabled ? textModeDisableColor : color ? color : colors.grayscale.active
          }
          title={
            loading
              ? `${t('shared.loading').toUpperCase()} ...`
              : title.toUpperCase()
          }
        />

        {rightIcon && (
          <View
            style={[tw.mS2, tw.justifyCenter, tw.itemsCenter, {maxWidth: 32}]}
          >
            {rightIcon}
          </View>
        )}
      </TouchableOpacity>
    );
  }
  return (
    <Surface style={[styles.surface, style]}>
      <TouchableRipple onPress={onPress} disabled={disabled}>
        <View
          style={[
            tw.hFull,
            tw.flexRow,
            tw.justifyCenter,
            tw.itemsCenter,
            contentStyle
          ]}
        >
          {loading ? (
            <ActivityIndicator color={colors.grayscale.bg} size={'small'}/>
          ) : (
            <RNText style={[styles.title, fonts.Button, labelStyle]}>
              {title.toUpperCase()}
            </RNText>
          )}
          {rightIcon && (
            <View style={[tw.w8, tw.justifyCenter, tw.itemsCenter]}>
              {rightIcon}
            </View>
          )}
        </View>
      </TouchableRipple>
    </Surface>
  );
}

export interface AppButtonComponentProps {
  title: string;

  mode?: 'text' | 'outlined' | 'contained';

  size?: 'small' | 'medium' | 'long';

  onPress: () => void;

  loading?: boolean;

  disabled?: boolean;

  color?: string;

  style?: StyleProp<ViewStyle>;

  contentStyle?: StyleProp<ViewStyle>;

  labelStyle?: StyleProp<TextStyle>;

  rightIcon?: ReactNode;
}
