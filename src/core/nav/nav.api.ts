import {NavigationState} from '@react-navigation/native';
import storage from '../common/storage';
import {NAV_KEY} from './nav.constant';

export async function load(): Promise<NavigationState> {
  // Load navigation history only in development mode.
  if (!__DEV__)
    return null;
  return storage.get(NAV_KEY);
}

export async function save(state: NavigationState): Promise<void> {
  // Save navigation history only in development mode.
  if (!__DEV__)
    return;
  await storage.set(NAV_KEY, state);
}
