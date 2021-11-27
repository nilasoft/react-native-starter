import {createAction} from '@reduxjs/toolkit';
import {Theme, ThemeData, ThemeMode} from './theme.model';

export const themeInitRequest = createAction('theme/init/request');

export const themeInitSuccess = createAction<Theme>('theme/init/success');

export const themeModeChangeRequest = createAction<ThemeMode>('theme/mode/change/request');

export const themeModeChangeSuccess = createAction<Theme>('theme/mode/change/success');

export const themeDataChange = createAction<ThemeData>('theme/data/change');
