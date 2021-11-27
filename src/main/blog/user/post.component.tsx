import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import _ from 'lodash';
import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Button, Card, Paragraph} from 'react-native-paper';
import {tw} from 'react-native-tailwindcss';
import {Entity} from '../../../core/common/models';
import {useAppSelector} from '../../../core/state/state.hook';
import {useTheme} from '../../../core/theme/theme.hook';
import {selectBlogPost} from '../blog.selector';
import {UserNavParams} from './user.model';

export default function PostComponent(props: Entity): ReactElement {

  const {colors} = useTheme();
  const {t} = useTranslation();
  const post = useAppSelector(selectBlogPost(props.id));
  const navigation = useNavigation<StackNavigationProp<UserNavParams>>();

  function onComments(): void {
    navigation.navigate('Comments', {id: post.id});
  }

  return (
    <View style={[tw.pX2, tw.pY1]}>
      <Card onPress={_.noop}>
        <Card.Title title={post.title}
                    titleNumberOfLines={null}/>
        <Card.Content>
          <Paragraph>{post.body}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={onComments}>
            {t('blog.comments')}
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );

}
