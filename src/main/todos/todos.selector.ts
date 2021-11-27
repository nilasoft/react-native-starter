import {createSelector} from '@reduxjs/toolkit';
import _ from 'lodash';
import {passProps, selector} from '../../core/state/state.util';

export const selectTodos = selector(state => state.todos)();

export const selectTodosTodo = createSelector(
  [selectTodos, passProps<string>()],
  (todos, id) => _.find(todos, {id})
);
