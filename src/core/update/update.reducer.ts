import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ReleaseType } from 'semver';
import { FailureAction } from '../state/state.model';
import {
  updateCheckRequest,
  updateCheckSuccess,
  updateFetchCancel,
  updateFetchFailure,
  updateFetchRequest,
  updateFetchSuccess
} from './update.action';
import { Update } from './update.model';

const initialState: Update = {
  check: {},
  fetch: {}
};

export default createReducer(initialState, {
  [updateCheckRequest.type]: (state) => {
    state.check.status = 'request';
  },
  [updateCheckSuccess.type]: (state, action: PayloadAction<ReleaseType>) => {
    state.check.status = 'success';
    state.check.data = action.payload;
  },
  [updateFetchRequest.type]: (state) => {
    state.fetch.status = 'request';
    state.fetch.error = null;
  },
  [updateFetchCancel.type]: (state) => {
    state.fetch.status = 'cancel';
  },
  [updateFetchSuccess.type]: (state) => {
    state.fetch.status = 'success';
  },
  [updateFetchFailure.type]: (state, action: FailureAction) => {
    state.fetch.status = 'failure';
    state.fetch.error = action.error;
  }
});
