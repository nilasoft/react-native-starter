import {createAction} from '@reduxjs/toolkit';
import {ReleaseType} from 'semver';
import {failure} from '../state/state.util';

export const updateCheckRequest = createAction('update/check/request');

export const updateCheckSuccess = createAction<ReleaseType>(
  'update/check/success'
);

export const updateFetchRequest = createAction('update/fetch/request');

export const updateFetchCancel = createAction('update/fetch/cancel');

export const updateFetchSuccess = createAction<boolean>('update/fetch/success');

export const updateFetchFailure = createAction(
  'update/fetch/failure',
  failure()
);
