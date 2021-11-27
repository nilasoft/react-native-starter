import {PayloadAction} from '@reduxjs/toolkit';
import {SagaIterator} from 'redux-saga';
import {call, put, take, takeLatest} from 'redux-saga/effects';
import {prefsLoadRequest, prefsLoadSuccess, prefsUpdateRequest, prefsUpdateSuccess} from './prefs.action';
import {load, update} from './prefs.api';
import {PrefsData} from './prefs.model';

export default function* (): SagaIterator {
  yield take(prefsLoadRequest);
  yield call(handleLoadRequest);
  yield takeLatest(prefsUpdateRequest, handleUpdateRequest);
}

function* handleLoadRequest(): SagaIterator {
  let prefs: PrefsData = yield call(load);
  yield put(prefsLoadSuccess(prefs));
}

function* handleUpdateRequest(action: PayloadAction<Partial<PrefsData>>): SagaIterator {
  let prefs: PrefsData = yield call(update, action.payload);
  yield put(prefsUpdateSuccess(prefs));
}
