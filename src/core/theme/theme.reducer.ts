import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  themeDataChange,
  themeInitSuccess,
  themeModeChangeSuccess
} from './theme.action';
import { Theme, ThemeData } from './theme.model';

const initialState: Theme = {
  mode: null,
  data: null
};

export default createReducer(initialState, {
  [themeInitSuccess.type]: (state, action: PayloadAction<Theme>) =>
    action.payload,
  [themeModeChangeSuccess.type]: (state, action: PayloadAction<Theme>) =>
    action.payload,
  [themeDataChange.type]: (state, action: PayloadAction<ThemeData>) => {
    state.data = action.payload;
  }
});
