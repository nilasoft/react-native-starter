import React, {ReactElement, useContext} from 'react';
import {FlatList, View} from 'react-native';
import {tw} from 'react-native-tailwindcss';
import {useAppSelector} from '../../../core/state/state.hook';
import {UserContext} from '../blog.context';
import {selectBlogUserPostList} from '../blog.selector';
import PostComponent from './post.component';
import ScreenComponent from '../../../shared/components/layouts/screen.component';

export default function PostsScreen(): ReactElement {

  const route = useContext(UserContext);
  const posts = useAppSelector(state => selectBlogUserPostList(state, route.params.id));

  return (
    <ScreenComponent style={tw.pX0}>
      <FlatList style={tw.flex1}
                data={posts}
                keyExtractor={item => String(item.id)}
                renderItem={info => <PostComponent id={info.item.id}/>}
                ListHeaderComponent={<View style={tw.h1}/>}
                ListFooterComponent={<View style={tw.h1}/>}/>
    </ScreenComponent>
  );

}
