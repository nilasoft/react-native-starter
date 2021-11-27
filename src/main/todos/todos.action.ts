import {createAction} from '@reduxjs/toolkit';
import faker from 'faker/locale/en';
import _ from 'lodash';
import {Todo} from './todos.model';

export const todosAdd = createAction(
  'todos/add',
  (todo: Partial<Todo>) => ({
    payload: _.assign({}, todo, {
      id: faker.random.uuid(),
      complete: {
        status: 'success',
        data: faker.random.boolean(),
        error: null
      }
    })
  })
);

export const todosToggleRequest = createAction<string>('todos/toggle/request');

export const todosToggleSuccess = createAction<string>('todos/toggle/success');

export const todosRemove = createAction<string>('todos/remove');
