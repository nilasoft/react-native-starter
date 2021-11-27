import { ReleaseType } from 'semver';
import { AsyncState } from '../state/state.model';
import {Flag} from '../flag/flag.model';

export interface Update {
  check: AsyncState<ReleaseType>;

  fetch: AsyncState;
}


export interface UpdateComponentProps {

  fetch: AsyncState;

  modal: Flag;
}
