import {createStackNavigator} from '@react-navigation/stack';
import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {useStackOptions} from '../app/app.hook';
import {ToggleComponent} from '../app/toggle.component';
import {PrefsNavParams} from './prefs.model';
import PrefsScreen from './prefs.screen';

const Stack = createStackNavigator<PrefsNavParams>();

export default function PrefsNavigator(): ReactElement {

  const {t} = useTranslation();
  const options = useStackOptions();

  return (
    <Stack.Navigator initialRouteName='Prefs'
                     screenOptions={options}>
      <Stack.Screen name='Prefs'
                    component={PrefsScreen}
                    options={{
                      title: t('preferences'),
                      headerLeft: props => <ToggleComponent {...props}/>
                    }}/>
    </Stack.Navigator>
  );

}
