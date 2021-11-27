import {combineReducers} from '@reduxjs/toolkit';
import app from '../../main/app/app.reducer';
import auth from '../../main/auth/auth.reducer';
import blog from '../../main/blog/blog.reducer';
import i18n from '../i18n/i18n.reducer';
import nav from '../nav/nav.reducer';
import prefs from '../../main/prefs/prefs.reducer';
import theme from '../theme/theme.reducer';
import todos from '../../main/todos/todos.reducer';
import update from '../update/update.reducer';
import sentry from '../sentry/sentry.reducer';
import {AppState, CoreState} from './state.model';

const core = combineReducers<CoreState>({
  prefs,
  i18n,
  theme,
  nav,
  update,
  sentry
})

export default combineReducers<AppState>({
  app,
  auth,
  todos,
  blog,
  core
});
