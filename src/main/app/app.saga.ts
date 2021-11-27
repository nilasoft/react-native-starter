import {PayloadAction} from '@reduxjs/toolkit';
import {SagaIterator} from 'redux-saga';
import {all, call, delay, fork, put, race, take, takeLatest} from 'redux-saga/effects';
import {authLoadFailure, authLoadRequest, authLoadSuccess} from '../auth/auth.action';
import {i18nInitRequest, i18nInitSuccess} from '../../core/i18n/i18n.action';
import {navLoadRequest, navLoadSuccess} from '../../core/nav/nav.action';
import {prefsLoadRequest, prefsLoadSuccess} from '../prefs/prefs.action';
import {themeInitRequest, themeInitSuccess} from '../../core/theme/theme.action';
import {updateCheckRequest} from '../../core/update/update.action';
import {appInitRequest, appInitSuccess, appLogging, appRestart} from './app.action';
import {init, logging, restart} from './app.api';
import {APP_INIT_TIMEOUT} from './app.constants';
import {sentryInitRequest} from "../../core/sentry/sentry.action";

export default function* (): SagaIterator {
  yield take(appInitRequest);
  yield call(handleInitRequest);
  yield takeLatest(appLogging, handleLogging);
  yield takeLatest(appRestart, handleRestart);
}

function* handleInitRequest(): SagaIterator {
  yield fork(watchThemeInit);
  yield fork(watchAppInit);
  yield put(prefsLoadRequest());
  yield put(i18nInitRequest());
  yield put(navLoadRequest());
  yield put(authLoadRequest());
  yield put(updateCheckRequest());
  yield put(sentryInitRequest());

}

function* watchThemeInit(): SagaIterator {
  yield take(i18nInitSuccess);
  yield put(themeInitRequest());
}

function* watchAppInit(): SagaIterator {
  let result = yield race({
    success: all({
      prefs: take(prefsLoadSuccess),
      i18n: take(i18nInitSuccess),
      theme: take(themeInitSuccess),
      nav: take(navLoadSuccess),
      auth: take(authLoadSuccess),
      app: call(init)
    }),
    failure: race({
      auth: take(authLoadFailure),
      timeout: delay(APP_INIT_TIMEOUT)
    })
  });
  if (result.success)
    yield put(appInitSuccess(result.success.app));
  else if (result.failure)
    throw new Error('main init failed');
}

function* handleLogging(action: PayloadAction<boolean>): SagaIterator {
  yield call(logging, action.payload);
}

function* handleRestart(): SagaIterator {
  yield call(restart);
}
