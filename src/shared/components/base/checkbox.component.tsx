import React, {ReactElement, useEffect, useState} from 'react';
import {TouchableRipple} from 'react-native-paper';
import {useOpacity, useTheme} from '../../../core/theme/theme.hook';
import CheckboxCheckedIcon from '../../../assets/icon/checkbox_checked.svg';
import CheckboxUncheckedIcon from '../../../assets/icon/checkbox_unchecked.svg';
import SvgIcon from './svg.icon.component';
import {tw} from 'react-native-tailwindcss';

export default function Checkbox(
  props: AppCheckboxComponentProps
): ReactElement {
  const {colors} = useTheme();
  const checkedDisabledColor = useOpacity(colors.primary.default, 0.5);
  const unCheckedDisabledColor = colors.grayscale.line;
  const [checkedColor, setCheckedColor] = useState(getCheckColor());
  const [uncheckedColor, setUncheckedColor] = useState(getUnCheckColor());

  useEffect(() => {
    setCheckedColor(getCheckColor());
    setUncheckedColor(getUnCheckColor());
  }, [props.disabled]);

  function onPress(): void {
    props.onPress();
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
        {width: 32, height: 32},
        tw.justifyCenter,
        tw.itemsCenter,
        tw.roundedFull
      ]}
      borderless
      disabled={props.disabled}
      rippleColor={colors.primary.bg}
    >
      {props.status === 'checked' ? (
        <SvgIcon color={checkedColor} width={24} height={24}>
          <CheckboxCheckedIcon/>
        </SvgIcon>
      ) : (
        <SvgIcon color={uncheckedColor} width={24} height={24}>
          <CheckboxUncheckedIcon/>
        </SvgIcon>
      )}
    </TouchableRipple>
  );
}

interface AppCheckboxComponentProps {
  status: 'checked' | 'unchecked';
  disabled?: boolean;
  onPress: () => void;
}
