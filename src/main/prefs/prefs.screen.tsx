import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {i18nChangeRequest} from '../../core/i18n/i18n.action';
import {Lang} from '../../core/i18n/i18n.model';
import PickerComponent from '../../core/picker/picker.component';
import {useAppDispatch, useAppSelector} from '../../core/state/state.hook';
import {themeModeChangeRequest} from '../../core/theme/theme.action';
import {ThemeMode} from '../../core/theme/theme.model';
import {selectThemeMode} from '../../core/theme/theme.selector';

export default function PrefsScreen(): ReactElement {

  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const {t, i18n} = useTranslation();

  function onLang(lang: Lang) {
    dispatch(i18nChangeRequest(lang));
  }

  function onThemeMode(mode: ThemeMode): void {
    dispatch(themeModeChangeRequest(mode));
  }

  return (
    <View>
      <PickerComponent icon='web'
                       title={t('language')}
                       value={i18n.language as Lang}
                       onChange={onLang}
                       items={[
                         {label: t('english'), value: Lang.EN_US},
                         {label: t('persian'), value: Lang.FA_IR}
                       ]}
      />
      <PickerComponent icon='brightness-6'
                       title={t('theme')}
                       value={themeMode}
                       onChange={mode => onThemeMode(mode)}
                       items={[
                         {label: t('auto'), value: 'auto'},
                         {label: t('light'), value: 'light'},
                         {label: t('dark'), value: 'dark'}
                       ]}/>
    </View>
  );

}
