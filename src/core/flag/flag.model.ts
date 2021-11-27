import {Dispatch, SetStateAction} from 'react';

export interface Flag {

  readonly state: boolean;

  readonly not: boolean;

  set: Dispatch<SetStateAction<boolean>>;

  toggle: () => void;

  down: () => void;

  up: () => void;

}
