import {StackNavigationOptions} from '@react-navigation/stack';
import {useMemo} from 'react';
import {useTheme} from '../../core/theme/theme.hook';

/**
 * Helper hook for default stack navigation options.
 */
export function useStackOptions(): StackNavigationOptions {
  const {colors, fonts} = useTheme();
  return useMemo(() => ({
    headerStyle: {
      backgroundColor: colors.grayscale.bg
    },
    headerTintColor: colors.grayscale.active,
    headerTitleStyle: {
      color: colors.grayscale.active,
      fontFamily: fonts.Button.fontFamily
    }
  }), [colors, fonts]);
}
