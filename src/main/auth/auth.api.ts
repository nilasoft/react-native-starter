import Axios, {CancelToken} from 'axios';
import delay from 'delay';
import client from '../../core/common/client';
import {Storage} from '../../core/common/storage';
import {AUTH_TOKEN_KEY} from './auth.constants';
import {Credentials} from './auth.model';

const storage = new Storage('auth', true);

export async function load(): Promise<string> {
  return storage.get(AUTH_TOKEN_KEY);
}

export async function register(credentials: Credentials, cancelToken: CancelToken): Promise<void> {
  if (!credentials.username || !credentials.password)
    throw new Error('No credentials!');
  try {
    await client.post('/register', credentials, {cancelToken});
  } catch (err) {
    if (!Axios.isCancel(err))
      throw err;
  }
}

export async function login(credentials: Credentials): Promise<string> {
  if (!credentials.username || !credentials.password)
    throw new Error('No credentials!');
  await delay(1000);
  let token = 'TOKEN';
  await storage.set(AUTH_TOKEN_KEY, token);
  return token;
}

export async function logout(): Promise<void> {
  await storage.remove(AUTH_TOKEN_KEY);
}
