import React, {ReactElement, useContext, useMemo} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {useAppSelector} from '../../../core/state/state.hook';
import {UserContext} from '../blog.context';
import {selectBlogUser} from '../blog.selector';

export default function UserScreen(): ReactElement {

  const route = useContext(UserContext);
  const user = useAppSelector(selectBlogUser(route.params.id));
  const json = useMemo(() => JSON.stringify(user, null, 2), [user]);

  return (
    <View>
      <Text>{json}</Text>
    </View>
  );

}
