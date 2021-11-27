import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { call, fork, put, race, take, takeLatest } from 'redux-saga/effects';
import { ReleaseType } from 'semver';
import {
  updateCheckRequest,
  updateCheckSuccess,
  updateFetchCancel,
  updateFetchFailure,
  updateFetchRequest,
  updateFetchSuccess
} from './update.action';
import { check, fetch } from './update.api';
import {appRestart} from '../../main/app/app.action';

export default function* (): SagaIterator {
  yield takeLatest(updateCheckRequest, handleCheckRequest);
  yield takeLatest(updateFetchSuccess, handleFetchSuccess);
  yield fork(watchFetch);
}

function* handleCheckRequest(): SagaIterator {
  let result: ReleaseType = yield call(check);
  yield put(updateCheckSuccess(result));
}

function* watchFetch(): SagaIterator {
  while (true) {
    yield take(updateFetchRequest);
    yield race([call(handleFetchRequest), take(updateFetchCancel)]);
  }
}

function* handleFetchRequest(): SagaIterator {
  try {
    let reload: boolean = yield call(fetch);
    yield put(updateFetchSuccess(reload));
  } catch (err) {
    yield put(updateFetchFailure(err));
  }
}

function* handleFetchSuccess(action: PayloadAction<boolean>): SagaIterator {
  if (action.payload) yield put(appRestart());
}
