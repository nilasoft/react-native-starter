import {createAction} from '@reduxjs/toolkit';
import {failure} from '../state/state.util';

export const sentryInitRequest = createAction('sentry/init/request');
export const sentryInitSuccess = createAction('sentry/init/success');
export const sentryInitFailure = createAction('sentry/init/failure', failure());

