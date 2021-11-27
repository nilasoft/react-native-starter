import Constants from 'expo-constants';
import { checkForUpdateAsync, fetchUpdateAsync } from 'expo-updates';
import { diff, ReleaseType, SemVer } from 'semver';

export async function check(): Promise<ReleaseType> {
  if (__DEV__) return null;
  try {
    let update = await checkForUpdateAsync();
    if (update.isAvailable) {
      let current = new SemVer(Constants.manifest.version);
      let available = new SemVer(update.manifest.version);
      return diff(current, available);
    }
  } catch (err) {
    console.warn(err.message);
  }
  return null;
}

/**
 * @return {boolean} Should reload the app or not?
 */
export async function fetch(): Promise<boolean> {
  try {
    await fetchUpdateAsync();
    return true;
  }catch (err){
    throw new Error('UPDATE_FAILED');
  }
}
