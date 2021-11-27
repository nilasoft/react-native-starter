import { selector } from '../state/state.util';

export const selectUpdate = selector((state) => state.core.update)();
