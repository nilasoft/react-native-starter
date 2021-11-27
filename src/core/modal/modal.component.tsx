import React, {PropsWithChildren, ReactElement} from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, useWindowDimensions, View} from 'react-native';
import {Card} from 'react-native-paper';
import {tw} from 'react-native-tailwindcss';
import {ModalComponentProps} from './modal.model';
import {useTheme} from '../theme/theme.hook';
import Button from '../../shared/components/base/button.component';
import Text from '../../shared/components/base/text.component';

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

export default function ModalComponent(props: PropsWithChildren<ModalComponentProps>): ReactElement {

  const {colors, fonts} = useTheme();
  const {height} = useWindowDimensions();
  const {state, down} = props.handler;
  const close = props.closable && down;

  return (
    <Modal visible={state}
           animationType='fade'
           onRequestClose={close}
           onDismiss={close}
           statusBarTranslucent
           transparent>
      <TouchableWithoutFeedback onPress={close}>
        <View style={[tw.flex1, tw.itemsCenter, tw.justifyCenter, styles.backdrop]}>
          <TouchableWithoutFeedback onPress={null}>
            <Card style={[tw.w4_5]}>
              {props.title && (
                <Text
                  style={[fonts.H6, tw.mS4, tw.mB1, {marginTop: 21}]}
                  color={colors.grayscale.high_emphasis}
                  title={props.title}
                />
              )}
              {
                props.subtitle &&
                <View style={[tw.mB4, tw.mS6, tw.mE6]}>
                  <Text
                    style={[fonts.Caption]}
                    color={colors.grayscale.black}
                    title={props.subtitle}
                  />
                </View>
              }
              <Card.Content>
                <View style={[{maxHeight: 0.7 * height}]}>
                  {props.children}
                </View>
              </Card.Content>
              <Card.Actions>
                {props.actions?.map((action, index) => (
                  <Button
                    key={index}
                    color={action.color ?? colors.primary.default}
                    loading={action.loading}
                    disabled={action.disabled}
                    onPress={action.handle}
                    size={'small'}
                    mode={action.mode ?? 'text'}
                    title={action.title}
                    style={[tw.mL4]}
                  />
                ))}
              </Card.Actions>
            </Card>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

}
