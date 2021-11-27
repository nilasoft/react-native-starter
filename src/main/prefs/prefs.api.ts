import _ from 'lodash';
import storage from '../../core/common/storage';
import {PREFS_DEFAULT, PREFS_KEY} from './prefs.constant';
import {PrefsData} from './prefs.model';

export async function load(): Promise<PrefsData> {
  return storage.get(PREFS_KEY, PREFS_DEFAULT);
}

export async function update(prefs: Partial<PrefsData>): Promise<PrefsData> {
  let old = await load();
  let updated = _.merge({}, old, prefs);
  await storage.set(PREFS_KEY, updated);
  return updated;
}
