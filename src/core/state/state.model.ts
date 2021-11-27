import {NavigationState} from '@react-navigation/native';
import {Dispatch, EnhancedStore, PayloadAction} from '@reduxjs/toolkit';
import {App} from '../../main/app/app.model';
import {Auth} from '../../main/auth/auth.model';
import {Blog} from '../../main/blog/blog.model';
import {I18n} from '../i18n/i18n.model';
import {Prefs} from '../../main/prefs/prefs.model';
import {Theme} from '../theme/theme.model';
import {Todo} from '../../main/todos/todos.model';
import {Update} from '../update/update.model';
import {Sentry} from '../sentry/sentry.model';

/**
 * Type of the root state that will be inferred from store reducers.
 *
 * @example
 * const feature = useAppSelector(state => state.feature);
 */
export interface AppState {

  app: App,

  auth: Auth;

  todos: Todo[];

  blog: AsyncState<Blog>;

  core: CoreState

}


export interface CoreState{

  prefs: Prefs;

  i18n: I18n;

  theme: Theme;

  nav: AsyncState<NavigationState>;

  update: Update;

  sentry: Sentry

}

/**
 * Type of the main redux store.
 *
 * @example
 * const store = useAppStore();
 */
export type AppStore = EnhancedStore<AppState>;

/**
 * Type of the redux dispatch function.
 *
 * @example
 * const dispatch = useAppDispatch();
 */
export type AppDispatch = Dispatch;

/**
 * Redux action type for failures.
 * Errors must be `string`.
 * Can be used in reducers.
 *
 * @template P Payload type, default `void`.
 *
 * @example
 * [featureActionFailure.type]: (state, action: FailureAction) => {
 *  state.error = payload.error;
 * }
 */
export type FailureAction<P = never, E = string, M = never> = PayloadAction<P, string, M, E>;

/**
 * Status types for async actions like fetching data from back-end.
 * Can be used in feature models.
 *
 * @example
 * interface Feature {
 *   data: FeatureData;
 *   status: AsyncStatus;
 * }
 */
export type AsyncStatus = 'request' | 'cancel' | 'success' | 'failure';

/**
 * A generic model for states that have an async action with failure possibility.
 * Can be used in feature models.
 *
 * @template T Data type.
 * @template S Status type, default `AsyncStatus`.
 * @template E Error type (must be string), default `string`.
 *
 * @example
 * interface Home {
 *   users: AsyncState<User[]>;
 * }
 */
export interface AsyncState<T = never, S = AsyncStatus, E = string> {

  /**
   * Action status.
   */
  status?: S;

  /**
   * Action result.
   */
  data?: T;

  /**
   * Action error message.
   */
  error?: E;

}
