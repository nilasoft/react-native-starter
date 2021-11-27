import {Lang} from '../i18n/i18n.model';
import {Colors, Elevations, Fonts, ThemeMode} from './theme.model';

export const THEME_MODE_KEY = 'theme_mode_key';

export const THEME_MODE_DEFAULT: ThemeMode = 'light';

export const colors = (dark: boolean): Colors => {
  if (!dark) {
    return {
      primary: {default: '#FA3D67', light: '#FB8898', dark: '#86142A', bg: '#FEE8E7'},
      warning: {default: '#FFBB33', light: '#FFF5E0', dark: '#946200', bg: '#FFF1D6'},
      error: {default: '#FF2C32', light: '#FEF1F2', dark: '#94000E', bg: '#FCD9DC'},
      success: {default: '#00C851', light: '#F1FEFA', dark: '#00966D', bg: '#DAFBF2'},
      info: {default: '#33B5E5', light: '#F0F6FF', dark: '#00378A', bg: '#D6E7FF'},
      grayscale: {
        bg: '#FCFCFC',
        input_background: '#F6F7F8',
        line: 'rgba(179, 179, 179, 0.5)',
        placeholder: '#B3B3B3',
        high_emphasis: 'rgba(0, 0, 0, 0.87)',
        active: '#262626',
        medium_emphasis: 'rgba(0, 0, 0, 0.6)',
        white: '#FFFFFF',
        black: '#000000'
      }
    }
  } else {
    return {
      primary: {default: '#e82d5b', light: '#FB8898', dark: '#86142A', bg: '#FEE8E7'},
      warning: {default: '#FFBB33', light: '#FFF5E0', dark: '#946200', bg: '#FFF1D6'},
      error: {default: '#FF2C32', light: '#FEF1F2', dark: '#94000E', bg: '#FCD9DC'},
      success: {default: '#00C851', light: '#F1FEFA', dark: '#00966D', bg: '#DAFBF2'},
      info: {default: '#33B5E5', light: '#F0F6FF', dark: '#00378A', bg: '#D6E7FF'},
      grayscale: {
        bg: '#504d4d',
        input_background: '#F6F7F8',
        line: 'rgba(179, 179, 179, 0.5)',
        placeholder: '#B3B3B3',
        high_emphasis: 'rgba(222,215,215,0.87)',
        active: '#eee9e9',
        medium_emphasis: 'rgba(0, 0, 0, 0.6)',
        white: '#000000',
        black: '#FFFFFF'
      }
    }
  }
};

export const fontPreset: Record<Lang | 'default',
  Record<keyof Fonts, string>> = {
  [Lang.EN_US]: {
    H1: 'Poppins-Light',
    H2: 'Poppins-Light',
    H3: 'Poppins-Regular',
    H4: 'Poppins-Regular',
    H5: 'Poppins-Regular',
    H6: 'Poppins-Medium',
    Body1: 'Poppins-Regular',
    Body2: 'Poppins-Regular',
    Subtitle1: 'Poppins-Regular',
    Subtitle2: 'Poppins-Medium',
    Caption: 'Poppins-Regular',
    Button: 'Poppins-Medium',
    Overline: 'Poppins-Medium'
  },
  [Lang.FA_IR]: {
    H1: 'Vazir-FD',
    H2: 'Vazir-Bold-FD',
    H3: 'Vazir-Medium-FD',
    H4: 'Vazir-Light-FD',
    H5: 'Vazir-Thin-FD',
    H6: 'Vazir-Thin-FD',
    Subtitle1: 'Vazir-Thin-FD',
    Subtitle2: 'Vazir-Thin-FD',
    Body1: 'Vazir-Thin-FD',
    Body2: 'Vazir-Thin-FD',
    Caption: 'Vazir-Thin-FD',
    Button: 'Vazir-Thin-FD',
    Overline: 'Vazir-Thin-FD'
  },
  default: null
};

export const elevationsPreset: Elevations = {
  elevation0: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 0
  },
  elevation1: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1
  },

  elevation2: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  elevation3: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  elevation4: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4
  },
  elevation6: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6
  },
  elevation8: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8
  },
  elevation9: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9
  },
  elevation12: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12
  },
  elevation16: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16
  },
  elevation24: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24
  }
};
