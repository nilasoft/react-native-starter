import {createAction} from '@reduxjs/toolkit';
import {Lang} from './i18n.model';

export const i18nInitRequest = createAction('i18n/init/request');

export const i18nInitSuccess = createAction('i18n/init/success');

export const i18nChangeRequest = createAction<Lang>('i18n/change/request');

export const i18nChangeSuccess = createAction<boolean>('i18n/change/success');
