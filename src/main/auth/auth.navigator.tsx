import {createStackNavigator} from '@react-navigation/stack';
import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {useStackOptions} from '../app/app.hook';
import {AuthNavParams} from './auth.model';
import LoginScreen from './login.screen';
import RegisterScreen from './register.screen';

const Stack = createStackNavigator<AuthNavParams>();

export default function AuthNavigator(): ReactElement {

  const {t} = useTranslation();
  const options = useStackOptions();

  return (
    <Stack.Navigator initialRouteName='Login'
                     screenOptions={options}>
      <Stack.Screen name='Login'
                    component={LoginScreen}
                    options={{title: t('login')}}/>
      <Stack.Screen name='Register'
                    component={RegisterScreen}
                    options={{title: t('register')}}/>
    </Stack.Navigator>
  );

}
