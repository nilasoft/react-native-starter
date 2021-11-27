import {createAction} from '@reduxjs/toolkit';
import {PrefsData} from './prefs.model';

export const prefsLoadRequest = createAction('prefs/load/request');

export const prefsLoadSuccess = createAction<PrefsData>('prefs/load/success');

export const prefsUpdateRequest = createAction<Partial<PrefsData>>('prefs/update/request');

export const prefsUpdateSuccess = createAction<PrefsData>('prefs/update/success');
