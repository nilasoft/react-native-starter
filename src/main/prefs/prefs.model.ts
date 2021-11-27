import {AsyncState} from '../../core/state/state.model';

export interface Prefs {

  data: PrefsData;

  load: AsyncState;

  update: AsyncState;

}

export interface PrefsData {

}

export type PrefsNavParams = {
  Prefs: undefined;
};
