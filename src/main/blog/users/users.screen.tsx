import React, {ReactElement, useEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {Divider} from 'react-native-paper';
import {tw} from 'react-native-tailwindcss';
import {MessageComponent} from '../../../core/message/message.component';
import {useAppDispatch, useAppSelector} from '../../../core/state/state.hook';
import {blogFetchRequest} from '../blog.action';
import {selectBlog, selectBlogUserList} from '../blog.selector';
import {UserComponent} from './user.component';
import ScreenComponent from "../../../shared/components/layouts/screen.component";

export default function UsersScreen(): ReactElement {

  const dispatch = useAppDispatch();
  const blog = useAppSelector(selectBlog);
  const users = useAppSelector(selectBlogUserList);

  useEffect(() => {
    onFetch();
  }, []);

  function onFetch(): void {
    dispatch(blogFetchRequest());
  }

  return (
    <ScreenComponent style={tw.pX0}>
      <FlatList style={tw.flex1}
                data={users}
                keyExtractor={item => String(item.id)}
                renderItem={info => <UserComponent id={info.item.id}/>}
                ItemSeparatorComponent={Divider}
                refreshControl={
                  <RefreshControl refreshing={blog.status === 'request'}
                                  onRefresh={onFetch}/>
                }/>
      <MessageComponent state={blog}/>
    </ScreenComponent>
  );

}
