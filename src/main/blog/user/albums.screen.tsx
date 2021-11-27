import React, {ReactElement, useContext} from 'react';
import {FlatList} from 'react-native';
import {Divider} from 'react-native-paper';
import {tw} from 'react-native-tailwindcss';
import {useAppSelector} from '../../../core/state/state.hook';
import {UserContext} from '../blog.context';
import {selectBlogUserAlbumList} from '../blog.selector';
import AlbumComponent from './album.component';

export default function AlbumsScreen(): ReactElement {

  const route = useContext(UserContext);
  const albums = useAppSelector(state => selectBlogUserAlbumList(state, route.params.id));

  return (
    <FlatList style={tw.flex1}
              data={albums}
              keyExtractor={item => String(item.id)}
              renderItem={info => <AlbumComponent id={info.item.id}/>}
              ItemSeparatorComponent={Divider}/>
  );

}
