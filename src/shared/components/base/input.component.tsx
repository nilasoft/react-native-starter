import React, {PropsWithChildren, ReactElement, ReactNode, useEffect, useState} from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInputFocusEventData, TextInputKeyPressEventData, TextInputSubmitEditingEventData,
  View,
  ViewStyle
} from 'react-native';
import {TextInput} from 'react-native-paper';
import SvgIcon from './svg.icon.component';
import VisibleIcon from '../../../assets/icon/show-fill.svg';
import VisibleOffIcon from '../../../assets/icon/hide-fill.svg';
import {AsyncState} from '../../../core/state/state.model';
import {tw} from 'react-native-tailwindcss';
import {useOpacity, useTheme} from '../../../core/theme/theme.hook';
import CloseIcon from '../../../assets/icon/close-fill.svg';
import {useFlag} from '../../../core/flag/flag.hook';

export default function Input<T, S>(
  props: PropsWithChildren<InputProps<T, S>>
): ReactElement {
  const {colors, fonts, radius} = useTheme();
  const [visible, setVisible] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isTouched = useFlag(false);
  const selectionColor = useOpacity(colors.grayscale.active, 0.11);
  const [text, setText] = useState<string>(props.value);

  useEffect(() => {
    setText(props.value);
  }, [props.value]);

  function onChange(v: string) {
    setText(v);
    props.onChangeText(v);
  }

  function onFocus(e: NativeSyntheticEvent<TextInputFocusEventData>): void {
    setIsFocused(true);
    isTouched.up();
  }

  function onBlur(e: NativeSyntheticEvent<TextInputFocusEventData>): void {
    setIsFocused(false);
    if (typeof props?.onBlur === 'function') props.onBlur(e)
  }

  function CloseIconComponent(): ReactElement {
    if (isFocused) {
      return (
        <SvgIcon
          color={
            props.error
              ? colors.error.default
              : colors.grayscale.medium_emphasis
          }
          onPress={() => onChange('')}
        >
          <CloseIcon/>
        </SvgIcon>
      );
    } else {
      return <View style={[tw.w4, tw.h4]}/>;
    }
  }

  function SecureIconComponent(): ReactElement {
    if (isTouched.state) {
      return (
        <>
          {visible ? (
            <SvgIcon
              color={colors.grayscale.medium_emphasis}
              onPress={() => setVisible(!visible)}
            >
              <VisibleIcon/>
            </SvgIcon>
          ) : (
            <SvgIcon
              color={colors.grayscale.medium_emphasis}
              onPress={() => setVisible(!visible)}
            >
              <VisibleOffIcon/>
            </SvgIcon>
          )}
        </>
      );
    } else {
      return <View style={[tw.w4, tw.h4]}/>;
    }
  }

  function RightIcon(): ReactElement {
    if (props.secure) return SecureIconComponent();
    else return CloseIconComponent();
  }

  function onSubmitEditing(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>):void{
    if(typeof props.onSubmitEditing === 'function')
      props.onSubmitEditing(e);
  }

  const styles = StyleSheet.create({
    TextInput: {
      borderRadius: radius,
      backgroundColor: colors.grayscale.input_background,
      ...fonts.Subtitle1
    }
  });
  return (
    <View style={[props.style]}>
      <TextInput
        blurOnSubmit={props.blurOnSubmit ?? true}
        multiline={props.multiline}
        onChangeText={onChange}
        onSubmitEditing={onSubmitEditing}
        onFocus={onFocus}
        secureTextEntry={props.secure && visible}
        onBlur={onBlur}
        textContentType={props.textContentType}
        placeholder={props.placeholder}
        disabled={props.disabled}
        label={props.label}
        value={props.value}
        style={styles.TextInput}
        keyboardType={props.keyboardType}
        selectionColor={selectionColor}
        autoCorrect={false}
        theme={{
          colors: {
            primary: props.error
              ? colors.error.default
              : colors.grayscale.medium_emphasis,
            placeholder: props.error
              ? colors.error.default
              : text
                ? colors.grayscale.active
                : colors.grayscale.placeholder,
            disabled: props.error
              ? colors.error.default
              : text
                ? colors.grayscale.medium_emphasis
                : 'transparent',
            text: colors.grayscale.medium_emphasis
          },
          fonts: {
            regular: fonts.Subtitle1,
            thin: fonts.Caption
          }
        }}
        right={
          props.right ? (
            props.right
          ) : (
            <TextInput.Icon name={RightIcon} rippleColor={'transparent'}/>
          )
        }
        left={props.left}
        editable={props.editable ?? true}
      />
    </View>
  );
}

export interface InputProps<T, S> {
  value: string;

  placeholder?: string;

  label?: string;

  multiline?: boolean;

  onChangeText?: (text: string) => void;

  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;

  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;

  secure?: boolean;

  state?: AsyncState<S>;

  disabled?: boolean;

  editable?: boolean;

  blurOnSubmit?: boolean;

  style?: StyleProp<ViewStyle>;

  keyboardType?: KeyboardTypeOptions;

  textContentType?: any;

  right?: ReactNode;

  left?: ReactNode;

  error?: boolean;
}
