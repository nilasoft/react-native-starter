import {selector} from '../../core/state/state.util';

export const selectAuth = selector(state => state.auth)();

export const selectAuthToken = selector(state => state.auth.token)();
