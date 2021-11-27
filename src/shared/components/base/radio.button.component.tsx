import React, {ReactElement, useEffect, useState} from 'react';
import {TouchableRipple} from 'react-native-paper';
import {tw} from 'react-native-tailwindcss';
import SvgIcon from './svg.icon.component';
import CheckboxUncheckedIcon from '../../../assets/icon/checkbox_unchecked.svg';
import {useOpacity, useTheme} from '../../../core/theme/theme.hook';
import {View} from 'react-native';

export default function RadioButton(
  props: AppRadioButtonComponentProps
): ReactElement {
  const {colors} = useTheme();
  const [checked, setChecked] = useState(
    props.status === 'checked' ? true : false
  );
  const checkedDisabledColor = useOpacity(colors.primary.default, 0.5);
  const unCheckedDisabledColor = useOpacity(colors.grayscale.line, 0.4);
  const [checkedColor, setCheckedColor] = useState(getCheckColor());
  const [uncheckedColor, setUncheckedColor] = useState(getUnCheckColor());

  useEffect(() => {
    setCheckedColor(getCheckColor());
    setUncheckedColor(getUnCheckColor());
  }, [props.disabled]);

  useEffect(() => {
    if (props.status === 'checked') setChecked(true);
    else if (props.status === 'unchecked') setChecked(false);
  }, [props.status]);

  function onPress(): void {
    props.onPress(props.value);
  }

  function getCheckColor(): string {
    return props.disabled ? checkedDisabledColor : colors.primary.default;
  }

  function getUnCheckColor(): string {
    return props.disabled ? unCheckedDisabledColor : colors.grayscale.line;
  }

  return (
    <TouchableRipple
      onPress={onPress}
      style={[
        {width: 36, height: 36},
        tw.justifyCenter,
        tw.itemsCenter,
        tw.roundedFull
      ]}
      borderless
      disabled={props.disabled}
      rippleColor={colors.primary.bg}
    >
      {checked ? (
        <View style={[tw.roundedFull, tw.bgWhite, tw.overflowHidden, tw.z100, {
          width: 24,
          height: 24,
          borderWidth: 6,
          borderColor: checkedColor
        }]}></View>
      ) : (
        <SvgIcon width={24} height={24} color={uncheckedColor}>
          <CheckboxUncheckedIcon/>
        </SvgIcon>
      )}
    </TouchableRipple>
  );
}

interface AppRadioButtonComponentProps {
  status: 'checked' | 'unchecked';
  value: string;
  disabled?: boolean;
  onPress: (value: string) => void;
}
