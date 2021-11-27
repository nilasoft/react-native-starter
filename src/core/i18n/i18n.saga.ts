import {PayloadAction} from '@reduxjs/toolkit';
import {SagaIterator} from 'redux-saga';
import {call, put, take, takeLatest} from 'redux-saga/effects';
import {appRestart} from '../../main/app/app.action';
import {i18nChangeRequest, i18nChangeSuccess, i18nInitRequest, i18nInitSuccess} from './i18n.action';
import {change, init} from './i18n.api';
import {Lang} from './i18n.model';

export default function* (): SagaIterator {
  yield take(i18nInitRequest);
  yield call(handleInitRequest);
  yield takeLatest(i18nChangeSuccess, handleChangeSuccess);
  yield takeLatest(i18nChangeRequest, handleChangeRequest);
}

function* handleInitRequest(): SagaIterator {
  yield call(init);
  yield put(i18nInitSuccess());
}

function* handleChangeRequest(action: PayloadAction<Lang>): SagaIterator {
  let reload: boolean = yield call(change, action.payload);
  yield put(i18nChangeSuccess(reload));
}

function* handleChangeSuccess(action: PayloadAction<boolean>): SagaIterator {
  if (action.payload)
    yield put(appRestart());
}
