import _ from 'lodash';
import React, {ReactElement, useMemo} from 'react';
import {FlatList, View} from 'react-native';
import {List, RadioButton} from 'react-native-paper';
import ModalComponent from '../modal/modal.component';
import {useModal} from '../modal/modal.hook';
import {PickerComponentProps, PickerValue} from './picker.model';
import {useTheme} from '../theme/theme.hook';

export default function PickerComponent<V extends PickerValue>(props: PickerComponentProps<V>): ReactElement {

  const {colors} = useTheme();
  const modal = useModal();
  const selected = useMemo(
    () => _.find(props.items, ['value', props.value]),
    [props.items, props.value]
  );

  function onSelect(v: V): void {
    if (typeof props.onChange === 'function')
      props.onChange(v);
    modal.down();
  }

  return (
    <View>
      <List.Item title={props.title}
                 description={selected.label}
                 titleNumberOfLines={1}
                 descriptionNumberOfLines={1}
                 left={p => props.icon && <List.Icon {...p} icon={props.icon} color={colors.primary.default}/>}
                 onPress={modal.up}/>
      <ModalComponent title={props.title} handler={modal} closable>
        <FlatList data={props.items}
                  keyExtractor={item => String(item.value)}
                  renderItem={info => (
                    <List.Item title={info.item.label}
                               titleNumberOfLines={null}
                               onPress={() => onSelect(info.item.value)}
                               left={p => (
                                 <View {...p} pointerEvents='none'>
                                   <RadioButton value={null}
                                                color={colors.primary.default}
                                                status={info.item.value === selected.value ? 'checked' : 'unchecked'}/>
                                 </View>
                               )}/>
                  )}/>
      </ModalComponent>
    </View>
  );

}
