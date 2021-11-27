import {
  DarkTheme as NavDark,
  DefaultTheme as NavLight,
  Theme as NavTheme
} from '@react-navigation/native';
import i18n from 'i18next';
import _ from 'lodash';
import { Appearance, ColorSchemeName } from 'react-native';
import {
  DarkTheme as PaperDark,
  DefaultTheme as PaperLight
} from 'react-native-paper';
import { Theme as PaperTheme } from 'react-native-paper/src/types';
import { Observable } from 'rxjs';
import storage from '../common/storage';
import { Lang } from '../i18n/i18n.model';
import {
  fontPreset,
  elevationsPreset,
  THEME_MODE_DEFAULT,
  THEME_MODE_KEY, colors
} from './theme.constant';
import { Fonts, Theme, ThemeData, ThemeMode, ThemeScheme } from './theme.model';

export async function init(): Promise<Theme> {
  let mode = await storage.get<ThemeMode>(THEME_MODE_KEY, THEME_MODE_DEFAULT);
  const scheme = fromMode(mode);
  return {
    mode,
    data: create(scheme)
  };
}

export function watch(): Observable<ThemeScheme> {
  return new Observable((subscriber) => {
    const listener: Appearance.AppearanceListener = function (prefs) {
      let scheme = fromSystem(prefs.colorScheme);
      subscriber.next(scheme);
    };
    Appearance.addChangeListener(listener);
    return () => Appearance.removeChangeListener(listener);
  });
}

export async function change(mode: ThemeMode): Promise<Theme> {
  await storage.set(THEME_MODE_KEY, mode);
  let scheme = fromMode(mode);
  return {
    mode,
    data: create(scheme)
  };
}

export function create(scheme: ThemeScheme): ThemeData {
  const dark = scheme === 'dark';
  const ratio = 0.1;
  const colorPreset = colors(dark);
  return {
    scheme,
    radius: 4,
    colors: {
      primary: colorPreset.primary,
      warning: colorPreset.warning,
      error: colorPreset.error,
      info: colorPreset.info,
      success: colorPreset.success,
      grayscale: colorPreset.grayscale
    },
    elevations: {
      elevation0: elevationsPreset.elevation0,
      elevation1: elevationsPreset.elevation1,
      elevation2: elevationsPreset.elevation2,
      elevation3: elevationsPreset.elevation3,
      elevation4: elevationsPreset.elevation4,
      elevation6: elevationsPreset.elevation6,
      elevation8: elevationsPreset.elevation8,
      elevation9: elevationsPreset.elevation9,
      elevation12: elevationsPreset.elevation12,
      elevation16: elevationsPreset.elevation16,
      elevation24: elevationsPreset.elevation24
    },
    fonts: createFonts(
      (() => {
        let lang = i18n.language as Lang;
        switch (lang) {
          case Lang.EN_US:
          case Lang.FA_IR:
            return fontPreset[lang];
          default:
            return fontPreset.default;
        }
      })()
    )
  };
}

export function toPaper(theme: ThemeData): PaperTheme {
  let { colors } = theme;
  let paper = theme.scheme === 'dark' ? PaperDark : PaperLight;
  return _.merge({}, paper, {
    roundness: theme.radius,
    colors: {
      error: colors.error.default,
      primary: colors.primary.default,
      background: colors.grayscale.bg,
      surface: colors.grayscale.bg,
      onSurface: colors.grayscale.active,
      placeholder: colors.grayscale.active
    },
    fonts: theme.fonts
  });
}

export function toNav(theme: ThemeData): NavTheme {
  let { colors } = theme;
  let nav = theme.scheme === 'dark' ? NavDark : NavLight;
  return _.merge({}, nav, {
    colors: {
      primary: colors.grayscale.active,
      background: colors.grayscale.bg,
      card: colors.grayscale.bg
    }
  });
}

function fromMode(mode: ThemeMode): ThemeScheme {
  if (mode !== 'auto') return mode;
  return fromSystem();
}

function fromSystem(system?: ColorSchemeName): ThemeScheme {
  if (!system) system = Appearance.getColorScheme();
  return system === 'dark' ? 'dark' : 'light';
}

function createFonts(fonts: Record<keyof Fonts, string>): Fonts {
  return {
    H1: {
      fontFamily: fonts.H1,
      fontSize: 31,
      fontWeight: '300',
      fontStyle: 'normal'
    },
    H2: {
      fontFamily: fonts.H2,
      fontSize: 19.3,
      fontWeight: '300',
      fontStyle: 'normal'
    },
    H3: {
      fontFamily: fonts.H1,
      fontSize: 15.3,
      fontWeight: '400',
      fontStyle: 'normal'
    },
    H4: {
      fontFamily: fonts.H4,
      fontSize: 11,
      fontWeight: '400',
      fontStyle: 'normal'
    },
    H5: {
      fontFamily: fonts.H5,
      fontSize: 23,
      fontWeight: '400',
      fontStyle: 'normal'
    },
    H6: {
      fontFamily: fonts.H6,
      fontSize: 19,
      fontWeight: '500',
      fontStyle: 'normal',
      letterSpacing: 0.15,
      lineHeight: 28.5
    },
    Subtitle1: {
      fontFamily: fonts.Subtitle1,
      fontSize: 15,
      fontWeight: '400',
      fontStyle: 'normal',
      lineHeight: 24,
      letterSpacing: 0.15
    },
    Subtitle2: {
      fontFamily: fonts.Subtitle2,
      fontSize: 13,
      fontWeight: '500',
      fontStyle: 'normal',
      lineHeight: 24,
      letterSpacing: 0.1
    },
    Body1: {
      fontFamily: fonts.Body1,
      fontSize: 15,
      fontWeight: '400',
      fontStyle: 'normal',
      letterSpacing: 0.5,
      lineHeight: 28
    },
    Body2: {
      fontFamily: fonts.Body2,
      fontSize: 13,
      fontWeight: '400',
      fontStyle: 'normal',
      letterSpacing: 0.3,
      lineHeight: 20
    },
    Button: {
      fontFamily: fonts.Button,
      fontSize: 13,
      fontWeight: '500',
      fontStyle: 'normal',
      lineHeight: 16,
      letterSpacing: 1.25
    },
    Caption: {
      fontFamily: fonts.Caption,
      fontSize: 12,
      fontWeight: '400',
      fontStyle: 'normal',
      lineHeight: 18,
      letterSpacing: 0.4
    },
    Overline: {
      fontFamily: fonts.Overline,
      fontSize: 10,
      fontWeight: '400',
      fontStyle: 'normal',
      lineHeight: 16,
      letterSpacing: 1.5
    }
  };
}
