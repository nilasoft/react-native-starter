import {createStackNavigator} from '@react-navigation/stack';
import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {useStackOptions} from '../app/app.hook';
import {ToggleComponent} from '../app/toggle.component';
import {HomeNavParams} from './home.model';
import HomeScreen from './home.screen';

const Stack = createStackNavigator<HomeNavParams>();

export default function HomeNavigator(): ReactElement {

  const {t} = useTranslation();
  const options = useStackOptions();

  return (
    <Stack.Navigator initialRouteName='Home'
                     screenOptions={options}>
      <Stack.Screen name='Home'
                    component={HomeScreen}
                    options={{
                      title: t('home'),
                      headerLeft: props => <ToggleComponent {...props}/>
                    }}/>
    </Stack.Navigator>
  );

}
