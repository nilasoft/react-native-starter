import {NavigationState} from '@react-navigation/native';
import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {AsyncState} from '../state/state.model';
import {navLoadRequest, navLoadSuccess} from './nav.action';

const initialState: AsyncState<NavigationState> = {};

export default createReducer(initialState, {
  [navLoadRequest.type]: state => {
    state.status = 'request';
  },
  [navLoadSuccess.type]: (state, action: PayloadAction<NavigationState>) => {
    state.status = 'success';
    state.data = action.payload;
  }
});
