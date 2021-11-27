import React, {ReactElement} from 'react';
import {View} from 'react-native';
import {tw} from 'react-native-tailwindcss';
import DevMenuComponent from '../app/dev-menu.component';
import TodosComponent from '../todos/todos.component';
import HeaderComponent from './header.component';

export default function HomeScreen(): ReactElement {

  return (
    <View style={tw.flex1}>
      {__DEV__ && <DevMenuComponent/>}
      <HeaderComponent/>

      <TodosComponent/>
    </View>
  );

}
