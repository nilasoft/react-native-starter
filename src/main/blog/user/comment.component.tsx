import _ from 'lodash';
import React, {ReactElement} from 'react';
import {View} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import {tw} from 'react-native-tailwindcss';
import {Entity} from '../../../core/common/models';
import {useAppSelector} from '../../../core/state/state.hook';
import {selectBlogComment} from '../blog.selector';

export default function CommentComponent(props: Entity): ReactElement {

  const comment = useAppSelector(selectBlogComment(props.id));

  return (
    <View style={[tw.pX2, tw.pY1]}>
      <Card onPress={_.noop}>
        <Card.Title title={comment.name}
                    subtitle={comment.email}
                    titleNumberOfLines={null}/>
        <Card.Content>
          <Paragraph>{comment.body}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );

}
