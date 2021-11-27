import _ from 'lodash';
import React, {ReactElement} from 'react';
import {View} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {tw} from 'react-native-tailwindcss';
import {Entity} from '../../../core/common/models';
import {useAppSelector} from '../../../core/state/state.hook';
import {selectBlogPhoto} from '../blog.selector';

export default function PhotoComponent(props: Entity): ReactElement {

  const photo = useAppSelector(selectBlogPhoto(props.id));

  return (
    <View style={[tw.pX2, tw.pY1]}>
      <Card onPress={_.noop}>
        <Card.Cover source={{uri: photo.url}}/>
        <Card.Content>
          <Title>{photo.title}</Title>
        </Card.Content>
      </Card>
    </View>
  );

}
