import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {ReactElement, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {tw} from 'react-native-tailwindcss';
import {useAppSelector} from '../../../core/state/state.hook';
import {selectBlogAlbum, selectBlogAlbumPhotoList} from '../blog.selector';
import PhotoComponent from './photo.component';
import {UserNavParams} from './user.model';

export default function PhotosScreen(): ReactElement {

  const route = useRoute<RouteProp<UserNavParams, 'Photos'>>();
  const navigation = useNavigation<StackNavigationProp<UserNavParams>>();
  const album = useAppSelector(selectBlogAlbum(route.params.id));
  const photos = useAppSelector(state => selectBlogAlbumPhotoList(state, route.params.id));

  useEffect(() => {
    navigation.setOptions({title: album.title});
  }, [album]);

  return (
    <FlatList style={tw.flex1}
              data={photos}
              keyExtractor={item => String(item.id)}
              renderItem={info => <PhotoComponent id={info.item.id}/>}
              ListHeaderComponent={<View style={tw.h1}/>}
              ListFooterComponent={<View style={tw.h1}/>}/>
  );

}
