import {createReducer} from '@reduxjs/toolkit';
import {i18nChangeRequest, i18nChangeSuccess, i18nInitRequest, i18nInitSuccess} from './i18n.action';
import {I18n} from './i18n.model';

const initialState: I18n = {
  init: {},
  change: {}
};

export default createReducer(initialState, {
  [i18nInitRequest.type]: state => {
    state.init.status = 'request';
  },
  [i18nInitSuccess.type]: state => {
    state.init.status = 'success';
  },
  [i18nChangeRequest.type]: state => {
    state.change.status = 'request';
  },
  [i18nChangeSuccess.type]: state => {
    state.change.status = 'success';
  }
});
