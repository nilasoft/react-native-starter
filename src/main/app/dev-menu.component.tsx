import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {ReactElement, useEffect, useState} from 'react';
import {GestureResponderEvent} from 'react-native';
import {IconButton, Menu} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../core/state/state.hook';
import {useTheme} from '../../core/theme/theme.hook';
import {appLogging} from './app.action';
import {selectApp} from './app.selector';

export default function DevMenuComponent(): ReactElement {

  const theme = useTheme();
  const dispatch = useAppDispatch();
  const app = useAppSelector(selectApp);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [menu, setMenu] = useState<Point>(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: props => (
        <IconButton {...props}
                    icon='dots-vertical'
                    color={theme.colors.primary.on}
                    onPress={onMenuOpen}/>
      )
    });
  }, []);

  function onMenuOpen(event: GestureResponderEvent): void {
    setMenu({
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY
    });
  }

  function onMenuClose(): void {
    setMenu(null);
  }

  function onLogging(): void {
    dispatch(appLogging(!app.logging));
    onMenuClose();
  }

  return (
    <Menu visible={!!menu}
          anchor={menu}
          onDismiss={onMenuClose}>
      <Menu.Item title={`Turn ${app.logging ? 'Off' : 'On'} Logging`}
                 onPress={onLogging}/>
    </Menu>
  );

}

export interface Point {

  x: number;

  y: number;

}
