import {PayloadAction} from '@reduxjs/toolkit';
import Axios from 'axios';
import {SagaIterator} from 'redux-saga';
import {call, cancelled, fork, put, race, take, takeLatest} from 'redux-saga/effects';
import {
  authLoadFailure,
  authLoadRequest,
  authLoadSuccess,
  authLoginCancel,
  authLoginFailure,
  authLoginRequest,
  authLoginSuccess,
  authLogoutFailure,
  authLogoutRequest,
  authLogoutSuccess,
  authRegisterCancel,
  authRegisterFailure,
  authRegisterRequest,
  authRegisterSuccess
} from './auth.action';
import {load, login, logout, register} from './auth.api';
import {Credentials} from './auth.model';

export default function* (): SagaIterator {
  yield take(authLoadRequest);
  yield call(handleLoadRequest);
  yield fork(watchRegister);
  yield fork(watchLogin);
  yield takeLatest(authLogoutRequest, handleLogoutRequest);
}

function* handleLoadRequest(): SagaIterator {
  try {
    let token: string = yield call(load);
    yield put(authLoadSuccess(token));
  } catch (err) {
    yield put(authLoadFailure(err));
  }
}

function* watchRegister(): SagaIterator {
  while (true) {
    let action: PayloadAction<Credentials> = yield take(authRegisterRequest);
    yield race([
      call(handleRegisterRequest, action.payload),
      take(authRegisterCancel)
    ]);
  }
}

function* handleRegisterRequest(credentials: Credentials): SagaIterator {
  const cancellation = Axios.CancelToken.source();
  try {
    yield call(register, credentials, cancellation.token);
    yield put(authRegisterSuccess());
  } catch (err) {
    yield put(authRegisterFailure(err));
  } finally {
    if (yield cancelled())
      yield call([cancellation, cancellation.cancel]);
  }
}

function* watchLogin(): SagaIterator {
  while (true) {
    let action: PayloadAction<Credentials> = yield take(authLoginRequest);
    yield race([
      call(handleLoginRequest, action.payload),
      take(authLoginCancel)
    ]);
  }
}

function* handleLoginRequest(credentials: Credentials): SagaIterator {
  try {
    let token: string = yield call(login, credentials);
    yield put(authLoginSuccess(token));
  } catch (err) {
    yield put(authLoginFailure(err));
  }
}

function* handleLogoutRequest(): SagaIterator {
  try {
    yield call(logout);
    yield put(authLogoutSuccess());
  } catch (err) {
    yield put(authLogoutFailure(err));
  }
}
