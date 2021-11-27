import React, { ReactElement } from 'react';
import { Chip as PaperChip } from 'react-native-paper';
import { View } from 'react-native';
import { tw } from 'react-native-tailwindcss';
import { useTheme } from '../../../core/theme/theme.hook';

export default function Chip({
  text,
  onClose
}: AppChipComponent): ReactElement {
  const { colors } = useTheme();
  return (
    <View style={[tw.mX1, tw.mY1]}>
      <PaperChip
        onClose={onClose}
        style={[
          {
            backgroundColor: colors.grayscale.bg,
            borderColor: colors.grayscale.active
          }
        ]}
        textStyle={{color: colors.grayscale.high_emphasis}}
        selectedColor={colors.grayscale.active}
      >
        {text}
      </PaperChip>
    </View>
  );
}

interface AppChipComponent {
  text: string;
  onClose?: () => void;
}
