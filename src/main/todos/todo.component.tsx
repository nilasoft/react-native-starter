import _ from 'lodash';
import React, {ReactElement, useEffect} from 'react';
import {Animated, Easing, View} from 'react-native';
import {ActivityIndicator, Checkbox, IconButton, List} from 'react-native-paper';
import {tw} from 'react-native-tailwindcss';
import {useAnimated} from '../../core/animated/animated.hook';
import {Entity} from '../../core/common/models';
import {useRTL} from '../../core/i18n/i18n.hook';
import {useAppDispatch, useAppSelector} from '../../core/state/state.hook';
import {useTheme} from '../../core/theme/theme.hook';
import {todosRemove, todosToggleRequest} from './todos.action';
import {selectTodosTodo} from './todos.selector';

export function TodoComponent(props: Entity<string>): ReactElement {

  const rtl = useRTL();
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {title, body, complete} = useAppSelector(state => selectTodosTodo(state, props.id));
  const animated = useAnimated(() => ({
    initial: -1,
    defaults: {
      duration: 300
    },
    animation: {
      in: {
        toValue: 0,
        easing: Easing.out(Easing.cubic)
      },
      out: {
        toValue: 1,
        easing: Easing.in(Easing.cubic)
      }
    },
    interpolation: {
      opacity: {
        inputRange: [-1, 0, 1],
        outputRange: [0, 1, 0]
      },
      x: {
        inputRange: [-1, 0, 1],
        outputRange: (() => {
          let x = 200 * (rtl ? -1 : 1);
          return [x, 0, -x];
        })()
      }
    }
  }), [rtl]);

  useEffect(() => {
    animated.in.start();
  }, []);

  function onToggle(): void {
    dispatch(todosToggleRequest(props.id));
  }

  function onRemove(): void {
    animated.out.start(() => dispatch(todosRemove(props.id)));
  }

  return (
    <Animated.View style={{
      opacity: animated.opacity,
      transform: [
        {translateX: animated.x}
      ]
    }}>
      <List.Item title={title}
                 titleStyle={[complete.data && tw.lineThrough,{color: colors.grayscale.active}]}
                 description={body}
                 descriptionNumberOfLines={1}
                 left={p => (
                   <View {...p}
                         style={[tw.w8, tw.itemsCenter, tw.justifyCenter]}>
                     {complete.status === 'request' ? (
                       <ActivityIndicator/>
                     ) : (
                       <Checkbox status={complete.data ? 'checked' : 'unchecked'}
                                 color={colors.primary.default}
                                 onPress={onToggle}/>
                     )}
                   </View>
                 )}
                 right={p => (
                   <View {...p}
                         style={tw.justifyCenter}>
                     <IconButton icon='delete'
                                 disabled={complete.status === 'request'}
                                 color={colors.error.default}
                                 onPress={onRemove}/>
                   </View>
                 )}
                 onPress={_.noop}/>
    </Animated.View>
  );

}
