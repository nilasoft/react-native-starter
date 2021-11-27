import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {FailureAction} from '../../core/state/state.model';
import {
  authLoadFailure,
  authLoadRequest,
  authLoadSuccess,
  authLoginCancel,
  authLoginFailure,
  authLoginRequest,
  authLoginSuccess,
  authLogoutFailure,
  authLogoutRequest,
  authLogoutSuccess,
  authRegisterCancel,
  authRegisterFailure,
  authRegisterRequest,
  authRegisterSuccess
} from './auth.action';
import {Auth} from './auth.model';

const initialState: Auth = {
  token: null,
  load: {},
  register: {},
  login: {},
  logout: {}
};

export default createReducer(initialState, {
  [authLoadRequest.type]: state => {
    state.load.status = 'request';
    state.load.error = null;
  },
  [authLoadSuccess.type]: (state, action: PayloadAction<string>) => {
    state.load.status = 'success';
    state.token = action.payload;
  },
  [authLoadFailure.type]: (state, action: FailureAction) => {
    state.load.status = 'failure';
    state.load.error = action.error;
  },
  [authRegisterRequest.type]: state => {
    state.register.status = 'request';
    state.register.error = null;
  },
  [authRegisterCancel.type]: state => {
    state.register.status = 'cancel';
  },
  [authRegisterSuccess.type]: state => {
    state.register.status = 'success';
  },
  [authRegisterFailure.type]: (state, action: FailureAction) => {
    state.register.status = 'failure';
    state.register.error = action.error;
  },
  [authLoginRequest.type]: state => {
    state.login.status = 'request';
    state.login.error = null;
  },
  [authLoginCancel.type]: state => {
    state.login.status = 'cancel';
  },
  [authLoginSuccess.type]: (state, action: PayloadAction<string>) => {
    state.login.status = 'success';
    state.token = action.payload;
  },
  [authLoginFailure.type]: (state, action: FailureAction) => {
    state.login.status = 'failure';
    state.login.error = action.error;
  },
  [authLogoutRequest.type]: state => {
    state.logout.status = 'request';
    state.logout.error = null;
  },
  [authLogoutSuccess.type]: state => {
    state.logout.status = 'success';
    state.token = null;
  },
  [authLogoutFailure.type]: (state, action: FailureAction) => {
    state.logout.status = 'failure';
    state.logout.error = action.error;
  }
});
