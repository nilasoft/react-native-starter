import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import _ from 'lodash';
import {todosAdd, todosRemove, todosToggleRequest, todosToggleSuccess} from './todos.action';
import {Todo} from './todos.model';

const initialState: Todo[] = [];

export default createReducer(initialState, {
  [todosAdd.type]: (state, action: PayloadAction<Todo>) => {
    state.push(action.payload);
  },
  [todosToggleRequest.type]: (state, action: PayloadAction<string>) => {
    let todo = _.find(state, {id: action.payload});
    todo.complete.status = 'request';
  },
  [todosToggleSuccess.type]: (state, action: PayloadAction<string>) => {
    let todo = _.find(state, {id: action.payload});
    todo.complete.status = 'success';
    todo.complete.data = !todo.complete.data;
  },
  [todosRemove.type]: (state, action: PayloadAction<string>) => {
    _.remove(state, ['id', action.payload]);
  }
});
