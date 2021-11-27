import {createAction} from '@reduxjs/toolkit';
import {Message} from '../../core/i18n/i18n.model';

export const appLogging = createAction<boolean>('main/logging');

export const appInitRequest = createAction('main/init/request');

export const appInitSuccess = createAction<boolean>('main/init/success');

export const appFailure = createAction<Message>('main/failure');

export const appRestart = createAction('main/restart');
