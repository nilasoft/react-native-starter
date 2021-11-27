import {Flag} from '../flag/flag.model';

export interface ModalComponentProps {

  title: string;

  subtitle?: string;


  closable?: boolean;

  handler: ModalHandler;

  actions?: ModalAction[];

}

export interface ModalHandler extends Flag {

}

export interface ModalAction {

  title: string;

  color?: string;

  disabled?: boolean;

  loading?: boolean;

  mode: 'text' | 'contained';

  handle: () => void;

}
