import Axios from 'axios';
import _ from 'lodash';
import {format} from 'url';
import {selectAuthToken} from '../../main/auth/auth.selector';
import {AppStore} from '../state/state.model';
import {env} from '../../env';
import {sentryHttpFailure, sentryHttpRequest} from "../sentry/sentry.service";

/**
 * Backend base url.
 */
const API_URL = format(env.urls.api);

/**
 * Create an `axios` instance with base url.
 *
 * @example
 * let {data} = await client.get<ResponseType>('/path');
 */
const client = Axios.create({
  baseURL: API_URL,
  timeout: 10000
});

/**
 * Call this when redux store configuration is node.
 * Add a interceptor to the client to get auth token from redux store,
 * and put it in every http request.
 */
export function registerStore(store: AppStore): void {
  client.interceptors.request.use(config => {
    //log sentry
    if (config.method === 'POST' || config.method === 'post' || config.method === 'PUT' || config.method === 'put' || config.method === 'PATCH' || config.method === 'patch')
      sentryHttpRequest(config.method, config.url, config.data);

    //token
    let state = store.getState();
    let token = selectAuthToken(state);
    if (!token)
      return config;
    return _.merge({}, config, {
      headers: {
        AUTHENTICATION: token
      }
    });
  });

  //log sentry
  client.interceptors.response.use((response) => response, error => {
    const err = JSON.parse(JSON.stringify(error));
    if (error.response?.status >= 400)
      sentryHttpFailure(err.config.method, err.config.url, error.response.status, err.message)
    return error;
  });
}

export default client;
