import {selector} from '../state/state.util';

export const selectI18n = selector(state => state.core.i18n)();
