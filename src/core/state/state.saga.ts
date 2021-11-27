import {SagaIterator} from 'redux-saga';
import {fork} from 'redux-saga/effects';
import app from '../../main/app/app.saga';
import auth from '../../main/auth/auth.saga';
import blog from '../../main/blog/blog.saga';
import i18n from '../i18n/i18n.saga';
import nav from '../nav/nav.saga';
import prefs from '../../main/prefs/prefs.saga';
import theme from '../theme/theme.saga';
import todos from '../../main/todos/todos.saga';
import update from '../update/update.saga';
import sentry from '../sentry/sentry.saga';

export default function* (): SagaIterator {
  yield fork(app);
  yield fork(prefs);
  yield fork(i18n);
  yield fork(theme);
  yield fork(nav);
  yield fork(auth);
  yield fork(update);
  yield fork(todos);
  yield fork(blog);
  yield fork(sentry);
}
