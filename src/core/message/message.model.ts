import {AsyncState} from '../state/state.model';

export interface MessageComponentProps<T> {

  state: AsyncState<T>;

}
