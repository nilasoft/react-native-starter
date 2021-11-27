import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {ReactElement, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {tw} from 'react-native-tailwindcss';
import {useAppSelector} from '../../../core/state/state.hook';
import {selectBlogPost, selectBlogPostCommentList} from '../blog.selector';
import CommentComponent from './comment.component';
import {UserNavParams} from './user.model';

export default function CommentsScreen(): ReactElement {

  const route = useRoute<RouteProp<UserNavParams, 'Comments'>>();
  const navigation = useNavigation<StackNavigationProp<UserNavParams>>();
  const post = useAppSelector(selectBlogPost(route.params.id));
  const comments = useAppSelector(state => selectBlogPostCommentList(state, route.params.id));

  useEffect(() => {
    navigation.setOptions({title: post.title});
  }, [post]);

  return (
    <FlatList style={tw.flex1}
              data={comments}
              keyExtractor={item => String(item.id)}
              renderItem={info => <CommentComponent id={info.item.id}/>}
              ListHeaderComponent={<View style={tw.h1}/>}
              ListFooterComponent={<View style={tw.h1}/>}/>
  );

}
