import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {prefsLoadRequest, prefsLoadSuccess, prefsUpdateRequest, prefsUpdateSuccess} from './prefs.action';
import {Prefs, PrefsData} from './prefs.model';

const initialState: Prefs = {
  data: null,
  load: {},
  update: {}
};

export default createReducer(initialState, {
  [prefsLoadRequest.type]: state => {
    state.load.status = 'request';
  },
  [prefsLoadSuccess.type]: (state, action: PayloadAction<PrefsData>) => {
    state.load.status = 'success';
    state.data = action.payload;
  },
  [prefsUpdateRequest.type]: state => {
    state.update.status = 'request';
  },
  [prefsUpdateSuccess.type]: (state, action: PayloadAction<PrefsData>) => {
    state.update.status = 'success';
    state.data = action.payload;
  }
});
