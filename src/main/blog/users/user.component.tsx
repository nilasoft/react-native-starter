import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import _ from 'lodash';
import React, {ReactElement} from 'react';
import {View} from 'react-native';
import {Avatar, List} from 'react-native-paper';
import {tw} from 'react-native-tailwindcss';
import {Entity} from '../../../core/common/models';
import {useRTL} from '../../../core/i18n/i18n.hook';
import {useAppSelector} from '../../../core/state/state.hook';
import {useTheme} from '../../../core/theme/theme.hook';
import {BlogNavParams} from '../blog.model';
import {selectBlogUser} from '../blog.selector';

export function UserComponent(props: Entity): ReactElement {

  const rtl = useRTL();
  const {colors} = useTheme();
  const user = useAppSelector(selectBlogUser(props.id));
  const navigation = useNavigation<StackNavigationProp<BlogNavParams>>();
  const label = _.toUpper(user.name[0] + user.name[user.name.length - 1]);

  function onUser(): void {
    navigation.navigate('User', {id: props.id});
  }

  return (
    <List.Item title={user.name}
               description={user.email}
               descriptionNumberOfLines={1}
               left={p => (
                 <Avatar.Text {...p}
                              label={label}
                              style={{backgroundColor: colors.grayscale.bg}}/>
               )}
               right={p => (
                 <View {...p}
                       style={tw.justifyCenter}>
                   <List.Icon icon={rtl ? 'chevron-left' : 'chevron-right'}/>
                 </View>
               )}
               onPress={onUser}/>
  );

}
