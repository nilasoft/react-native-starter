import faker from 'faker/locale/en';
import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, View} from 'react-native';
import {FAB, Text} from 'react-native-paper';
import {tw} from 'react-native-tailwindcss';
import {useAppDispatch, useAppSelector} from '../../core/state/state.hook';
import {useTheme} from '../../core/theme/theme.hook';
import {TodoComponent} from './todo.component';
import {todosAdd} from './todos.action';
import {selectTodos} from './todos.selector';

export default function TodosComponent(): ReactElement {

  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);

  function onAdd(): void {
    dispatch(todosAdd({
      title: faker.name.title(),
      body: faker.lorem.paragraph()
    }));
  }

  return (
    <View style={tw.flex1}>
      {todos.length ? (
        <FlatList style={tw.flex1}
                  data={todos}
                  keyExtractor={item => item.id}
                  renderItem={info => <TodoComponent id={info.item.id}/>}/>
      ) : (
        <View style={[tw.flex1, tw.itemsCenter, tw.justifyCenter]}>
          <Text>{t('empty')}</Text>
        </View>
      )}
      <FAB icon='plus'
           color={colors.grayscale.white}
           style={[tw.absolute, tw.right0, tw.bottom0, tw.m4,{backgroundColor: colors.grayscale.active}]}
           onPress={onAdd}/>
    </View>
  );

}
