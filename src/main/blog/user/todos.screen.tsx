import React, {ReactElement, useContext} from 'react';
import {FlatList} from 'react-native';
import {Divider} from 'react-native-paper';
import {tw} from 'react-native-tailwindcss';
import {useAppSelector} from '../../../core/state/state.hook';
import {UserContext} from '../blog.context';
import {selectBlogUserTodoList} from '../blog.selector';
import TodoComponent from './todo.component';

export default function TodosScreen(): ReactElement {

  const route = useContext(UserContext);
  const todos = useAppSelector(state => selectBlogUserTodoList(state, route.params.id));

  return (
    <FlatList style={tw.flex1}
              data={todos}
              initialNumToRender={20}
              keyExtractor={item => String(item.id)}
              renderItem={info => <TodoComponent id={info.item.id}/>}
              ItemSeparatorComponent={Divider}/>
  );

}
