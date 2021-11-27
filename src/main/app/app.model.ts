import {Message} from '../../core/i18n/i18n.model';
import {AsyncState} from '../../core/state/state.model';

export interface App {

  logging: boolean;

  init: AsyncState;

  error: Message;

}

export type AppNavParams = {
  Main: undefined;
  Auth: undefined;
};

export type MainNavParams = {
  Home: undefined;
  Blog: undefined;
  Prefs: undefined;
};
