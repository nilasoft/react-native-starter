import {selector} from '../../core/state/state.util';

export const selectApp = selector(state => state.app)();
