import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {AsyncState, FailureAction} from '../../core/state/state.model';
import {blogFetchCancel, blogFetchFailure, blogFetchRequest, blogFetchSuccess} from './blog.action';
import {Blog} from './blog.model';

const initialState: AsyncState<Blog> = {
  data: {
    posts: {},
    comments: {},
    albums: {},
    photos: {},
    todos: {},
    users: {}
  }
};

export default createReducer(initialState, {
  [blogFetchRequest.type]: state => {
    state.status = 'request';
    state.error = null;
  },
  [blogFetchCancel.type]: state => {
    state.status = 'cancel';
  },
  [blogFetchSuccess.type]: (state, action: PayloadAction<Blog>) => {
    state.status = 'success';
    state.data = action.payload;
  },
  [blogFetchFailure.type]: (state, action: FailureAction) => {
    state.status = 'failure';
    state.error = action.error;
  }
});
