import React, {Fragment, ReactElement} from 'react';
import ModalComponent from '../modal/modal.component';
import {MessageComponent} from '../message/message.component';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../theme/theme.hook';
import {updateFetchCancel, updateFetchRequest} from './update.action';
import {useAppDispatch} from '../state/state.hook';
import {UpdateComponentProps} from './update.model';
import Text from '../../shared/components/base/text.component';

export default function UpdateComponentOptional(props: UpdateComponentProps): ReactElement {
  const {t} = useTranslation();
  const {colors, fonts} = useTheme();
  const dispatch = useAppDispatch();

  const fetching = props.fetch.status === 'request';


  function onUpdate(): void {
    dispatch(updateFetchRequest());
  }

  function onLater(): void {
    if (fetching) dispatch(updateFetchCancel());
    props.modal.down();
  }

  return <Fragment>
    <ModalComponent
      handler={props.modal}
      title={t('core.update.optional.title')}
      subtitle={t('core.update.optional.subtitle')}
      actions={[
        {
          title: t('core.update.optional.not-now'),
          color: colors.primary.default,
          mode: 'text',
          handle: onLater
        },
        {
          title: t('core.update.optional.update'),
          loading: fetching,
          mode: 'contained',
          handle: onUpdate
        }
      ]}
    >
      <Text
        color={colors.grayscale.medium_emphasis}
        style={[fonts.Body1]}
        title={t('core.update.optional.message')}/>
    </ModalComponent>
    <MessageComponent state={props.fetch}/>
  </Fragment>;
}
