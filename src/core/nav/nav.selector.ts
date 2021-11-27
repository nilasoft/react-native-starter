import {selector} from '../state/state.util';

export const selectNav = selector(state => state.core.nav)();
