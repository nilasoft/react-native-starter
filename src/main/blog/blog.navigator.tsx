import {createStackNavigator} from '@react-navigation/stack';
import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {useStackOptions} from '../app/app.hook';
import {ToggleComponent} from '../app/toggle.component';
import {BlogNavParams} from './blog.model';
import UserNavigator from './user/user.navigator';
import UsersScreen from './users/users.screen';

const Stack = createStackNavigator<BlogNavParams>();

export default function BlogNavigator(): ReactElement {

  const {t} = useTranslation();
  const options = useStackOptions();

  return (
    <Stack.Navigator initialRouteName='Users'
                     screenOptions={options}>
      <Stack.Screen name='Users'
                    component={UsersScreen}
                    options={{
                      title: t('blog.users'),
                      headerLeft: props => <ToggleComponent {...props}/>
                    }}/>
      <Stack.Screen name='User'
                    component={UserNavigator}
                    options={{headerShown: false}}/>
    </Stack.Navigator>
  );

}
