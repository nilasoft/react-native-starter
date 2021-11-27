import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Formik} from 'formik';
import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {tw} from 'react-native-tailwindcss';
import DevMenuComponent from '../app/dev-menu.component';
import {MessageComponent} from '../../core/message/message.component';
import {useAppDispatch, useAppSelector} from '../../core/state/state.hook';
import {authLoginRequest} from './auth.action';
import {AuthNavParams, Credentials} from './auth.model';
import {selectAuth} from './auth.selector';
import ScreenComponent from "../../shared/components/layouts/screen.component";

export default function LoginScreen(): ReactElement {

  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<AuthNavParams>>();
  const {login} = useAppSelector(selectAuth);
  const request = login.status === 'request';

  function onSubmit(credentials: Credentials): void {
    dispatch(authLoginRequest(credentials));
  }

  function onRegister(): void {
    navigation.navigate('Register');
  }

  return (

    <ScreenComponent>
      {__DEV__ && <DevMenuComponent/>}
      <Formik initialValues={{username: '', password: ''}}
              onSubmit={onSubmit}>
        {props => (
          <View style={tw.pY4}>
            <TextInput style={tw.mB3}
                       label={t('username')}
                       value={props.values.username}
                       onChangeText={props.handleChange('username')}/>
            <TextInput style={tw.mB3}
                       label={t('password')}
                       secureTextEntry
                       value={props.values.password}
                       onChangeText={props.handleChange('password')}/>
            <Button mode='contained'
                    style={tw.mT1}
                    contentStyle={tw.h12}
                    loading={request}
                    disabled={request}
                    onPress={props.handleSubmit}>
              {t('submit')}
            </Button>
            <Button style={tw.mT4}
                    disabled={request}
                    onPress={onRegister}>
              {t('register')}
            </Button>
          </View>
        )}
      </Formik>
      <MessageComponent state={login}/>
    </ScreenComponent>
  );

}
