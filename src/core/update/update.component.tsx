import React, {Fragment, ReactElement, useEffect} from 'react';
import {useModal} from '../modal/modal.hook';
import {useAppSelector} from '../state/state.hook';
import {selectUpdate} from './update.selector';
import UpdateComponentOptional from './update.component.optional';
import UpdateComponentForce from './update.component.force';

export default function UpdateComponent(): ReactElement {
  const force = useModal();
  const optional = useModal();
  const {check, fetch} = useAppSelector(selectUpdate);

  useEffect(() => {
    if (check.status === 'success') {
      if (check.data == 'patch')
        optional.up();
      else if (check.data == 'minor' || check.data === 'major')
        force.up();
    }
  }, [check.status]);

  return (
    <Fragment>
      <UpdateComponentOptional fetch={fetch} modal={optional}/>
      <UpdateComponentForce fetch={fetch} modal={force}/>
    </Fragment>
  );
}
