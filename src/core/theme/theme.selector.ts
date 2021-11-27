import { createSelector } from '@reduxjs/toolkit';
import { selector } from '../state/state.util';
import { toNav, toPaper } from './theme.api';

export const selectTheme = selector((state) => state.core.theme)();

export const selectThemeMode = selector((state) => state.core.theme.mode)();

export const selectThemeData = selector((state) => state.core.theme.data)();

export const selectThemePaper = createSelector(selectThemeData, toPaper);

export const selectThemeNav = createSelector(selectThemeData, toNav);
