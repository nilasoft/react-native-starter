import {NavigationState} from '@react-navigation/native';
import {SagaIterator} from 'redux-saga';
import {call, put, take} from 'redux-saga/effects';
import {navLoadRequest, navLoadSuccess} from './nav.action';
import {load} from './nav.api';

export default function* (): SagaIterator {
  yield take(navLoadRequest);
  yield call(handleLoadRequest);
}

function* handleLoadRequest(): SagaIterator {
  let state: NavigationState = yield call(load);
  yield put(navLoadSuccess(state));
}
