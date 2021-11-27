import { useAppSelector } from '../state/state.hook';
import { ThemeData } from './theme.model';
import { selectThemeData } from './theme.selector';
import { hexToRgb } from './theme.util';

export function useTheme(): ThemeData {
  return useAppSelector(selectThemeData);
}

export function useRgb(color: string) {
  return hexToRgb(color);
}

export function useOpacity(color: string, opacity: number): string {
  const rgb = hexToRgb(color);
  if(rgb)
    return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity + ')';
}
