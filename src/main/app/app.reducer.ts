import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {Message} from '../../core/i18n/i18n.model';
import {FailureAction} from '../../core/state/state.model';
import {appFailure, appInitRequest, appInitSuccess, appLogging} from './app.action';
import {App} from './app.model';

const initialState: App = {
  logging: null,
  init: {},
  error: null
};

export default createReducer(initialState, {
  [appLogging.type]: (state, action: PayloadAction<boolean>) => {
    state.logging = action.payload;
  },
  [appInitRequest.type]: state => {
    state.init.status = 'request';
  },
  [appInitSuccess.type]: (state, action: PayloadAction<boolean>) => {
    state.init.status = 'success';
    state.logging = action.payload;
  },
  [appFailure.type]: (state, action: FailureAction<never, Message>) => {
    state.error = action.error;
  }
});
