import {ConfigContext, ExpoConfig} from '@expo/config';
import _ from 'lodash';

export default function (context: ConfigContext): ExpoConfig {
  return _.merge<object, Partial<ExpoConfig>, ExpoConfig>({}, context.config, {
    slug: 'my-main',
    name: 'My App',
    version: '0.0.4',
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      backgroundColor: '#eeeeee',
      resizeMode: 'contain'
    },
    updates: {
      checkAutomatically: 'ON_ERROR_RECOVERY',
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      '**/*'
    ],
    androidStatusBar: {
      backgroundColor: '#00000022'
    },
    ios: {
      bundleIdentifier: 'com.nilasoft.blog'
    },
    android: {
      package: 'com.nilasoft.myapp'
    }
  });
}
