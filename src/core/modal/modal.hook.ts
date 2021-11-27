import _ from 'lodash';
import {useMemo} from 'react';
import {useFlag} from '../flag/flag.hook';
import {ModalHandler} from './modal.model';

export function useModal(initial = false): ModalHandler {
  const flag = useFlag(initial);
  return useMemo(() => _.assign({}, flag), [flag]);
}
