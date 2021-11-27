import i18n from 'i18next';
import _ from 'lodash';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';
import assets from '../common/assets';
import storage from '../common/storage';
import {I18N_LANG_DEFAULT, I18N_LANG_KEY} from './i18n.constant';
import {Lang} from './i18n.model';

export async function init(): Promise<void> {
  let lang = await storage.get(I18N_LANG_KEY, I18N_LANG_DEFAULT);
  let langs = _.values(Lang);
  await i18n
    .use(initReactI18next)
    .init({
      resources: _.reduce(langs, (prev, curr) => {
        let value = assets.i18n[curr];
        return _.set(prev, curr, value);
      }, {}),
      lng: lang,
      fallbackLng: I18N_LANG_DEFAULT,
      interpolation: {
        escapeValue: false
      }
    });
}

/**
 * @return {boolean} Should reload the main or not?
 */
export async function change(lang: Lang): Promise<boolean> {
  await storage.set(I18N_LANG_KEY, lang);
  let rtl = i18n.dir(lang) === 'rtl';
  if (I18nManager.isRTL !== rtl) {
    I18nManager.allowRTL(rtl);
    I18nManager.forceRTL(rtl);
    return true;
  }
  return false;
}
