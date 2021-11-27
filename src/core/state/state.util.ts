import {ParametricSelector, Selector} from '@reduxjs/toolkit';
import {AppState} from './state.model';

/**
 * Creates a preparation function for failure actions that maps payload.
 *
 * @template P Payload type, default `void`.
 *
 * @example
 * // Definition
 * const featureActionFailure = createAction('feature/action/failure', failure());
 * // Usage
 * let err = new Error('reason');
 * dispatch(featureActionFailure(err));
 */
export function failure<P = void>(): (error: Error, payload: P) => { payload: P; error: string; } {
  return (error, payload) => ({
    payload,
    error: error?.message
  });
}

/**
 * Creates a selector function for deriving data from the root state.
 *
 * @template R Result type, will be inferred automatically.
 * @template P Props type, default `void`.
 * @template S Root state type, default `AppState`.
 *
 * @example
 * // With no params, notice closing parenthesis...
 * const selectFeature = selector(state => state.feature)(); // Definition
 * const feature = useAppSelector(selectFeature); // Usage
 * // With params...
 * const selectFeatureItem = selector((state, id: string) => state.feature[id]);
 * const featureItem = useAppSelector(selectFeature(id)); // Usage
 */
export function selector<R, P = void, S = AppState>(
  sel: ParametricSelector<S, P, R>
): (props: P, ...args: any[]) => Selector<S, R> {
  return (props, ...args) => state => sel(state, props, ...args);
}

/**
 * Creates a selector for `reselect` library that just passes the props.

 * @template P Props type.
 * @template S Root state type, default `AppState`.
 *
 * @example
 * const selectFeatureItem = createSelector(
 *  selectFeature,
 *  passProps<string>(),
 *  (feature, id) => feature[id]
 * );
 */
export function passProps<P, S = AppState>(): ParametricSelector<S, P, P> {
  return (state, props) => props;
}
