import {selector} from '../../core/state/state.util';

export const selectPrefs = selector(state => state.prefs)();

export const selectPrefsData = selector(state => state.prefs.data)();
