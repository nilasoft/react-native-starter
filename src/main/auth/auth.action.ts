import {createAction} from '@reduxjs/toolkit';
import {failure} from '../../core/state/state.util';
import {Credentials} from './auth.model';

export const authLoadRequest = createAction('auth/load/request');

export const authLoadSuccess = createAction<string>('auth/load/success');

export const authLoadFailure = createAction('auth/load/failure', failure());

export const authRegisterRequest = createAction<Credentials>('auth/register/request');

export const authRegisterCancel = createAction('auth/register/cancel');

export const authRegisterSuccess = createAction('auth/register/success');

export const authRegisterFailure = createAction('auth/register/failure', failure());

export const authLoginRequest = createAction<Credentials>('auth/login/request');

export const authLoginCancel = createAction('auth/login/cancel');

export const authLoginSuccess = createAction<string>('auth/login/success');

export const authLoginFailure = createAction('auth/login/failure', failure());

export const authLogoutRequest = createAction('auth/logout/request');

export const authLogoutSuccess = createAction('auth/logout/success');

export const authLogoutFailure = createAction('auth/logout/failure', failure());
