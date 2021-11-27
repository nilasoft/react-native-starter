import {AsyncState} from '../../core/state/state.model';

export interface Auth {

  token: string;

  load: AsyncState;

  register: AsyncState;

  login: AsyncState;

  logout: AsyncState;

}

export interface Credentials {

  username: string;

  password: string;

}

export type AuthNavParams = {
  Login: undefined;
  Register: undefined;
};
