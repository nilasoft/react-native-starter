import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Formik} from 'formik';
import React, {ReactElement, useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {tw} from 'react-native-tailwindcss';
import * as yup from 'yup';
import {MessageComponent} from '../../core/message/message.component';
import {useAppDispatch, useAppSelector} from '../../core/state/state.hook';
import {authRegisterCancel, authRegisterRequest} from './auth.action';
import {AuthNavParams, Credentials} from './auth.model';
import {selectAuth} from './auth.selector';
import ScreenComponent from "../../shared/components/layouts/screen.component";

export default function RegisterScreen(): ReactElement {

  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {register} = useAppSelector(selectAuth);
  const navigation = useNavigation<StackNavigationProp<AuthNavParams>>();
  const validator = useMemo(() => yup.object({
    // @ts-ignore
    username: yup.string().min(6).required(),
    // @ts-ignore
    password: yup.string().min(6).required()
  }), []);
  const request = register.status === 'request';

  useEffect(() => {
    if (register.status === 'success')
      onLogin();
  }, [register.status]);

  function onSubmit(credentials: Credentials): void {
    dispatch(authRegisterRequest(credentials));
  }

  function onCancel(): void {
    dispatch(authRegisterCancel());
  }

  function onLogin(): void {
    navigation.navigate('Login');
  }

  return (
    <ScreenComponent>
      <Formik initialValues={{username: '', password: ''}}
              validationSchema={validator}
              onSubmit={onSubmit}>
        {props => (
          <View style={tw.pY4}>
            <View>
              <TextInput label={t('username')}
                         value={props.values.username}
                         onChangeText={props.handleChange('username')}
                         onBlur={props.handleBlur('username')}/>
              <HelperText type='error'
                          visible={props.touched.username && !!props.errors.username}>
                {props.errors.username}
              </HelperText>
            </View>
            <View>
              <TextInput secureTextEntry
                         label={t('password')}
                         value={props.values.password}
                         onChangeText={props.handleChange('password')}
                         onBlur={props.handleBlur('password')}/>
              <HelperText type='error'
                          visible={props.touched.password && !!props.errors.password}>
                {props.errors.password}
              </HelperText>
            </View>
            <Button mode='contained'
                    style={tw.mT1}
                    contentStyle={tw.h12}
                    loading={request}
                    onPress={request ? onCancel : props.handleSubmit}>
              {request ? t('cancel') : t('submit')}
            </Button>
            <Button style={tw.mT4}
                    disabled={request}
                    onPress={onLogin}>
              {t('login')}
            </Button>
          </View>
        )}
      </Formik>
      <MessageComponent state={register}/>
    </ScreenComponent>
  );

}
