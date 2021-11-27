import { createReducer } from '@reduxjs/toolkit';
import { Sentry } from './sentry.model';

const initialState: Sentry = { routingInstrumentation: null };
export default createReducer(initialState, {});
