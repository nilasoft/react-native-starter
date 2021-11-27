import _ from 'lodash';
import React, {ReactElement, useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import {Checkbox, List} from 'react-native-paper';
import {tw} from 'react-native-tailwindcss';
import {useAnimated} from '../../../core/animated/animated.hook';
import {Entity} from '../../../core/common/models';
import {useAppSelector} from '../../../core/state/state.hook';
import {useTheme} from '../../../core/theme/theme.hook';
import {selectBlogTodo} from '../blog.selector';

export default function TodoComponent(props: Entity): ReactElement {

  const {colors} = useTheme();
  const todo = useAppSelector(selectBlogTodo(props.id));
  const animated = useAnimated(() => ({
    initial: 0,
    animation: {
      default: {
        toValue: 1,
        duration: _.random(100, 500),
        easing: Easing.out(Easing.cubic)
      }
    }
  }));

  useEffect(() => {
    animated.default.start();
  }, []);

  return (
    <Animated.View style={{
      opacity: animated.value,
      transform: [
        {scale: animated.value}
      ]
    }}>
      <List.Item title={todo.title}
                 titleStyle={todo.completed && tw.lineThrough}
                 titleNumberOfLines={null}
                 left={p => (
                   <Checkbox {...p}
                             status={todo.completed ? 'checked' : 'unchecked'}
                             color={colors.primary.default}/>
                 )}
                 onPress={_.noop}/>
    </Animated.View>
  );

}
