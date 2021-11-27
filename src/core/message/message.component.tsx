import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {Snackbar} from 'react-native-paper';
import {useFailureEffect} from '../common/hooks';
import {useFlag} from '../flag/flag.hook';
import {MessageComponentProps} from './message.model';

export function MessageComponent<T>(props: MessageComponentProps<T>): ReactElement {

  const snackbar = useFlag();
  const {t} = useTranslation();
  const {error} = props.state;

  useFailureEffect(props.state, () => {
    snackbar.up();
    return false;
  });

  return (
    <Snackbar duration={3000}
              visible={snackbar.state}
              onDismiss={snackbar.down}
              action={{
                label: t('close'),
                onPress: snackbar.down
              }}>
      {error}
    </Snackbar>
  );

}
