import * as Sentry from '@sentry/react-native';
import {Breadcrumb} from '@sentry/react-native';
import DeviceInfo from 'react-native-device-info';
import {SentryConfig} from './sentry.constant';

export function init(): void {
  try {
    Sentry.init(SentryConfig);
    Sentry.configureScope(scope => {
      scope.setExtras({version: DeviceInfo.getVersion()});
    });
  } catch (err) {
    throw new Error(err);
  }
}

export function breadcrumb(data: Breadcrumb): void {
  Sentry.addBreadcrumb(data);
}


