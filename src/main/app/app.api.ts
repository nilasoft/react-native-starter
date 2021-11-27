import {loadAsync} from 'expo-font';
import {reloadAsync} from 'expo-updates';
import assets from '../../core/common/assets';
import storage from '../../core/common/storage';
import {APP_LOGGING_DEFAULT, APP_LOGGING_KEY} from './app.constants';

export async function init(): Promise<boolean> {
  await loadAsync(assets.font);
  if (!__DEV__)
    return false;
  return storage.get(APP_LOGGING_KEY, APP_LOGGING_DEFAULT);
}

export async function logging(enabled: boolean): Promise<void> {
  await storage.set(APP_LOGGING_KEY, enabled);
}

export async function restart(): Promise<void> {
  await reloadAsync();
}
