import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import _ from 'lodash';
import React, {ReactElement, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, View} from 'react-native';
import {Button, List} from 'react-native-paper';
import {tw} from 'react-native-tailwindcss';
import {Entity} from '../../../core/common/models';
import {useAppSelector} from '../../../core/state/state.hook';
import {useTheme} from '../../../core/theme/theme.hook';
import {selectBlogAlbum, selectBlogAlbumPhotoList} from '../blog.selector';
import {UserNavParams} from './user.model';

export default function AlbumComponent(props: Entity): ReactElement {

  const {colors} = useTheme();
  const {t} = useTranslation();
  const album = useAppSelector(selectBlogAlbum(props.id));
  const navigation = useNavigation<StackNavigationProp<UserNavParams>>();

  function onPhotos(): void {
    navigation.navigate('Photos', {id: album.id});
  }

  return (
    <List.Item title={album.title}
               titleNumberOfLines={null}
               left={p => (
                 <View {...p}
                       style={tw.justifyCenter}>
                   <AlbumThumbnailComponent id={props.id}/>
                 </View>
               )}
               right={p => (
                 <View {...p}
                       style={tw.justifyCenter}>
                   <Button color={colors.grayscale.active}
                           onPress={onPhotos}>
                     {t('blog.photos')}
                   </Button>
                 </View>
               )}
               onPress={_.noop}/>
  );

}

export function AlbumThumbnailComponent(props: AlbumThumbnailComponentProps): ReactElement {

  const {colors} = useTheme();
  const photos = useAppSelector(state => selectBlogAlbumPhotoList(state, props.id));
  const samples = useMemo(() => _.take(photos, 4), []);

  return (
    <View style={[
      tw.w20,
      tw.h20,
      tw.flexRow,
      tw.flexWrap,
      tw.rounded,
      tw.overflowHidden,
      {backgroundColor: colors.grayscale.active}
    ]}>
      {samples.map((sample, index) => (
        <Image key={index}
               source={{uri: sample.thumbnailUrl}}
               style={[tw.w10, tw.h10]}/>
      ))}
    </View>
  );

}

export interface AlbumThumbnailComponentProps {

  id: number;

}
