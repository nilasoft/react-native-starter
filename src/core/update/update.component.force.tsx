import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../theme/theme.hook';
import {updateFetchRequest} from './update.action';
import {useAppDispatch} from '../state/state.hook';
import {Modal, View} from 'react-native';
import {tw} from 'react-native-tailwindcss';
import AppLogo from '../../../assets/svg/svg.svg';
import {UpdateComponentProps} from './update.model';
import SvgIcon from '../../shared/components/base/svg.icon.component';
import Text from '../../shared/components/base/text.component';
import Button from '../../shared/components/base/button.component';
import ScreenComponent from '../../shared/components/layouts/screen.component';

export default function UpdateComponentForce(props: UpdateComponentProps): ReactElement {
  const {t} = useTranslation();
  const {colors, fonts} = useTheme();
  const dispatch = useAppDispatch();

  const fetching = props.fetch.status === 'request';


  function onUpdate(): void {
    dispatch(updateFetchRequest());
  }

  return (
    <Modal
      visible={props.modal.state}
      animationType='slide'
      statusBarTranslucent
      transparent>

      <ScreenComponent style={[tw.pX0, tw.justifyCenter]}>

        <View style={[tw.mX12, tw.justifyStart]}>
          {/* LOGO */}
          <View style={[tw.selfCenter]}>
            <SvgIcon width={90} height={90}>
              <AppLogo/>
            </SvgIcon>
          </View>

          {/* CONTENT */}
          <View style={[tw.mT10]}>
            <Text
              title={t('core.update.force.title')}
              color={colors.grayscale.black}
              style={fonts.H6}
            />
            <Text
              title={t('core.update.force.subtitle')}
              color={colors.grayscale.black}
              style={[fonts.Caption, tw.mT1]}
            />
            <Text
              title={t('core.update.force.message')}
              color={colors.grayscale.medium_emphasis}
              style={[fonts.Body1, tw.mT4]}
            />
          </View>

          {/* ACTION */}
          <View style={{marginTop: 80}}>
            <Button
              title={t('core.update.force.update')}
              mode={'contained'}
              size={'medium'}
              loading={fetching}
              onPress={onUpdate}/>
          </View>
        </View>
      </ScreenComponent>
    </Modal>
  );
}
