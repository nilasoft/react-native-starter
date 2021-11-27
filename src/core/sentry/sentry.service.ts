import {SentryCategory, SentryType} from './sentry.model';
import {breadcrumb} from './sentry.api';
import * as Sentry from '@sentry/react-native';

export function sentryNavigation(from: string, to: string) {
  breadcrumb({
    type: SentryType.NAVIGATION,
    category: SentryCategory.NAVIGATION,
    timestamp: Date.now(),
    level: Sentry.Severity.Info,
    data: {
      from,
      to
    }
  });
}

export function sentryClick(name: string) {
  breadcrumb({
    type: SentryType.USER,
    category: SentryCategory.CLICK,
    timestamp: Date.now(),
    level: Sentry.Severity.Info,
    message: name
  });
}


export function sentryUiClick(name: string) {
  breadcrumb({
    type: SentryType.USER,
    category: SentryCategory.UI_CLICK,
    timestamp: Date.now(),
    level: Sentry.Severity.Info,
    message: name
  });
}


export function sentryInfo(message: string, data) {
  breadcrumb({
    type: SentryType.INFO,
    category: SentryCategory.INFO,
    message: message,
    data: data,
    level: Sentry.Severity.Info,
    timestamp: Date.now()
  });
}


export function sentryHttpRequest(method:string, url: string, data) {
  breadcrumb({
    type: SentryType.HTTP,
    category: SentryCategory.REQUEST,
    data: {
      method: method.toUpperCase(),
      url: url,
      data: data
    },
    level: Sentry.Severity.Info,
    timestamp: Date.now()
  });
}


export function sentryHttpFailure(method: string, url: string, status: number, message: string) {
  breadcrumb({
    type: SentryType.HTTP,
    category: SentryCategory.FAILURE,
    data:{
      method: method.toUpperCase(),
      url: url,
      status_code: status,
      data: message
    },
    level: Sentry.Severity.Error,
    timestamp: Date.now()
  });
}
