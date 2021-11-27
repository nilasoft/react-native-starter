import {Entity} from '../../core/common/models';
import {AsyncState} from '../../core/state/state.model';

export interface Todo extends Entity<string> {

  title: string;

  body: string;

  complete: AsyncState<boolean>;

}
