import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {StackHeaderLeftButtonProps} from '@react-navigation/stack';
import React, {ReactElement} from 'react';
import {IconButton} from 'react-native-paper';
import {useTheme} from '../../core/theme/theme.hook';
import {MainNavParams} from './app.model';

export function ToggleComponent(props: StackHeaderLeftButtonProps): ReactElement {

  const {colors} = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<MainNavParams>>();

  function onDrawer(): void {
    navigation.openDrawer();
  }

  return (
    <IconButton {...props}
                icon='menu'
                color={colors.grayscale.active}
                onPress={onDrawer}/>
  );

}
