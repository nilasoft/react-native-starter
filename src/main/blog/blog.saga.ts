import {SagaIterator} from 'redux-saga';
import {call, fork, put, race, take} from 'redux-saga/effects';
import {blogFetchCancel, blogFetchFailure, blogFetchRequest, blogFetchSuccess} from './blog.action';
import {fetch} from './blog.api';
import {Blog} from './blog.model';

export default function* (): SagaIterator {
  yield fork(watchFetch);
}

function* watchFetch(): SagaIterator {
  while (true) {
    yield take(blogFetchRequest);
    yield race([
      call(handleFetchRequest),
      take(blogFetchCancel)
    ]);
  }
}

function* handleFetchRequest(): SagaIterator {
  try {
    let blog: Blog = yield call(fetch);
    yield put(blogFetchSuccess(blog));
  } catch (err) {
    yield put(blogFetchFailure(err));
  }
}
