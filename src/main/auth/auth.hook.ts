import {useAppSelector} from '../../core/state/state.hook';
import {selectAuth} from './auth.selector';

/**
 * Hook to check user authentication.
 */
export function useAuth(): boolean {
  const auth = useAppSelector(selectAuth);
  return !!auth.token;
}
