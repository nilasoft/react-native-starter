export interface Theme {
  mode: ThemeMode;

  data: ThemeData;
}

export type ThemeMode = ThemeScheme | 'auto';

export type ThemeScheme = 'light' | 'dark';

export interface ThemeData {
  scheme: ThemeScheme;

  radius: number;

  colors: Colors;

  fonts: Fonts;

  elevations: Elevations;
}

export interface Colors {
  primary: Color;

  warning: Color;

  error: Color;

  success: Color;

  info: Color;

  grayscale: Grayscale;

}

export interface Color {
  default: string;

  light: string;

  dark: string;

  bg: string;
}

export interface Grayscale {
  bg: string;

  input_background: string;

  line: string;

  placeholder: string;

  high_emphasis: string;

  active: string;

  medium_emphasis: string;

  black: string;

  white: string;

}
export interface Fonts {
  H1: Font;

  H2: Font;

  H3: Font;

  H4: Font;

  H5: Font;

  H6: Font;

  Body1: Font;

  Body2: Font;

  Subtitle1: Font;

  Subtitle2: Font;

  Caption: Font;

  Button: Font;

  Overline: Font;

}

export interface Font {
  fontFamily: string;

  fontSize: number;

  letterSpacing?: number;

  lineHeight?: number;

  fontStyle: 'normal' | 'italic';

  fontWeight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}

export interface Elevations {

  elevation0  : Elevation;

  elevation1: Elevation;

  elevation2: Elevation;

  elevation3: Elevation;

  elevation4: Elevation;

  elevation6: Elevation;

  elevation8: Elevation;

  elevation9: Elevation;

  elevation12: Elevation;

  elevation16: Elevation;

  elevation24: Elevation;

}

export interface Elevation {
  shadowColor: string;

  shadowOffset: {
    width: number,
    height: number,
  };

  shadowOpacity: number;

  shadowRadius: number;

  elevation: number
}
