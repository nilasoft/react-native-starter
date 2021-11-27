import { PayloadAction } from '@reduxjs/toolkit';
import { eventChannel, EventChannel, SagaIterator } from 'redux-saga';
import { call, put, spawn, take, takeLatest } from 'redux-saga/effects';
import {
  themeDataChange,
  themeInitRequest,
  themeInitSuccess,
  themeModeChangeRequest,
  themeModeChangeSuccess
} from './theme.action';
import { change, create, init, watch } from './theme.api';
import { Theme, ThemeData, ThemeMode, ThemeScheme } from './theme.model';

let schemeChannel: EventChannel<ThemeScheme> = null;

export default function* (): SagaIterator {
  yield take(themeInitRequest);
  yield call(handleInitRequest);
  yield takeLatest(themeModeChangeRequest, handleModeChangeRequest);
}

function* handleInitRequest(): SagaIterator {
  let theme: Theme = yield call(init);
  yield put(themeInitSuccess(theme));
  yield call(checkSchemeChannel, theme.mode);
}

function* handleModeChangeRequest(
  action: PayloadAction<ThemeMode>
): SagaIterator {
  let theme: Theme = yield call(change, action.payload);
  yield put(themeModeChangeSuccess(theme));
  yield call(checkSchemeChannel, theme.mode);
}

function* checkSchemeChannel(mode: ThemeMode): SagaIterator {
  if (mode === 'auto') {
    if (!schemeChannel) yield spawn(watchSchemeChannel);
  } else if (schemeChannel) {
    schemeChannel.close();
    schemeChannel = null;
  }
}

function* watchSchemeChannel(): SagaIterator {
  schemeChannel = yield call(createSchemeChannel);
  while (true) {
    let scheme: ThemeScheme = yield take(schemeChannel);
    let data: ThemeData = yield call(create, scheme);
    yield put(themeDataChange(data));
  }
}

function createSchemeChannel(): EventChannel<ThemeScheme> {
  return eventChannel((emit) => {
    const subscription = watch().subscribe(emit);
    return () => subscription.unsubscribe();
  });
}
