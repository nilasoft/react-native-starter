import {PayloadAction} from '@reduxjs/toolkit';
import {SagaIterator} from 'redux-saga';
import {delay, put, takeEvery} from 'redux-saga/effects';
import {todosToggleRequest, todosToggleSuccess} from './todos.action';

export default function* (): SagaIterator {
  yield takeEvery(todosToggleRequest, handleToggleRequest);
}

function* handleToggleRequest(action: PayloadAction<string>): SagaIterator {
  yield delay(1000);
  yield put(todosToggleSuccess(action.payload));
}
