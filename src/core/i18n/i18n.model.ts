import {AsyncState} from '../state/state.model';

export interface I18n {

  init: AsyncState;

  change: AsyncState;

}

export enum Lang {

  EN_US = 'en-US',

  FA_IR = 'fa-IR'

}

export interface Message {

  key: string;

  params?: Record<string, any>;

}
