import {SagaIterator} from 'redux-saga';
import {call, put, take} from 'redux-saga/effects';
import {sentryInitFailure, sentryInitRequest, sentryInitSuccess} from './sentry.action';
import {init} from './sentry.api';


export default function* (): SagaIterator {
  yield take(sentryInitRequest);
  yield call(handleInitRequest);
}

function* handleInitRequest(): SagaIterator {
  try {
    yield call(init);
    yield put(sentryInitSuccess());
  } catch (e) {
    yield put(sentryInitFailure(e));
  }
}
